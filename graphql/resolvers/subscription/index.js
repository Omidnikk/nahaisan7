import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import checkAuth from '../../utils/auth.js';

const prisma = new PrismaClient();
const pubsub = new PubSub();

const subscriptionResolvers = {
    orderStatusChanged: {
        subscribe: async (parent, { userId }, context, info) => {
            try {
                checkAuth(context, "customer");
                const user = await prisma.user.findUnique({
                    where: {
                        id: context.user.id
                    }
                })
                if (user.id !== userId) {
                    throw new Error("Not authorized");
                }

                return pubsub.asyncIterator([`ORDER_STATUS_CHANGE_${userId}`])
            } catch (error) {
                console.error("Error in subscriptionOrderStatusChanged:", error);
                throw new Error("Failed to subscribe order status changes. Check server logs");
            }
        },
    },
    subscriptionRiderLocation: {
        subscribe: async (parent, { riderId }, context, info) => {
            try {
                checkAuth(context, "rider");
                return pubsub.asyncIterator(`RIDER_LOCATION_${riderId}`)
            } catch (error) {
                console.error("Error in subscriptionRiderLocation:", error);
                throw new Error("Failed to subscribe rider location. Check server logs");
            }
        },
    },
    subscriptionOrder: {
        subscribe: async (parent, { id }, context, info) => {
            try {
                checkAuth(context, "customer");
                return pubsub.asyncIterator(`ORDER_CHANGE_${id}`)
            } catch (error) {
                console.error("Error in subscriptionOrder:", error);
                throw new Error("Failed to subscribe order. Check server logs");
            }
        },
    },
    subscriptionNewMessage: {
        subscribe: async (parent, { order }, context, info) => {
            try {
                checkAuth(context);
                return pubsub.asyncIterator(`NEW_MESSAGE_${order}`)
            } catch (error) {
                console.error("Error in subscriptionNewMessage:", error);
                throw new Error("Failed to subscribe to new messages. Check server logs");
            }
        }
    },
    subscriptionZoneOrders: {
        subscribe: async (parent, { zoneId }, context, info) => {
            try {
                checkAuth(context, "rider")
                return pubsub.asyncIterator([`ZONE_ORDERS_CHANGE_${zoneId}`])
            } catch (error) {
                console.error("Error in subscriptionZoneOrders:", error);
                throw new Error("Failed to subscribe zone order changes. Check server logs");
            }
        },
    },
    subscriptionAssignRider: {
        subscribe: async (parent, { riderId }, context, info) => {
            try {
                checkAuth(context, "rider")
                return pubsub.asyncIterator([`RIDER_ORDER_ASSIGN_${riderId}`])
            } catch (error) {
                console.error("Error in subscriptionAssignRider:", error);
                throw new Error("Failed to subscribe to assigned orders. Check server logs");
            }
        },
    },
    subscribePlaceOrder: {
        subscribe: async (parent, { restaurant }, context, info) => {
            try {
                checkAuth(context, "customer");
                return pubsub.asyncIterator([`RESTAURANT_NEW_ORDER_${restaurant}`])
            } catch (error) {
                console.error("Error in subscribePlaceOrder:", error);
                throw new Error("Failed to subscribe to place order. Check server logs");
            }
        },
    },
    subscribeOrderStatus: {
        subscribe: async (parent, { _id }, context, info) => {
            try {
                checkAuth(context);
                return pubsub.asyncIterator([`ORDER_STATUS_CHANGE_${_id}`])
            } catch (error) {
                console.error("Error in subscribeOrderStatus:", error);
                throw new Error("Failed to subscribe to order status. Check server logs");
            }
        },
    }
};
export default subscriptionResolvers;