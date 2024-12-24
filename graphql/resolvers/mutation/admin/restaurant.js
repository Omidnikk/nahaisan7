import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';

const prisma = new PrismaClient();

const adminRestaurantMutationResolvers = {
    editRestaurant: async (parent, { restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: restaurant._id
                },
                data: {
                    orderId: restaurant.orderId,
                    orderPrefix: restaurant.orderPrefix,
                    name: restaurant.name,
                    image: restaurant.image,
                    slug: restaurant.slug,
                    address: restaurant.address,
                    username: restaurant.username,
                    password: restaurant.password,
                    location: {
                        update: {
                            coordinates: restaurant.location.coordinates
                        }
                    },
                    isAvailable: restaurant.isAvailable,
                    minimumOrder: restaurant.minimumOrder,
                    tax: restaurant.tax,
                    openingTimes: {
                        set: restaurant.openingTimes
                    },
                    shopType: restaurant.shopType,
                    logo: restaurant.logo
                }
            });
        } catch (error) {
            console.error("Error in editRestaurant:", error);
            throw new Error("Failed to edit restaurant. Check server logs");
        }
    },
    deleteRestaurant: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: id
                },
                data: {
                    isActive: false
                }
            });
        } catch (error) {
            console.error("Error in deleteRestaurant:", error);
            throw new Error("Failed to delete restaurant. Check server logs");
        }
    },
    updateTimings: async (parent, { id, openingTimes }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: id
                },
                data: {
                    openingTimes: {
                        set: openingTimes
                    }
                },
                include: {
                    openingTimes: true
                }
            })
        } catch (error) {
            console.error("Error in updateTimings:", error);
            throw new Error("Failed to update restaurant timings. Check server logs");
        }
    },
    sendNotificationUser: async (parent, { notificationTitle, notificationBody }, context, info) => {
        try {
            checkAuth(context, "admin");
            //TODO: implementation send notification to every user
            return true
        } catch (error) {
            console.error("Error in sendNotificationUser:", error);
            throw new Error("Failed to send notification to user. Check server logs");
        }
    },
    updateCommission: async (parent, { id, commissionRate }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: id
                },
                data: {
                    commissionRate: commissionRate
                }
            })
        } catch (error) {
            console.error("Error in updateCommission:", error);
            throw new Error("Failed to update commission rate. Check server logs");
        }
    },
    createRestaurant: async (parent, { restaurant, owner }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.create({
                data: {
                    orderId: restaurant.orderId,
                    orderPrefix: restaurant.orderPrefix,
                    name: restaurant.name,
                    slug: restaurant.slug,
                    image: restaurant.image,
                    logo: restaurant.logo,
                    address: restaurant.address,
                    username: restaurant.username,
                    password: restaurant.password,
                    location: {
                        create: {
                            coordinates: restaurant.location.coordinates,
                        },
                    },
                    minimumOrder: restaurant.minimumOrder,
                    tax: restaurant.tax,
                    shopType: restaurant.shopType,
                    cuisines: restaurant.cuisines,
                    owner: {
                        connect: {
                            id: owner
                        }
                    }
                },
                include: {
                    location: true,
                    owner: true
                }
            });
        } catch (error) {
            console.error("Error in createRestaurant:", error);
            throw new Error("Failed to create restaurant. Check server logs");
        }
    },
    updateDeliveryBoundsAndLocation: async (parent, { id, boundType, bounds, circleBounds, location, address, postCode, city }, context, info) => {
        try {
            checkAuth(context, "admin");
            let data = {};
            if (boundType === 'circle') {
                data.deliveryBounds = null
                data.location = {
                    update: {
                        coordinates: location.coordinates
                    }
                }
            } else if (boundType === "polygon") {
                data.deliveryBounds = {
                    set: bounds,
                }
                data.location = {
                    update: {
                        coordinates: location.coordinates
                    }
                }
            }
            else {
                data.location = {
                    update: {
                        coordinates: location.coordinates
                    }
                }
            }
            return await prisma.restaurant.update({
                where: {
                    id: id
                },
                data,
                include: {
                    deliveryBounds: true,
                    location: true
                }
            });
        } catch (error) {
            console.error("Error in updateDeliveryBoundsAndLocation:", error);
            throw new Error("Failed to update delivery bounds and location. Check server logs");
        }
    },
};

export default adminRestaurantMutationResolvers;