import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';

const prisma = new PrismaClient();
const restaurantQueryResolvers = {
    restaurantOrders: async (parent, args, context, info) => {
        try {
            checkAuth(context, "restaurant");
             return await prisma.order.findMany({
                 where:{
                     restaurant:{
                         ownerId:context.user.id
                     }
                 },
                 include:{
                     items:true,
                     deliveryAddress:true,
                     restaurant:{
                         include:{
                            location:true
                       }
                     },
                     user:true,
                    rider:true,
                  }
             });
       } catch (error) {
             console.error("Error in restaurantOrders:", error);
           throw new Error("Failed to fetch restaurant orders. Check server logs");
         }
    },
    restaurant: async (parent,{id}, context, info) => {
        try {
          checkAuth(context, "restaurant");
           return await prisma.restaurant.findUnique({
             where:{
                 id:id
             },
             include:{
                 owner:true,
                 openingTimes:true,
                deliveryBounds:true,
                 categories:{
                      include:{
                        foods:{
                            include:{
                             variations:{
                                   include:{
                                        addons:true
                                    }
                                  }
                                }
                           }
                    }
                  },
                  options:true,
                    addons:{
                      include:{
                            options:true
                        }
                     }
              }
         })
        } catch (error) {
            console.error("Error in restaurant:", error);
         throw new Error("Failed to fetch restaurant. Check server logs");
        }
    },
     configuration: async (parent, args, context, info) => {
         try {
           checkAuth(context, "restaurant");
             return await prisma.configuration.findFirst();
         } catch (error) {
            console.error("Error in configuration:", error);
          throw new Error("Failed to fetch configuration. Check server logs");
         }
     },
     restaurantInfo: async (parent,{id}, context, info) => {
         try {
           checkAuth(context, "restaurant");
            return await prisma.restaurant.findUnique({
                where:{
                   id:id
                },
                include:{
                    openingTimes:true,
                    location:true
                  }
          })
        } catch (error) {
          console.error("Error in restaurantInfo:", error);
          throw new Error("Failed to fetch restaurant info. Check server logs");
       }
     },
    defaultRestaurantCreds: async(parent, args, context, info)=>{
      try {
           checkAuth(context, "restaurant");
            const restaurant = await prisma.restaurant.findFirst({
              where:{
                 ownerId: context.user.id
              }
            })
          return {
                restaurantUsername: restaurant.username,
               restaurantPassword: restaurant.password,
           }
        } catch (error) {
          console.error("Error in defaultRestaurantCreds:", error);
          throw new Error("Failed to fetch default restaurant creds. Check server logs");
       }
    }
};
export default restaurantQueryResolvers;