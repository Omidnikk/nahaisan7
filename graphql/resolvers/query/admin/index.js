import { PrismaClient } from '@prisma/client';
// import checkAuth from '../../../../utils/auth';
import checkAuth from '../../../utils/auth.js';

const prisma = new PrismaClient();

const adminQueryResolvers = {
    allOrders: async (parent, { page }, context, info) => {
        try {
            checkAuth(context, "admin");
            const orders = await prisma.order.findMany({
                skip: page ? (page - 1) * 10 : 0, // 10 items per page
                take: 10,
                include: {
                    items: {
                        include: {
                            food: true,
                            variation: true,
                            addons: {
                                include: {
                                    options: true
                                }
                            }
                        }
                    },
                    user: true,
                    rider: true,
                    review: true,
                    deliveryAddress: true,
                }
            });
            return orders
        } catch (error) {
            console.error("Error in allOrders:", error);
            throw new Error("Failed to fetch orders. Check server logs");
        }
    },
    reviews: async (parent, { restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.review.findMany({
                where: {
                    restaurantId: restaurant
                },
                include: {
                    order: {
                        include: {
                            items: true,
                            user: true,
                        }
                    },
                    restaurant: true
                }
            });
        } catch (error) {
            console.error("Error in reviews:", error);
            throw new Error("Failed to fetch reviews. Check server logs");
        }
    },
    getOrdersByDateRange: async (parent, { startingDate, endingDate, restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            const orders = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: new Date(startingDate),
                        lte: new Date(endingDate),
                    },
                    restaurantId: restaurant
                },
                include: {
                    items: true,
                    user: true,
                }
            });
            const totalAmountCashOnDelivery = orders.reduce((acc, order) => {
                if (order.paymentMethod === 'cashOnDelivery') {
                    return acc + order.orderAmount;
                }
                return acc;
            }, 0);
            const countCashOnDeliveryOrders = orders.filter(order => order.paymentMethod === 'cashOnDelivery').length;
            return {
                totalAmountCashOnDelivery,
                countCashOnDeliveryOrders,
            };
        } catch (error) {
            console.error("Error in getOrdersByDateRange:", error);
            throw new Error("Failed to fetch orders by date range. Check server logs");
        }
    },
    ordersByRestId: async (parent, { restaurant, page, rows, search }, context, info) => {
        try {
            checkAuth(context, "admin");
            const skip = (page - 1) * rows;
            const where = {
                restaurantId: restaurant
            }
            if (search) {
                where.items = {
                    some: {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                }
            }
            const orders = await prisma.order.findMany({
                skip: skip,
                take: rows,
                where: where,
                include: {
                    items: {
                        include: {
                            variation: true,
                            addons: {
                                include: {
                                    options: true,
                                }
                            }
                        }
                    },
                    deliveryAddress: {
                        include: {
                            location: true
                        }
                    },
                    restaurant: {
                        include: {
                            location: true
                        }
                    },
                    user: true,
                    rider: true,
                }
            });
            return orders
        } catch (error) {
            console.error("Error in ordersByRestId:", error);
            throw new Error("Failed to fetch orders by restaurant id. Check server logs");
        }
    },
    getDashboardTotal: async (parent, { startingDate, endingDate, restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            const where = {
                restaurantId: restaurant,
            };
            if (startingDate && endingDate) {
                where.createdAt = {
                    gte: new Date(startingDate),
                    lte: new Date(endingDate),
                };
            }
            const totalOrders = await prisma.order.count({ where });
            const orders = await prisma.order.findMany({
                where,
                include: {
                    items: true
                }
            });
            const totalSales = orders.reduce((acc, order) => acc + order.orderAmount, 0);
            return { totalOrders, totalSales };
        } catch (error) {
            console.error("Error in getDashboardTotal:", error);
            throw new Error("Failed to fetch dashboard total. Check server logs");
        }
    },
    getDashboardSales: async (parent, { startingDate, endingDate, restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            const where = {
                restaurantId: restaurant,
            };
            if (startingDate && endingDate) {
                where.createdAt = {
                    gte: new Date(startingDate),
                    lte: new Date(endingDate),
                };
            }
            const orders = await prisma.order.findMany({
                where,
                include: {
                    items: true
                }
            });
            const orderMap = new Map();
            orders.forEach((order) => {
                const day = order.createdAt.toISOString().split('T')[0];
                if (orderMap.has(day)) {
                    orderMap.set(day, orderMap.get(day) + order.orderAmount)
                } else {
                    orderMap.set(day, order.orderAmount)
                }
            });
            const formattedOrders = Array.from(orderMap, ([day, amount]) => ({ day, amount }));
            return { orders: formattedOrders };
        } catch (error) {
            console.error("Error in getDashboardSales:", error);
            throw new Error("Failed to fetch dashboard sales. Check server logs");
        }
    },
    getDashboardOrders: async (parent, { startingDate, endingDate, restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            const where = {
                restaurantId: restaurant,
            };
            if (startingDate && endingDate) {
                where.createdAt = {
                    gte: new Date(startingDate),
                    lte: new Date(endingDate),
                };
            }
            const orders = await prisma.order.findMany({
                where,
                include: {
                    items: true
                }
            });
            const orderMap = new Map();
            orders.forEach((order) => {
                const day = order.createdAt.toISOString().split('T')[0];
                if (orderMap.has(day)) {
                    orderMap.set(day, orderMap.get(day) + 1);
                } else {
                    orderMap.set(day, 1);
                }
            });
            const formattedOrders = Array.from(orderMap, ([day, count]) => ({ day, count }));
            return { orders: formattedOrders };
        } catch (error) {
            console.error("Error in getDashboardOrders:", error);
            throw new Error("Failed to fetch dashboard orders. Check server logs");
        }
    },
    getDashboardData: async (parent, { startingDate, endingDate }, context, info) => {
        try {
            checkAuth(context, "admin");
            const where = {};
            if (startingDate && endingDate) {
                where.createdAt = {
                    gte: new Date(startingDate),
                    lte: new Date(endingDate),
                };
            }
            const totalOrders = await prisma.order.count({ where });
            const totalUsers = await prisma.user.count();
            const orders = await prisma.order.findMany({
                where,
                include: {
                    items: true
                }
            });
            const totalSales = orders.reduce((acc, order) => acc + order.orderAmount, 0);
            const orderMap = new Map();
            orders.forEach((order) => {
                const day = order.createdAt.toISOString().split('T')[0];
                if (orderMap.has(day)) {
                    const count = orderMap.get(day).count
                    const amount = orderMap.get(day).amount
                    orderMap.set(day, {
                        count: count + 1,
                        amount: amount + order.orderAmount
                    })
                } else {
                    orderMap.set(day, {
                        count: 1,
                        amount: order.orderAmount
                    })
                }
            });
            const formattedOrders = Array.from(orderMap, ([day, { count, amount }]) => ({ day, count, amount }));
            return {
                totalOrders,
                totalUsers,
                totalSales,
                orders: formattedOrders
            };
        } catch (error) {
            console.error("Error in getDashboardData:", error);
            throw new Error("Failed to fetch dashboard data. Check server logs");
        }
    },
    configuration: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.findFirst();
        } catch (error) {
            console.error("Error in configuration:", error);
            throw new Error("Failed to fetch configuration. Check server logs");
        }
    },
    orderCount: async (parent, { restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.order.count({
                where: {
                    restaurantId: restaurant
                }
            })
        } catch (error) {
            console.error("Error in orderCount:", error);
            throw new Error("Failed to fetch order count. Check server logs");
        }
    },
    getActiveOrders: async (parent, { restaurantId }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.order.findMany({
                where: {
                    orderStatus: {
                        in: ['placed', 'accepted', 'preparing', 'ready', 'onTheWay'],
                    },
                    restaurantId: restaurantId,
                },
                include: {
                    items: {
                        include: {
                            variation: true,
                            addons: {
                                include: {
                                    options: true,
                                }
                            }
                        }
                    },
                    deliveryAddress: {
                        include: {
                            location: true
                        }
                    },
                    restaurant: {
                        include: {
                            location: true
                        }
                    },
                    user: true,
                    rider: true,
                    zone: true
                }
            })
        } catch (error) {
            console.error("Error in getActiveOrders:", error);
            throw new Error("Failed to fetch active orders. Check server logs");
        }
    },
    getActiveOrdersWithPagination: async (parent, { page, rowsPerPage, search, restaurantId }, context, info) => {
        try {
            checkAuth(context, "admin");
            const skip = (page - 1) * rowsPerPage;
            const where = {
                orderStatus: {
                    in: ['placed', 'accepted', 'preparing', 'ready', 'onTheWay'],
                },
                restaurantId: restaurantId
            }
            if (search) {
                where.items = {
                    some: {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                }
            }
            const orders = await prisma.order.findMany({
                skip: skip,
                take: rowsPerPage,
                where: where,
                include: {
                    items: {
                        include: {
                            variation: true,
                            addons: {
                                include: {
                                    options: true,
                                }
                            }
                        }
                    },
                    deliveryAddress: {
                        include: {
                            location: true
                        }
                    },
                    restaurant: {
                        include: {
                            location: true
                        }
                    },
                    user: true,
                    rider: true,
                    zone: true
                }
            });
            const orderCount = await prisma.order.count({ where });
            return {
                orders,
                orderCount,
                page,
                rowsPerPage,
            }
        } catch (error) {
            console.error("Error in getActiveOrdersWithPagination:", error);
            throw new Error("Failed to fetch active orders with pagination. Check server logs");
        }
    },
    ridersByZone: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.rider.findMany({
                where: {
                    zoneId: id,
                },
                include: {
                    zone: true
                }
            });
        } catch (error) {
            console.error("Error in ridersByZone:", error);
            throw new Error("Failed to fetch riders by zone. Check server logs");
        }
    },
    zones: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.zone.findMany({
                include: {
                    location: true
                }
            });
        } catch (error) {
            console.error("Error in zones:", error);
            throw new Error("Failed to fetch zones. Check server logs");
        }
    },
    vendors: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.vendor.findMany({
                include: {
                    restaurants: {
                        include: {
                            location: true,
                            zone: true
                        }
                    }
                },
            });
        } catch (error) {
            console.error("Error in vendors:", error);
            throw new Error("Failed to fetch vendors. Check server logs");
        }
    },
    getVendor: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.vendor.findUnique({
                where: {
                    id: id
                },
                include: {
                    restaurants: {
                        include: {
                            location: true
                        }
                    }
                },
            })
        } catch (error) {
            console.error("Error in getVendor:", error);
            throw new Error("Failed to fetch vendor. Check server logs");
        }
    },
    taxes: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.tax.findMany();
        } catch (error) {
            console.error("Error in taxes:", error);
            throw new Error("Failed to fetch taxes. Check server logs");
        }
    },
    coupons: async (parent, { page, rowsPerPage, search }, context, info) => {
        try {
            checkAuth(context, "admin");
            const skip = (page - 1) * rowsPerPage;
            const where = {}
            if (search) {
                where.title = {
                    contains: search,
                    mode: 'insensitive',
                }
            }
            const coupons = await prisma.coupon.findMany({
                skip: skip,
                take: rowsPerPage,
                where: where
            });
            const totalCount = await prisma.coupon.count({ where });
            return {
                coupons,
                totalCount
            }
        } catch (error) {
            console.error("Error in coupons:", error);
            throw new Error("Failed to fetch coupons. Check server logs");
        }
    },
    cuisines: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.cuisine.findMany();
        } catch (error) {
            console.error("Error in cuisines:", error);
            throw new Error("Failed to fetch cuisines. Check server logs");
        }
    },
    banners: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.banner.findMany();
        } catch (error) {
            console.error("Error in banners:", error);
            throw new Error("Failed to fetch banners. Check server logs");
        }
    },
    bannerActions: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return ["BANNER", "MENU", "RESTAURANT"];
        } catch (error) {
            console.error("Error in bannerActions:", error);
            throw new Error("Failed to fetch banner actions. Check server logs");
        }
    },
    tips: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.tip.findMany();
        } catch (error) {
            console.error("Error in tips:", error);
            throw new Error("Failed to fetch tips. Check server logs");
        }
    },
    addons: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.addon.findMany({
                include: {
                    options: true
                }
            });
        } catch (error) {
            console.error("Error in addons:", error);
            throw new Error("Failed to fetch addons. Check server logs");
        }
    },
    options: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.option.findMany();
        } catch (error) {
            console.error("Error in options:", error);
            throw new Error("Failed to fetch options. Check server logs");
        }
    },
    getPaymentStatuses: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return ["pending", "paid", "failed", "refunded"];
        } catch (error) {
            console.error("Error in getPaymentStatuses:", error);
            throw new Error("Failed to fetch payment statuses. Check server logs");
        }
    },
    restaurantByOwner: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.vendor.findUnique({
                where: {
                    id: id
                },
                include: {
                    restaurants: {
                        include: {
                            location: true
                        }
                    }
                },
            })
        } catch (error) {
            console.error("Error in restaurantByOwner:", error);
            throw new Error("Failed to fetch restaurant by owner. Check server logs");
        }
    },
    restaurantList: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.findMany();
        } catch (error) {
            console.error("Error in restaurantList:", error);
            throw new Error("Failed to fetch restaurant list. Check server logs");
        }
    },
    restaurants: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.findMany({
                include: {
                    owner: true,
                }
            });
        } catch (error) {
            console.error("Error in restaurants:", error);
            throw new Error("Failed to fetch restaurants. Check server logs");
        }
    },
    restaurant: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.findUnique({
                where: {
                    id: id
                },
                include: {
                    owner: true,
                    openingTimes: true,
                    deliveryBounds: true,
                    categories: {
                        include: {
                            foods: {
                                include: {
                                    variations: {
                                        include: {
                                            addons: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    options: true,
                    addons: {
                        include: {
                            options: true
                        }
                    },
                }
            })
        } catch (error) {
            console.error("Error in restaurant:", error);
            throw new Error("Failed to fetch restaurant. Check server logs");
        }
    },
    getRestaurantDetail: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.findUnique({
                where: {
                    id: id
                },
                include: {
                    categories: {
                        include: {
                            foods: {
                                include: {
                                    variations: {
                                        include: {
                                            addons: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    options: true,
                    addons: {
                        include: {
                            options: true
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error in getRestaurantDetail:", error);
            throw new Error("Failed to fetch restaurant detail. Check server logs");
        }
    },
    offers: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.offer.findMany({
                include: {
                    restaurants: true
                }
            });
        } catch (error) {
            console.error("Error in offers:", error);
            throw new Error("Failed to fetch offers. Check server logs");
        }
    },
    sections: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.section.findMany({
                include: {
                    restaurants: true
                }
            });
        } catch (error) {
            console.error("Error in sections:", error);
            throw new Error("Failed to fetch sections. Check server logs");
        }
    },
    pageCount: async (parent, { restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.order.count({
                where: {
                    restaurantId: restaurant
                }
            })
        } catch (error) {
            console.error("Error in pageCount:", error);
            throw new Error("Failed to fetch page count. Check server logs");
        }
    },
    users: async (parent, { page, rowsPerPage, search }, context, info) => {
        try {
            checkAuth(context, "admin");
            const skip = (page - 1) * rowsPerPage;
            const where = {}
            if (search) {
                where.OR = [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        phone: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
            const users = await prisma.user.findMany({
                skip: skip,
                take: rowsPerPage,
                where: where,
                include: {
                    addresses: {
                        include: {
                            location: true
                        }
                    }
                }
            });
            const totalCount = await prisma.user.count({ where });
            return {
                users,
                totalCount
            };
        } catch (error) {
            console.error("Error in users:", error);
            throw new Error("Failed to fetch users. Check server logs");
        }
    },
    riders: async (parent, { page, rowsPerPage, search }, context, info) => {
        try {
            checkAuth(context, "admin");
            const skip = (page - 1) * rowsPerPage;
            const where = {}
            if (search) {
                where.OR = [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        username: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        phone: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
            const riders = await prisma.rider.findMany({
                skip: skip,
                take: rowsPerPage,
                where: where,
                include: {
                    zone: true
                }
            });
            const totalCount = await prisma.rider.count({ where });
            return {
                riders,
                totalCount
            };
        } catch (error) {
            console.error("Error in riders:", error);
            throw new Error("Failed to fetch riders. Check server logs");
        }
    },
    availableRiders: async (parent, args, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.rider.findMany({
                where: {
                    available: true
                },
                include: {
                    zone: true
                }
            });
        } catch (error) {
            console.error("Error in availableRiders:", error);
            throw new Error("Failed to fetch available riders. Check server logs");
        }
    },
    withdrawRequests: async (parent, { page, rowsPerPage, search }, context, info) => {
        try {
            checkAuth(context, "admin");
            const skip = (page - 1) * rowsPerPage;
            const where = {}
            if (search) {
                where.requestId = {
                    contains: search,
                    mode: 'insensitive'
                }
            }
            const requests = await prisma.withdrawRequest.findMany({
                skip: skip,
                take: rowsPerPage,
                where: where,
                include: {
                    rider: true
                }
            });
            const totalCount = await prisma.withdrawRequest.count({ where });
            return {
                requests,
                totalCount
            };
        } catch (error) {
            console.error("Error in withdrawRequests:", error);
            throw new Error("Failed to fetch withdraw requests. Check server logs");
        }
    },
};

export default adminQueryResolvers;