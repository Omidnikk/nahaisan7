import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const customerMutationResolvers = {
    sendChatMessage: async (parent, { orderId, messageInput }, context, info) => {
        try {
            checkAuth(context, "customer")
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
    login: async (parent, { email, password, type, appleId, name, notificationToken }, context, info) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    OR: [
                        { email: email },
                        { appleId: appleId }
                    ]
                },
            });

            if (!user || (user.password !== password && !appleId) || user.userType !== type) {
                throw new Error('Invalid credentials');
            }
            if (notificationToken) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        notificationToken: notificationToken
                    }
                })
            }
            return {
                userId: user.id,
                token: 'test-token',
                tokenExpiration: 'test-expiration',
                name: user.name,
                email: user.email,
                phone: user.phone,
                isActive: user.isActive,
                isNewUser: user.password ? false : true
            };
        } catch (error) {
            console.error('Error in login:', error);
            throw new Error('Failed to login. Check server logs');
        }
    },
    emailExist: async (parent, { email }, context, info) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    _id: true,
                    userType: true
                }
            });
            if (!user) return null
            return user
        } catch (error) {
            console.error('Error in emailExist:', error);
            throw new Error('Failed to check email existence. Check server logs');
        }
    },
    phoneExist: async (parent, { phone }, context, info) => {
        try {
            const user = await prisma.user.findUnique({
                where: { phone },
                select: {
                    _id: true,
                    userType: true
                }
            });
            if (!user) return null
            return user
        } catch (error) {
            console.error('Error in phoneExist:', error);
            throw new Error('Failed to check phone existence. Check server logs');
        }
    },
    sendOtpToEmail: async (parent, { email, otp }, context, info) => {
        try {
            //TODO: implementation with real email service
            return { result: true };
        } catch (error) {
            console.error('Error in sendOtpToEmail:', error);
            throw new Error('Failed to send OTP to email. Check server logs');
        }
    },
    sendOtpToPhoneNumber: async (parent, { phone, otp }, context, info) => {
        try {
            //TODO: implementation with real sms service
            return { result: true };
        } catch (error) {
            console.error('Error in sendOtpToPhoneNumber:', error);
            throw new Error('Failed to send OTP to phone number. Check server logs');
        }
    },
    resetPassword: async (parent, { password, email }, context, info) => {
        try {
            checkAuth(context, "customer");
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("User not found");
            }
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    password: password
                }
            });
            return {
                result: true
            };
        } catch (error) {
            console.error("Error in resetPassword:", error);
            throw new Error("Failed to reset password. Check server logs");
        }
    },
    createUser: async (parent, { userInput }, context, info) => {
        try {
            const user = await prisma.user.create({
                data: {
                    name: userInput.name,
                    phone: userInput.phone,
                    email: userInput.email,
                    password: userInput.password,
                    notificationToken: userInput.notificationToken,
                    appleId: userInput.appleId,
                    userType: "customer"
                },
            });

            return {
                userId: user.id,
                token: 'test-token',
                tokenExpiration: 'test-expiration',
                name: user.name,
                email: user.email,
                phone: user.phone,
            };
        } catch (error) {
            console.error("Error in createUser:", error);
            throw new Error("Failed to create user. Check server logs");
        }
    },
    updateUser: async (parent, { updateUserInput }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    name: updateUserInput.name,
                    phone: updateUserInput.phone,
                    phoneIsVerified: updateUserInput.phoneIsVerified,
                    emailIsVerified: updateUserInput.emailIsVerified
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
            console.error("Error in updateUser:", error);
            throw new Error("Failed to update user. Check server logs");
        }
    },
    updateNotificationStatus: async (parent, { offerNotification, orderNotification }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    isOfferNotification: offerNotification,
                    isOrderNotification: orderNotification
                },
                select: {
                    id: true,
                    notificationToken: true,
                    isOfferNotification: true,
                    isOrderNotification: true
                }
            });
        } catch (error) {
            console.error("Error in updateNotificationStatus:", error);
            throw new Error("Failed to update notification status. Check server logs");
        }
    },
    placeOrder: async (parent, { restaurant, orderInput, paymentMethod, couponCode, tipping, taxationAmount, address, orderDate, isPickedUp, deliveryCharges, instructions }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.order.create({
                data: {
                    restaurantId: restaurant,
                    paymentMethod: paymentMethod,
                    tipping: tipping,
                    taxationAmount: taxationAmount,
                    userId: context.user.id,
                    orderDate: new Date(orderDate),
                    isPickedUp: isPickedUp,
                    deliveryCharges: deliveryCharges,
                    deliveryAddress: {
                        create: {
                            location: {
                                create: {
                                    coordinates: address.location.coordinates
                                }
                            },
                            deliveryAddress: address.deliveryAddress,
                            details: address.details,
                            label: address.label
                        }
                    },
                    items: {
                        createMany: {
                            data: orderInput.map(order => ({
                                foodId: order.food,
                                quantity: order.quantity,
                                variationId: order.variation,
                                addons: {
                                    connect: order.addons.map(addonId => ({ id: addonId }))
                                }
                            }))
                        },
                    },
                    include: {
                        deliveryAddress: true,
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
                        restaurant: {
                            include: {
                                location: true
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error in placeOrder:", error);
            throw new Error("Failed to place order. Check server logs");
        }
    },
    pushToken: async (parent, { token }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id,
                },
                data: {
                    notificationToken: token,
                },
            });
        } catch (error) {
            console.error("Error in pushToken:", error);
            throw new Error("Failed to save push token. Check server logs");
        }
    },
    forgotPassword: async (parent, { email, otp }, context, info) => {
        try {
            //TODO: implementation to verify email and send real email
            return {
                result: true
            }
        } catch (error) {
            console.error("Error in forgotPassword:", error);
            throw new Error("Failed to forgot password. Check server logs");
        }
    },
    coupon: async (parent, { coupon }, context, info) => {
        try {
            checkAuth(context, "customer")
            return await prisma.coupon.findUnique({
                where: {
                    title: coupon
                },
            });
        } catch (error) {
            console.error("Error in coupon:", error);
            throw new Error("Failed to apply coupon. Check server logs");
        }
    },
    deleteAddress: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    addresses: {
                        delete: {
                            id: id
                        }
                    }
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
            console.error("Error in deleteAddress:", error);
            throw new Error("Failed to delete address. Check server logs");
        }
    },
    createAddress: async (parent, { addressInput }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    addresses: {
                        create: {
                            label: addressInput.label,
                            deliveryAddress: addressInput.deliveryAddress,
                            details: addressInput.details,
                            location: {
                                create: {
                                    coordinates: addressInput.location.coordinates
                                }
                            },
                            selected: addressInput.selected
                        }
                    }
                },
                include: {
                    addresses: {
                        include: {
                            location: true,
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error in createAddress:", error);
            throw new Error("Failed to create address. Check server logs");
        }
    },
    editAddress: async (parent, { addressInput }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    addresses: {
                        update: {
                            where: {
                                id: addressInput._id
                            },
                            data: {
                                label: addressInput.label,
                                deliveryAddress: addressInput.deliveryAddress,
                                details: addressInput.details,
                                location: {
                                    update: {
                                        coordinates: addressInput.location.coordinates
                                    }
                                },
                                selected: addressInput.selected
                            }
                        }
                    }
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
            console.error("Error in editAddress:", error);
            throw new Error("Failed to edit address. Check server logs");
        }
    },
    changePassword: async (parent, { oldPassword, newPassword }, context, info) => {
        try {
            checkAuth(context, "customer");
            const user = await prisma.user.findUnique({
                where: {
                    id: context.user.id
                },
            });
            if (!user || user.password !== oldPassword) {
                throw new Error("Invalid old password");
            }
            await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    password: newPassword
                }
            });
            return true;
        } catch (error) {
            console.error("Error in changePassword:", error);
            throw new Error("Failed to change password. Check server logs");
        }
    },
    selectAddress: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    addresses: {
                        updateMany: {
                            where: {
                                NOT: {
                                    id: id
                                }
                            },
                            data: {
                                selected: false
                            }
                        }
                    }
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
            console.error("Error in selectAddress:", error);
            throw new Error("Failed to select address. Check server logs");
        }
    },
    reviewOrder: async (parent, { reviewInput }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.order.update({
                where: {
                    id: reviewInput.order
                },
                data: {
                    review: {
                        create: {
                            rating: reviewInput.rating,
                            description: reviewInput.description
                        }
                    }
                },
                include: {
                    restaurant: true,
                    deliveryAddress: {
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
            console.error("Error in reviewOrder:", error);
            throw new Error("Failed to review order. Check server logs");
        }
    },
    addFavourite: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "customer");
            return await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    favourite: {
                        push: id
                    }
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
            console.error("Error in addFavourite:", error);
            throw new Error("Failed to add favourite restaurant. Check server logs");
        }
    },
    saveNotificationTokenWeb: async (parent, { token }, context, info) => {
        try {
            checkAuth(context, "customer");
            await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    notificationToken: token
                }
            });
            return {
                success: true,
                message: "ok"
            };
        } catch (error) {
            console.error("Error in saveNotificationTokenWeb:", error);
            throw new Error("Failed to save notification token web. Check server logs");
        }
    }
};

export default customerMutationResolvers;