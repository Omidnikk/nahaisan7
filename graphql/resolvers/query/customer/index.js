import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const customerQueryResolvers = {
    users: async (parent, args, context, info) => {
        try {
            checkAuth(context, "customer")
            return await prisma.user.findMany();
        } catch (error) {
            console.error("Error in users:", error);
            throw new Error("Failed to fetch users. Check server logs");
        }
    },
    profile: async (parent, args, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.findUnique({
                where: {
                    id: context.user.id
                },
                include: {
                    addresses: {
                        include: {
                            location: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error in profile:", error);
            throw new Error("Failed to fetch user profile. Check server logs");
        }
    },
    getCountryByIso: async (parent, { iso }, context, info) => {
        try {
            checkAuth(context, "customer");
            return {
                cities: [
                    {
                        id: 1,
                        name: 'City 1',
                        latitude: 12.34,
                        longitude: 56.78,
                    },
                    {
                        id: 2,
                        name: 'City 2',
                        latitude: 34.56,
                        longitude: 78.90,
                    },
                ]
            }
        } catch (error) {
            console.error("Error in getCountryByIso:", error);
            throw new Error("Failed to fetch Country by ISO. Check server logs");
        }
    },
    order: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.order.findUnique({
                where: {
                    id: id
                },
                include: {
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
                    items: {
                        include: {
                            variation: true,
                            addons: {
                                include: {
                                    options: true
                                }
                            }
                        }
                    },
                    user: true,
                }
            });
        } catch (error) {
            console.error("Error in order:", error);
            throw new Error("Failed to fetch order. Check server logs");
        }
    },
    orders: async (parent, { offset }, context, info) => {
        try {
            checkAuth(context, "customer");
            const skip = offset || 0;
            return await prisma.order.findMany({
                where: {
                    userId: context.user.id,
                },
                skip: skip,
                take: 10,
                include: {
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
                    items: {
                        include: {
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
                    review: true
                }
            });
        } catch (error) {
            console.error("Error in orders:", error);
            throw new Error("Failed to fetch orders. Check server logs");
        }
    },
    nearByRestaurants: async (parent, { latitude, longitude, shopType }, context, info) => {
        try {
            checkAuth(context, "customer");
            const where = {};
            if (shopType) {
                where.shopType = shopType
            }

            return {
                offers: [],
                sections: [],
                restaurants: await prisma.restaurant.findMany({
                    where: where,
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
                        openingTimes: true,
                        reviewData: {
                            include: {
                                reviews: {
                                    include: {
                                        order: {
                                            include: {
                                                user: true
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
                        location: true,
                    }
                }),
            }
        } catch (error) {
            console.error("Error in nearByRestaurants:", error);
            throw new Error("Failed to fetch nearby restaurants. Check server logs");
        }
    },
    nearByRestaurantsPreview: async (parent, { latitude, longitude, shopType }, context, info) => {
        try {
            checkAuth(context, "customer");
            const where = {};
            if (shopType) {
                where.shopType = shopType
            }
            return {
                offers: [],
                sections: [],
                restaurants: await prisma.restaurant.findMany({
                    where: where,
                    include: {
                        openingTimes: true,
                        reviewData: true
                    }
                }),
            }
        } catch (error) {
            console.error("Error in nearByRestaurantsPreview:", error);
            throw new Error("Failed to fetch nearby restaurants preview. Check server logs");
        }
    },
    topRatedVendorsPreview: async (parent, { latitude, longitude }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.restaurant.findMany({
                orderBy: {
                    reviewData: {
                        total: 'desc'
                    }
                },
                include: {
                    openingTimes: true,
                    reviewData: true
                },
            });
        } catch (error) {
            console.error("Error in topRatedVendorsPreview:", error);
            throw new Error("Failed to fetch top rated vendors. Check server logs");
        }
    },
    restaurant: async (parent, { id, slug }, context, info) => {
        try {
            checkAuth(context, "customer");
            const where = {}
            if (id) {
                where.id = id
            }
            if (slug) {
                where.slug = slug
            }
            return await prisma.restaurant.findUnique({
                where: where,
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
                    reviewData: {
                        include: {
                            reviews: {
                                include: {
                                    order: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    zone: {
                        include: {
                            location: true
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error in restaurant:", error);
            throw new Error("Failed to fetch restaurant. Check server logs");
        }
    },
    cuisines: async (parent, args, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.cuisine.findMany();
        } catch (error) {
            console.error("Error in cuisines:", error);
            throw new Error("Failed to fetch cuisines. Check server logs");
        }
    },
    rider: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.rider.findUnique({
                where: {
                    id: id
                },
                include: {
                    location: true
                }
            });
        } catch (error) {
            console.error("Error in rider:", error);
            throw new Error("Failed to fetch rider. Check server logs");
        }
    },
    taxes: async (parent, args, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.tax.findMany();
        } catch (error) {
            console.error("Error in taxes:", error);
            throw new Error("Failed to fetch taxes. Check server logs");
        }
    },
    tips: async (parent, args, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.tip.findMany();
        } catch (error) {
            console.error("Error in tips:", error);
            throw new Error("Failed to fetch tips. Check server logs");
        }
    },
    userFavourite: async (parent, { latitude, longitude }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.restaurant.findMany({
                where: {
                    favouriteUsers: {
                        some: {
                            id: context.user.id
                        }
                    }
                },
                include: {
                    openingTimes: true,
                    reviewData: {
                        include: {
                            reviews: {
                                include: {
                                    order: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }
                        }
                    },
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
                        },
                    },
                    options: true,
                    addons: {
                        include: {
                            options: true
                        }
                    },
                    location: true
                }
            });
        } catch (error) {
            console.error("Error in userFavourite:", error);
            throw new Error("Failed to fetch user favourite restaurants. Check server logs");
        }
    },
    chat: async (parent, { order }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.chat.findMany({
                where: {
                    orderId: order
                },
                include: {
                    user: true
                }
            })
        } catch (error) {
            console.error("Error in chat:", error);
            throw new Error("Failed to fetch chat. Check server logs");
        }
    },
    relatedItems: async (parent, { itemId, restaurantId }, context, info) => {
        try {
            checkAuth(context, "customer");
            //TODO: implementation
            return null;
        } catch (error) {
            console.error("Error in relatedItems:", error);
            throw new Error("Failed to fetch related items. Check server logs");
        }
    },
    popularItems: async (parent, { restaurantId }, context, info) => {
        try {
            checkAuth(context, "customer");
            //TODO: implementation
            return [
                {
                    id: 1,
                    count: 1
                }
            ]
        } catch (error) {
            console.error("Error in popularItems:", error);
            throw new Error("Failed to fetch popular items. Check server logs");
        }
    },
};
export default customerQueryResolvers;