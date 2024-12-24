import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const queryResolvers = {
    users: async (_, {search}, { prisma }) => {
        try{
            const where = search ? {
                name: { contains: search, mode: 'insensitive' }
            } : {};
             return await prisma.user.findMany({where});
         } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Failed to fetch users");
         }
   },
    user: async (_, { id }, { prisma }) => {
        try{
             return await prisma.user.findUnique({ where: { id } });
        } catch (error) {
            console.error("Error fetching user:", error);
           throw new Error("Failed to fetch user");
        }
    },
   products: async (_, { search, categoryId }, { prisma }) => {
        try{
           const where = {};

            if (search) {
                 where.name = { contains: search, mode: 'insensitive' };
               }
            if (categoryId) {
                 where.categoryId = categoryId;
                }
           return await prisma.product.findMany({where});
          } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products");
       }
      },
      product: async (_, { id }, { prisma }) => {
        try {
          return await prisma.product.findUnique({ where: { id } });
       } catch (error) {
          console.error("Error fetching product:", error);
          throw new Error("Failed to fetch product");
       }
       },
    categories: async (_, { search }, { prisma }) => {
         try {
            const where = search ? { name: { contains: search, mode: 'insensitive' } } : {};
            return await prisma.category.findMany({where});
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Failed to fetch categories");
        }
        },
    category: async (_, { id }, { prisma }) => {
      try {
           return await prisma.category.findUnique({ where: { id } });
      } catch (error) {
           console.error("Error fetching category:", error);
           throw new Error("Failed to fetch category");
        }
        },
   orders: async (_, { search }, { prisma }) => {
       try{
            const where = search ? {
                 id: { contains: search, mode: 'insensitive' }
              } : {};
            return await prisma.order.findMany({where});
       } catch (error) {
            console.error("Error fetching orders:", error);
            throw new Error("Failed to fetch orders");
      }
      },
     order: async (_, { id }, { prisma }) => {
         try {
           return await prisma.order.findUnique({ where: { id } });
         } catch (error) {
            console.error("Error fetching order:", error);
             throw new Error("Failed to fetch order");
        }
    },
       allOrders: async (_, { page, search }, { prisma }) => {
           try {
              const where = search ? {
                 id: { contains: search, mode: 'insensitive' }
                } : {};
                 return await prisma.orderDetails.findMany({
                      where,
                      skip: (page - 1) * 10 || 0,
                     take: 10
                 })
             } catch (error) {
                console.error("Error fetching allOrders:", error);
                throw new Error("Failed to fetch allOrders");
            }
         },
        reviews: async (_, { restaurant, search }, { prisma }) => {
        try{
           const where = {restaurantId: restaurant}

             if(search){
                where.description = { contains: search, mode: 'insensitive' };
             }

             return await prisma.review.findMany({where});
         } catch (error) {
               console.error("Error fetching reviews:", error);
               throw new Error("Failed to fetch reviews");
        }
        },
    getOrdersByDateRange: async (_, { startingDate, endingDate, restaurant }, { prisma }) => {
         try{
              const orders = await prisma.restaurantOrder.findMany({
                    where: {
                     restaurantId: restaurant,
                        },
                });

           const totalAmountCashOnDelivery = orders.reduce((acc, order) => {
            return acc + (order.paymentMethod === "cashOnDelivery" ?  order.paidAmount || 0 : 0 );
             },0);

           const countCashOnDeliveryOrders = orders.filter((order) => order.paymentMethod === "cashOnDelivery").length
                return {
                   totalAmountCashOnDelivery: totalAmountCashOnDelivery,
                  countCashOnDeliveryOrders: countCashOnDeliveryOrders,
                 };
             } catch (error) {
                 console.error("Error fetching orders by date range:", error);
                 throw new Error("Failed to fetch orders by date range");
            }
        },
    ordersByRestId: async (_, { restaurant, page, rows, search }, { prisma }) => {
           try{
                const whereCondition = restaurant ? { restaurantId: restaurant } : {};

                const results = await prisma.restaurantOrder.findMany({
                   where: whereCondition,
                   skip: (page - 1) * rows || 0,
                     take: rows || 10,
                })
                  return results;
           } catch (error) {
                console.error("Error fetching orders by restaurant:", error);
                throw new Error("Failed to fetch orders by restaurant");
         }

      },
          getDashboardTotal: async (_, { starting_date, ending_date, restaurant }, { prisma }) => {
             try {
               const orders = await prisma.restaurantOrder.findMany({
                     where: {
                         restaurantId: restaurant,
                        createdAt: {
                             gte: starting_date ? new Date(starting_date) : undefined,
                             lte: ending_date ? new Date(ending_date) : undefined,
                            },
                        },
                   });
               const totalOrders = orders.length;
                const totalSales = orders.reduce((acc, order) => acc + (order.paidAmount || 0), 0);
                 return {
                   totalOrders: totalOrders,
                    totalSales: totalSales,
                   };
                } catch (error) {
                   console.error("Error fetching dashboard total:", error);
                  throw new Error("Failed to fetch dashboard total");
               }
       },
          getDashboardSales: async (_, { starting_date, ending_date, restaurant }, { prisma }) => {
               try{
                    const orders = await prisma.restaurantOrder.findMany({
                       where: {
                           restaurantId: restaurant,
                           createdAt: {
                             gte: starting_date ? new Date(starting_date) : undefined,
                               lte: ending_date ? new Date(ending_date) : undefined,
                          }
                        },
                     });
                   const dailySales = orders.reduce((acc, order) => {
                       const day = order.createdAt.toISOString().split('T')[0];

                       acc[day] = (acc[day] || 0) + (order.paidAmount || 0);
                       return acc
                    },{})
                   const ordersWithDay = Object.entries(dailySales).map(([day, amount]) => ({day, amount}));

                    return {
                     orders: ordersWithDay,
                    };
               } catch (error) {
                   console.error("Error fetching dashboard sales:", error);
                  throw new Error("Failed to fetch dashboard sales");
                }
          },
        getDashboardOrders: async (_, { starting_date, ending_date, restaurant }, { prisma }) => {
             try{
                   const orders = await prisma.restaurantOrder.findMany({
                        where: {
                            restaurantId: restaurant,
                           createdAt: {
                              gte: starting_date ? new Date(starting_date) : undefined,
                                 lte: ending_date ? new Date(ending_date) : undefined,
                            },
                        },
                   });
                 const dailyOrders = orders.reduce((acc, order) => {
                       const day = order.createdAt.toISOString().split('T')[0];
                       acc[day] = (acc[day] || 0) + 1;
                     return acc;
                     }, {});
                const ordersWithDay = Object.entries(dailyOrders).map(([day, count]) => ({day, count}));

                  return {
                   orders: ordersWithDay,
                    };
               } catch (error) {
                   console.error("Error fetching dashboard orders:", error);
                    throw new Error("Failed to fetch dashboard orders");
                }
          },
          getDashboardData: async (_, { starting_date, ending_date }, { prisma }) => {
             try {
                 const orders = await prisma.restaurantOrder.findMany({
                        where: {
                            createdAt: {
                                gte: starting_date ? new Date(starting_date) : undefined,
                                 lte: ending_date ? new Date(ending_date) : undefined,
                                }
                            },
                        });
                   const totalOrders = orders.length;
                  const totalSales = orders.reduce((acc, order) => acc + (order.paidAmount || 0), 0);
                  const users = await prisma.user.findMany();
                   const totalUsers = users.length
                   const dailyData = orders.reduce((acc, order) => {
                       const day = order.createdAt.toISOString().split('T')[0];
                       acc[day] = (acc[day] || {count: 0, amount: 0});
                        acc[day].count = (acc[day].count || 0) + 1;
                      acc[day].amount = (acc[day].amount || 0) + (order.paidAmount || 0);
                        return acc;
                       }, {});
                  const ordersWithDay = Object.entries(dailyData).map(([day, { count, amount }]) => ({ day, count, amount }));
                   return {
                       totalOrders: totalOrders,
                       totalUsers: totalUsers,
                       totalSales: totalSales,
                      orders: ordersWithDay,
                  };
                } catch (error) {
                   console.error("Error fetching dashboard data:", error);
                   throw new Error("Failed to fetch dashboard data");
                }
           },
      configuration: async (_, __, { prisma }) => {
            try{
                return await prisma.configuration.findFirst();
            } catch (error) {
                console.error("Error fetching configuration:", error);
                 throw new Error("Failed to fetch configuration");
            }
        },
          orderCount: async (_, { restaurant }, { prisma }) => {
             try {
                 return await prisma.restaurantOrder.count({
                    where: {restaurantId: restaurant}
                  })
             } catch (error) {
                  console.error("Error fetching order count:", error);
                    throw new Error("Failed to fetch order count");
             }
      },
        getActiveOrders: async (_, { restaurantId, search }, { prisma }) => {
             try {
                  const where = restaurantId ? { restaurantId: restaurantId } : {};
                 if (search) {
                    where.orderId = { contains: search, mode: 'insensitive' };
                   }
                 return await prisma.activeOrder.findMany({where});
             } catch (error) {
                   console.error("Error fetching active orders:", error);
                 throw new Error("Failed to fetch active orders");
              }
        },
        getActiveOrdersWithPagination: async (_, { page, rowsPerPage, search, restaurantId }, { prisma }) => {
           try {
             const whereCondition = restaurantId ? { restaurantId: restaurantId } : {};
           if(search){
             whereCondition.orderId = { contains: search, mode: 'insensitive' };
           }
                const results = await prisma.activeOrder.findMany({
                        where: whereCondition,
                        skip: (page - 1) * rowsPerPage || 0,
                        take: rowsPerPage || 10,
                    });
                 const orderCount = await prisma.activeOrder.count({where: whereCondition});


              return {
                  orders: results,
                  orderCount: orderCount,
                    page: page || 1,
                    rowsPerPage: rowsPerPage || 10,
                };
             } catch (error) {
                  console.error("Error fetching active orders with pagination:", error);
                  throw new Error("Failed to fetch active orders with pagination");
             }
         },
    ridersByZone: async (_, { id, search }, { prisma }) => {
        try{
             const where = id ? { zoneId: parseInt(id) } : {};
               if (search) {
                 where.name = { contains: search, mode: 'insensitive' };
                }
             return await prisma.rider.findMany({where});
         } catch (error) {
             console.error("Error fetching riders by zone:", error);
              throw new Error("Failed to fetch riders by zone");
            }
       },
    zones: async (_, {search}, { prisma }) => {
          try{
              const where = search ? {
                   title: { contains: search, mode: 'insensitive' }
               } : {};
                return await prisma.zone.findMany({where});
           } catch (error) {
                console.error("Error fetching zones:", error);
               throw new Error("Failed to fetch zones");
           }
        },
      vendors: async (_, { search }, { prisma }) => {
           try {
                const where = search ? {
                     email: { contains: search, mode: 'insensitive' }
                   } : {};
               return await prisma.vendor.findMany({where});
           } catch (error) {
               console.error("Error fetching vendors:", error);
               throw new Error("Failed to fetch vendors");
           }
         },
    getVendor: async (_, { id }, { prisma }) => {
         try {
            return await prisma.vendor.findUnique({where: {id: parseInt(id)}});
          } catch (error) {
               console.error("Error fetching vendor:", error);
               throw new Error("Failed to fetch vendor");
           }
        },
        taxes: async (_, { search }, { prisma }) => {
            try{
                 const where = search ? {
                       id: { contains: search, mode: 'insensitive' }
                    } : {};
                 return await prisma.taxation.findMany({where});
            } catch (error) {
                 console.error("Error fetching taxes:", error);
                 throw new Error("Failed to fetch taxes");
            }
          },
    coupons: async (_, { page, rowsPerPage, search }, { prisma }) => {
         try {
             const where = search ? {
                     title: { contains: search, mode: 'insensitive' }
                 } : {};
            const results =  await prisma.coupon.findMany({
                  where,
                  skip: (page - 1) * rowsPerPage || 0,
                    take: rowsPerPage || 10,
                });
              const count = await prisma.coupon.count({where});
              return {
                    coupons: results,
                  totalCount: count,
                 }
           } catch (error) {
               console.error("Error fetching coupons:", error);
                 throw new Error("Failed to fetch coupons");
            }
           },
        cuisines: async (_, { search }, { prisma }) => {
              try{
                 const where = search ? {
                         name: { contains: search, mode: 'insensitive' }
                    } : {};
                 return await prisma.cuisine.findMany({where});
              } catch (error) {
                 console.error("Error fetching cuisines:", error);
                    throw new Error("Failed to fetch cuisines");
                }
        },
       banners: async (_, { search }, { prisma }) => {
             try {
                 const where = search ? {
                     title: { contains: search, mode: 'insensitive' }
                    } : {};
                 return await prisma.banner.findMany({where});
            } catch (error) {
                console.error("Error fetching banners:", error);
                 throw new Error("Failed to fetch banners");
            }
        },
        bannerActions: async () => {
           try {
                 return ['openScreen', 'openLink']
            } catch (error) {
                console.error("Error fetching banner actions:", error);
                throw new Error("Failed to fetch banner actions");
            }
       },
        tips: async (_, { search }, { prisma }) => {
             try {
                 const where = search ? {
                     id: { contains: search, mode: 'insensitive' }
                   } : {};
                  return await prisma.tipping.findMany({where});
             } catch (error) {
                 console.error("Error fetching tips:", error);
                 throw new Error("Failed to fetch tips");
             }
        },
        addons: async (_, { search }, { prisma }) => {
              try{
                  const where = search ? {
                       title: { contains: search, mode: 'insensitive' }
                     } : {};
                    return await prisma.addon.findMany({where});
                } catch (error) {
                     console.error("Error fetching addons:", error);
                    throw new Error("Failed to fetch addons");
               }
        },
     options: async (_, { search }, { prisma }) => {
          try {
              const where = search ? {
                  title: { contains: search, mode: 'insensitive' }
              } : {};
                return await prisma.optionType.findMany({where});
           } catch (error) {
                 console.error("Error fetching options:", error);
                  throw new Error("Failed to fetch options");
            }
       },
       getPaymentStatuses: async () => {
          try {
               return ['paid', 'pending', 'failed'];
           } catch (error) {
                console.error("Error fetching payment statuses:", error);
                throw new Error("Failed to fetch payment statuses");
            }
       },
      restaurantByOwner: async(_, {id}, { prisma }) => {
        try {
            return await prisma.ownerRestaurants.findFirst({
                where: {
                   id: parseInt(id)
               }
            });
        } catch (error) {
              console.error("Error fetching restaurant by owner:", error);
                throw new Error("Failed to fetch restaurant by owner");
        }
      },
     restaurantList: async (_, { search }, { prisma }) => {
        try{
             const where = search ? {
                  name: { contains: search, mode: 'insensitive' }
               } : {};
              return await prisma.restaurantListItem.findMany({where});
         } catch (error) {
             console.error("Error fetching restaurant list:", error);
              throw new Error("Failed to fetch restaurant list");
         }
       },
      restaurants: async (_, { search }, { prisma }) => {
          try {
                 const where = search ? {
                        name: { contains: search, mode: 'insensitive' }
                   } : {};
               return await prisma.restaurantType.findMany({where});
           } catch (error) {
                  console.error("Error fetching restaurants:", error);
                  throw new Error("Failed to fetch restaurants");
            }
        },
     restaurant: async (_, { id }, { prisma }) => {
          try {
                return await prisma.restaurantProfile.findUnique({where: {id: parseInt(id)}})
           } catch (error) {
                  console.error("Error fetching restaurant:", error);
                throw new Error("Failed to fetch restaurant");
             }
       },
    restaurantDetail: async (_, { id }, { prisma }) => {
          try{
               return await prisma.restaurantDetails.findUnique({where: {id: parseInt(id)}})
           } catch (error) {
                 console.error("Error fetching restaurant detail:", error);
                 throw new Error("Failed to fetch restaurant detail");
           }
       },
        offers: async (_, { search }, { prisma }) => {
             try {
                  const where = search ? {
                       name: { contains: search, mode: 'insensitive' }
                    } : {};
                   return await prisma.offer.findMany({where});
               } catch (error) {
                     console.error("Error fetching offers:", error);
                  throw new Error("Failed to fetch offers");
                }
        },
       sections: async (_, { search }, { prisma }) => {
             try {
                const where = search ? {
                    name: { contains: search, mode: 'insensitive' }
                    } : {};
                    return await prisma.section.findMany({where});
                } catch (error) {
                     console.error("Error fetching sections:", error);
                     throw new Error("Failed to fetch sections");
                }
         },
       pageCount: async (_, { restaurant }, { prisma }) => {
            try{
                 return await prisma.restaurantOrder.count({
                     where: {
                         restaurantId: restaurant
                        }
                    });
            } catch (error) {
                console.error("Error fetching page count:", error);
                 throw new Error("Failed to fetch page count");
             }
        },
       users: async (_, { page, rowsPerPage, search }, { prisma }) => {
           try{
                const where = search ? {
                        name: { contains: search, mode: 'insensitive' }
                    } : {};
             const results = await prisma.userType.findMany({
                   where,
                    skip: (page - 1) * rowsPerPage || 0,
                     take: rowsPerPage || 10,
                  });
               const totalCount = await prisma.userType.count({where});
                  return {
                      users: results,
                      totalCount: totalCount,
                     }
               } catch (error) {
                    console.error("Error fetching users with pagination:", error);
                     throw new Error("Failed to fetch users with pagination");
                }
        },
        riders: async (_, { page, rowsPerPage, search }, { prisma }) => {
          try{
              const where = search ? {
                   name: { contains: search, mode: 'insensitive' }
                 } : {};
           const results =  await prisma.rider.findMany({
                 where,
                   skip: (page - 1) * rowsPerPage || 0,
                 take: rowsPerPage || 10,
               });
            const totalCount = await prisma.rider.count({where});
            return {
                  riders: results,
                 totalCount: totalCount,
               }
         } catch (error) {
              console.error("Error fetching riders with pagination:", error);
                 throw new Error("Failed to fetch riders with pagination");
             }
       },
       availableRiders: async (_, { search }, { prisma }) => {
         try {
            const where = search ? {
               name: { contains: search, mode: 'insensitive' }
              } : {available: true};
               return await prisma.rider.findMany({where});
            } catch (error) {
               console.error("Error fetching available riders:", error);
                throw new Error("Failed to fetch available riders");
             }
         },
    withdrawRequests: async (_, { page, rowsPerPage, search }, { prisma }) => {
         try {
             const where = search ? {
                    id: { contains: search, mode: 'insensitive' }
                  } : {};
              const results =  await prisma.withdrawRequest.findMany({
                    where,
                    skip: (page - 1) * rowsPerPage || 0,
                   take: rowsPerPage || 10,
                });
            const totalCount = await prisma.withdrawRequest.count({where});
                return {
                    requests: results,
                  totalCount: totalCount,
                 }
            } catch (error) {
                 console.error("Error fetching withdraw requests:", error);
                 throw new Error("Failed to fetch withdraw requests");
             }
      },
  };
export default queryResolvers;