import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const restaurantMutationResolvers = {
    sendChatMessage: async (parent, { orderId, messageInput }, context, info) => {
        try {
            checkAuth(context, "restaurant")
            const newMessage = await prisma.chat.create({
                data: {
                    message: messageInput.message,
                    orderId: orderId,
                    userId: context.user.id
                },
                include: {
                    user: true
                }
            })
            pubsub.publish(`NEW_MESSAGE_${orderId}`, { subscriptionNewMessage: newMessage });
            return {
                success: true,
                message: "ok",
                data: newMessage
            }
        } catch (error) {
            console.error("Error in sendChatMessage:", error);
            throw new Error("Failed to send chat message. Check server logs");
        }
    },
    restaurantLogin: async (parent, { username, password }, context, info) => {
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: { username },
            });
            if (!restaurant || restaurant.password !== password) {
                throw new Error('Invalid credentials');
            }
            return {
                token: 'test-token',
                restaurantId: restaurant.id,
            };
        } catch (error) {
            console.error("Error in restaurantLogin:", error);
            throw new Error("Failed to restaurant login. Check server logs");
        }
    },
    acceptOrder: async (parent, { _id, time }, context, info) => {
        try {
            checkAuth(context, "restaurant");
            return await prisma.order.update({
                where: {
                    id: _id
                },
                data: {
                    orderStatus: "preparing",
                    preparationTime: time,
                    acceptedAt: new Date()
                }
            });
        } catch (error) {
            console.error("Error in acceptOrder:", error);
            throw new Error("Failed to accept order. Check server logs");
        }
    },
    cancelOrder: async (parent, { _id, reason }, context, info) => {
        try {
            checkAuth(context, "restaurant");
            return await prisma.order.update({
                where: {
                    id: _id
                },
                data: {
                    orderStatus: "cancelled",
                    reason: reason,
                    cancelledAt: new Date()
                }
            });
        } catch (error) {
            console.error("Error in cancelOrder:", error);
            throw new Error("Failed to cancel order. Check server logs");
        }
    },
    orderPickedUp: async (parent, { _id }, context, info) => {
        try {
            checkAuth(context, "restaurant");
            return await prisma.order.update({
                where: {
                    id: _id
                },
                data: {
                    orderStatus: "onTheWay",
                    isPickedUp: true,
                    pickedAt: new Date()
                }
            })
        } catch (error) {
            console.error("Error in orderPickedUp:", error);
            throw new Error("Failed to update order as picked up. Check server logs");
        }
    },
    saveRestaurantToken: async (parent, { token, isEnabled }, context, info) => {
        try {
            checkAuth(context, "restaurant");
            return await prisma.restaurant.update({
                where: {
                    ownerId: context.user.id
                },
                data: {
                    notificationToken: token,
                    enableNotification: isEnabled
                }
            });
        } catch (error) {
            console.error("Error in saveRestaurantToken:", error);
            throw new Error("Failed to save restaurant token. Check server logs");
        }
    },
    toggleAvailability: async (parent, args, context, info) => {
        try {
            checkAuth(context, "restaurant");
            const restaurant = await prisma.restaurant.findFirst({
                where: {
                    ownerId: context.user.id
                },
                select: {
                    isAvailable: true
                }
            })
            return await prisma.restaurant.update({
                where: {
                    ownerId: context.user.id
                },
                data: {
                    isAvailable: !restaurant.isAvailable
                },
            });
        } catch (error) {
            console.error("Error in toggleAvailability:", error);
            throw new Error("Failed to toggle availability. Check server logs");
        }
    },
    muteRing: async (parent, { orderId }, context, info) => {
        try {
            checkAuth(context, "restaurant");
            await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    isRinged: true
                }
            });
            return {
                success: true
            };
        } catch (error) {
            console.error("Error in muteRing:", error);
            throw new Error("Failed to mute ring. Check server logs");
        }
    },
};

export default restaurantMutationResolvers;