export const orderQueries = {

    allOrders: async (parent, { page }, { prisma, user }) => { // allOrders(page:Int):[Order]
      try {
        // 1. Auth check
        if (!user) throw new AuthenticationError("Not authenticated");
  
        // 2. Prisma query (using pagination and userId from context)
          const userId = getUserId(user);
          const orders = await prisma.order.findMany({
            where: { userId },
            skip: (page - 1) * 10, // Pagination
            take: 10,            // Pagination
            include: {           // Include related data as needed
              user: true,
              restaurant: true,
              items: {
                include: {
                  food: true,
                  variation: true,
                  addons: true,
                },
              },
            },
          });
  
        return orders;
      } catch (error) {
        // ... error handling
      }
    },
      order: async (parent, { id }, { prisma }) => { // order(id:ID):OrderResult
      try {
              const order = await prisma.order.findUnique({
                  where: { id: parseInt(id) },
                  include: {
                      restaurant: {
                          include: {
                              owner: true
                          }
                      },
                      deliveryAddress: true,
                      review: true,
                      user: true,
                      items: {
                          include: {
                              addons: {
                                  include: {
                                      options: true
                                  }
                              },
                              food: true,
                              variation: true
                          }
                      },
                      rider: true
                  }
              })
              if (!order) {
                  throw new Error("Order not found"); // Or a custom error
              }
              return order; // Returning the order data
          } catch (error) {
              console.error("Error fetching order details:", error);
              throw new Error("Failed to fetch order"); // Or throw a custom error
          }
      },
  
  
    ordersByRestId: async (parent, { restaurant, page, rows, search }, { prisma }) => { // ordersByRestId(restaurant:String!,page:Int,rows:Int,search:String):[Order!]
      try {
  
        // ... Implementation (add authentication, filtering, pagination, and data inclusion as needed)
  
      } catch (error) {
        // ... error handling
      }
    },
  
  
    // ... (Other order queries: getOrdersByDateRange, getActiveOrders, getActiveOrdersWithPagination,  etc. - Follow a similar pattern.)
  };
  
  