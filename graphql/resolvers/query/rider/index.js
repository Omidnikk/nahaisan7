import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';

const prisma = new PrismaClient();
const riderQueryResolvers = {
  profile: async (parent, { id }, context, info) => {
    try {
        checkAuth(context, "rider");
       return await prisma.rider.findUnique({
            where:{
                id:id
            },
            include:{
              zone:true
            }
       })
       } catch (error) {
            console.error("Error in profile:", error);
            throw new Error("Failed to fetch rider profile. Check server logs");
      }
  },
  configuration: async (parent, args, context, info) => {
    try {
          checkAuth(context, "rider");
          return await prisma.configuration.findFirst();
         } catch (error) {
           console.error("Error in configuration:", error);
           throw new Error("Failed to fetch configuration. Check server logs");
        }
    },
  riderOrders: async (parent, args, context, info) => {
       try {
          checkAuth(context, "rider");
            return await prisma.order.findMany({
               where:{
                riderId:context.user.id
               },
                  include:{
                      items:{
                          include:{
                            variation:true,
                            addons:{
                                include:{
                                    options:true,
                                }
                            }
                         }
                      },
                    deliveryAddress:{
                        include:{
                         location:true
                       }
                    },
                   restaurant:{
                        include:{
                          location:true
                      }
                    },
                  user:true,
                   rider:true,
                }
           })
        } catch (error) {
            console.error("Error in riderOrders:", error);
         throw new Error("Failed to fetch rider orders. Check server logs");
       }
  },
   riderEarnings: async (parent, { id, offset }, context, info) => {
      try {
          checkAuth(context, "rider");
         const skip = offset || 0;

           const earnings = await prisma.earning.findMany({
                where: {
                  riderId: context.user.id,
                 },
                 skip:skip,
                 take:10,
               });
              return earnings;
         } catch (error) {
            console.error("Error in riderEarnings:", error);
          throw new Error("Failed to fetch rider earnings. Check server logs");
       }
  },
  riderWithdrawRequests: async (parent, { id, offset }, context, info) => {
    try {
        checkAuth(context, "rider");
      const skip = offset || 0;
        return await prisma.withdrawRequest.findMany({
              where: {
                riderId:context.user.id
              },
               skip: skip,
                take: 10,
                include:{
                     rider:true
                }
            });
     } catch (error) {
         console.error("Error in riderWithdrawRequests:", error);
         throw new Error("Failed to fetch rider withdraw requests. Check server logs");
        }
  },
    defaultRiderCreds:async(parent, args, context, info)=>{
        try {
          checkAuth(context, "rider");
           const rider = await prisma.rider.findFirst({
             where:{
                  id:context.user.id
              }
            })
          return {
                riderUsername: rider.username,
             riderPassword: rider.password,
          }
        } catch (error) {
             console.error("Error in defaultRiderCreds:", error);
           throw new Error("Failed to fetch default rider creds. Check server logs");
         }
    },
};
export default riderQueryResolvers;