export const restaurantQueries = {
    restaurant: async (parent, { id }, { prisma, user }) => { // restaurant(id:String):RestaurantResult
      try {
        if (!user) {
          throw new AuthenticationError('You must be logged in to view restaurant details.');
        }
  
        const restaurant = await prisma.restaurant.findUnique({
          where: { id: parseInt(id) },
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
              addons: true
          },
        });
  
  
        if (!restaurant) {
          throw new Error('Restaurant not found.');
        }
  
  
        return restaurant;
  
      } catch (error) {
        // ... error handling
      }
    },
      restaurants: async (parent, args, { prisma }) => {  // restaurants:[Restaurant]
      try {
        const restaurants = await prisma.restaurant.findMany({
          include: { owner: true }, // Include owner details
        });
        return restaurants;
      } catch (error) {
        // ... error handling
      }
    },
  
  
    getRestaurantDetail: async (parent, { id }, { prisma }) => { // getRestaurantDetail(id:String):RestaurantResult
      try {
  
        const restaurant = await prisma.restaurant.findUnique({
          where: { id: parseInt(id) },
          include: {
            categories: {
              include: {
                foods: {
                  include: { variations: true }, // Include variations as needed
                },
              },
            },
            options: true,
            addons: true,
          },
        });
        return restaurant;
      } catch (error) {
        // ... error handling
      }
    },
  
      getRestaurantProfile: async (parent, { id }, { prisma }) => { // getRestaurantProfile(id:String):RestaurantResult
      try {
          const restaurant = await prisma.restaurant.findUnique({
              where: { id: parseInt(id) },
              include: {
                  // Include related data as needed (e.g., openingTimes, owner, etc.)
                  openingTimes: {
                      include: {
                          times: true
                      }
                  },
                  owner: true
              },
          });
          return restaurant;
      } catch (error) {
          console.error("Error fetching restaurant profile:", error);
          throw new Error("Failed to fetch restaurant profile.");
      }
  },
  
  
  
    restaurantByOwner: async (parent, { id }, { prisma, user }) => { // restaurantByOwner(id:String):VendorResult
      try {
  
        // ... (Add authentication and Prisma query logic)
  
      } catch (error) {
        // ... error handling
      }
    },
      restaurantList: async (parent, args, { prisma }) => { // restaurantList:[Restaurant]
      try {
        const restaurantList = await prisma.restaurant.findMany({
          select: {
            id: true,
            name: true,
            address: true,
          },
        });
        return restaurantList;
      } catch (error) {
        // ... error handling
      }
    },
  
  
  
    // ... (other restaurant queries)
  };