import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const riderMutationResolvers = {
      sendChatMessage:async (parent, { orderId, messageInput }, context, info) => {
        try {
           checkAuth(context, "rider")
            const newMessage = await prisma.chat.create({
              data:{
                  message:messageInput.message,
                 orderId:orderId,
                 userId:context.user.id
               },
                include:{
                    user:true
                }
          })
         pubsub.publish(`NEW_MESSAGE_${orderId}`, { subscriptionNewMessage: newMessage });
          return{
            success:true,
            message:"ok",
            data:newMessage
           }
      } catch (error) {
           console.error("Error in sendChatMessage:", error);
           throw new Error("Failed to send chat message. Check server logs");
        }
    },
    riderLogin: async (parent, { username, password, notificationToken }, context, info) => {
      try {
          const rider = await prisma.rider.findUnique({
              where: { username },
         });
          if (!rider || rider.password !== password) {
              throw new Error('Invalid credentials');
            }
            if(notificationToken){
                await prisma.rider.update({
                    where:{
                        id:rider.id
                    },
                    data:{
                        notificationToken:notificationToken
                    }
                })
           }
         return {
             userId: rider.id,
            token: 'test-token',
          };
        } catch (error) {
          console.error("Error in riderLogin:", error);
            throw new Error("Failed to login rider. Check server logs");
        }
    },
     updateOrderStatusRider:async(parent,{id,status},context, info)=>{
       try {
           checkAuth(context, "rider");
          return await prisma.order.update({
            where:{
                id:id
            },
               data:{
                 orderStatus:status,
               }
         })
       } catch (error) {
            console.error("Error in updateOrderStatusRider:", error);
          throw new Error("Failed to update order status for rider. Check server logs");
        }
    },
    assignOrder:async(parent,{id},context, info)=>{
        try {
            checkAuth(context, "rider");
          return await prisma.order.update({
                where:{
                  id:id
                },
                data:{
                   riderId:context.user.id,
                   orderStatus:"onTheWay"
               },
               include:{
                  rider:true
               }
            });
         } catch (error) {
            console.error("Error in assignOrder:", error);
            throw new Error("Failed to assign order for rider. Check server logs");
          }
   },
    updateLocation: async (parent,{latitude, longitude},context, info)=>{
        try {
            checkAuth(context, "rider");
           return await prisma.rider.update({
             where:{
               id:context.user.id
           },
             data:{
               location:{
                    update:{
                         coordinates:[ parseFloat(latitude),parseFloat(longitude) ]
                    }
                 }
             }
         })
        } catch (error) {
             console.error("Error in updateLocation:", error);
           throw new Error("Failed to update location. Check server logs");
          }
    },
     toggleAvailablity: async (parent, { id }, context, info) => {
         try {
           checkAuth(context, "rider");
            return await prisma.rider.update({
                where:{
                   id:context.user.id
                },
                data:{
                  available:false
                 }
            });
       } catch (error) {
           console.error("Error in toggleAvailablity:", error);
          throw new Error("Failed to toggle rider availability. Check server logs");
        }
    },
    createWithdrawRequest:async(parent,{amount},context, info)=>{
        try {
         checkAuth(context, "rider");
           const lastRequest = await prisma.withdrawRequest.findFirst({
               orderBy:{
                requestId:'desc'
              }
          });
           const nextId = lastRequest ?  parseInt(lastRequest.requestId) + 1 : 1
            return await prisma.withdrawRequest.create({
               data:{
                  requestId:nextId.toString(),
                   requestAmount:amount,
                    riderId: context.user.id,
                    requestTime: new Date(),
                     status:'pending'
                },
                include:{
                   rider:true
               }
           })
       } catch (error) {
           console.error("Error in createWithdrawRequest:", error);
         throw new Error("Failed to create withdraw request. Check server logs");
        }
  },
      createEarning: async (parent, { earningsInput }, context, info) => {
          try {
              checkAuth(context, "rider");
            return await prisma.earning.create({
                 data: {
                     orderId: earningsInput.orderId,
                   deliveryFee: earningsInput.deliveryFee,
                   orderStatus: earningsInput.orderStatus,
                  paymentMethod: earningsInput.paymentMethod,
                    deliveryTime: earningsInput.deliveryTime,
                   riderId:context.user.id
                 },
                include:{
                   rider:true
               }
            });
          } catch (error) {
               console.error("Error in createEarning:", error);
             throw new Error("Failed to create earning. Check server logs");
        }
    },
};
export default riderMutationResolvers;