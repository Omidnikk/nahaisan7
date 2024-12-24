
import { PrismaClient } from "@prisma/client";
import { PubSub } from 'graphql-subscriptions';
import jwt from 'jsonwebtoken'
import { sendNotification } from "../config/firebase.js";
const prisma = new PrismaClient();
const pubsub = new PubSub();
const JWT_SECRET = 'ddddddddddddd';
const mutationResolvers = {
    // uploadFile: async (_, { file }) => {
    //     const { createReadStream, filename, mimetype, encoding } = await file;
    //     const stream = createReadStream();
    //     const out = fs.createWriteStream(`${__dirname}/uploads/${filename}`);
    //     stream.pipe(out);
    //     await finished(out);
    //     return filename;
    // },
    login: async (_, { email, password, userType }, { prisma }) => {
        try {
            const user = await prisma.user.findFirst({ where: { email, role: userType } });
            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            return {
                token,
                user: user
            };
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error(error.message);
        }
    },
    createUser: async (_, { email, name, role }, { prisma }) => {
        try {
            return await prisma.user.create({
                data: {
                    email,
                    name,
                    role,
                },
            });
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    },
    updateUser: async (_, { id, email, name, role }, { prisma }) => {
        try {
            return await prisma.user.update({
                where: { id },
                data: {
                    email: email,
                    name: name,
                    role: role,
                },
            });
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    },
    deleteUser: async (_, { id }, { prisma }) => {
        try {
            return await prisma.user.delete({ where: { id } });
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user");
        }
    },
    createProduct: async (_, { name, description, price, categoryId, vendorId }, { prisma }) => {
        try {
            return await prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    categoryId,
                    vendorId,
                },
            });
        } catch (error) {
            console.error("Error creating product:", error);
            throw new Error("Failed to create product");
        }
    },
    updateProduct: async (_, { id, name, description, price, categoryId, vendorId }, { prisma }) => {
        try {
            return await prisma.product.update({
                where: { id },
                data: {
                    name: name,
                    description: description,
                    price: price,
                    categoryId: categoryId,
                    vendorId: vendorId
                },
            });
        } catch (error) {
            console.error("Error updating product:", error);
            throw new Error("Failed to update product");
        }
    },
    deleteProduct: async (_, { id }, { prisma }) => {
        try {
            return await prisma.product.delete({ where: { id } });
        } catch (error) {
            console.error("Error deleting product:", error);
            throw new Error("Failed to delete product");
        }
    },
    createCategory: async (_, { name }, { prisma }) => {
        try {
            return await prisma.category.create({
                data: {
                    name,
                },
            });
        } catch (error) {
            console.error("Error creating category:", error);
            throw new Error("Failed to create category");
        }
    },
    updateCategory: async (_, { id, name }, { prisma }) => {
        try {
            return await prisma.category.update({
                where: { id },
                data: {
                    name: name,
                },
            });
        } catch (error) {
            console.error("Error updating category:", error);
            throw new Error("Failed to update category");
        }
    },
    deleteCategory: async (_, { id }, { prisma }) => {
        try {
            return await prisma.category.delete({ where: { id } });
        } catch (error) {
            console.error("Error deleting category:", error);
            throw new Error("Failed to delete category");
        }
    },
    createOrder: async (_, { customerId }, { prisma }) => {
        try {
            const order = await prisma.order.create({ data: { customerId } });
            const orderDetail = await prisma.orderDetails.create();
            await prisma.restaurantOrder.create({
                data: {
                    orderId: "ORD" + order.id,
                    userId: customerId.toString(),
                    orderDetailId: orderDetail.id,
                    paymentMethod: "cashOnDelivery",
                    status: "pending",
                    paymentStatus: "pending"
                }
            });
            const restaurantOrder = await prisma.restaurantOrder.findFirst({ orderBy: { id: 'desc' } });
            pubsub.publish('ORDER_PLACED', { orderId: restaurantOrder.id }) // pubsub call
            return order;
        } catch (error) {
            console.error("Error creating order:", error);
            throw new Error("Failed to create order");
        }
    },
    createFood: async (_, { foodInput }, { prisma }) => {
        try {
            return await prisma.restaurantCategory.update({
                where: { id: parseInt(foodInput.category) },
                data: {
                    foods: {
                        create: [{
                            title: foodInput.title,
                            description: foodInput.description,
                            image: foodInput.image,
                            isActive: foodInput.isActive,
                            variations: {
                                createMany: {
                                    data: foodInput.variations
                                }
                            }
                        }]
                    }
                },

            });
        } catch (error) {
            console.error("Error creating food:", error);
            throw new Error("Failed to create food");
        }
    },
    editFood: async (_, { foodInput }, { prisma }) => {
        try {
            return await prisma.restaurantCategory.update({
                where: { id: parseInt(foodInput.category) },
                data: {
                    foods: {
                        update: {
                            where: {
                                id: parseInt(foodInput.id)
                            },
                            data: {
                                title: foodInput.title,
                                description: foodInput.description,
                                image: foodInput.image,
                                isActive: foodInput.isActive,
                            }
                        }
                    }
                }

            });
        } catch (error) {
            console.error("Error editing food:", error);
            throw new Error("Failed to edit food");
        }
    },
    deleteFood: async (_, { id, restaurant, categoryId }, { prisma }) => {
        try {
            return await prisma.restaurantCategory.update({
                where: { id: parseInt(categoryId) },
                data: {
                    foods: {
                        delete: {
                            id: parseInt(id)
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting food:", error);
            throw new Error("Failed to delete food");
        }
    },
    createCategory: async (_, { category }, { prisma }) => {
        try {
            return await prisma.restaurantCategory.create({
                data: {
                    title: category.title
                }
            })
        } catch (error) {
            console.error("Error creating restaurant category:", error);
            throw new Error("Failed to create restaurant category");
        }
    },
    editCategory: async (_, { category }, { prisma }) => {
        try {
            return await prisma.restaurantCategory.update({
                where: { id: parseInt(category.id) },
                data: {
                    title: category.title
                }
            })
        } catch (error) {
            console.error("Error editing restaurant category:", error);
            throw new Error("Failed to edit restaurant category");
        }
    },
    deleteCategory: async (_, { id }, { prisma }) => {
        try {
            return await prisma.restaurantCategory.delete({
                where: { id: parseInt(id) }
            })
        } catch (error) {
            console.error("Error deleting restaurant category:", error);
            throw new Error("Failed to delete restaurant category");
        }
    },
    saveEmailConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving email configuration:", error);
            throw new Error("Failed to save email configuration");
        }
    },
    saveFormEmailConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving form email configuration:", error);
            throw new Error("Failed to save form email configuration");
        }
    },
    saveSendGridConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving send grid configuration:", error);
            throw new Error("Failed to save send grid configuration");
        }
    },
    saveFirebaseConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            console.log("🚀 ~ saveFirebaseConfiguration: ~ configurationInput:", "configurationInput")
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
            
        } catch (error) {
            console.log("🚀 ~ saveFirebaseConfiguration: ~ configurationInput:", configurationInput)
            console.error("Error saving firebase configuration:", error);
            throw new Error("Failed to save firebase configuration");
        }
    },
    saveSentryConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving sentry configuration:", error);
            throw new Error("Failed to save sentry configuration");
        }
    },
    saveGoogleApiKeyConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving google api key configuration:", error);
            throw new Error("Failed to save google api key configuration");
        }
    },
    saveCloudinaryConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving cloudinary configuration:", error);
            throw new Error("Failed to save cloudinary configuration");
        }
    },
    saveAmplitudeApiKeyConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving amplitude api key configuration:", error);
            throw new Error("Failed to save amplitude api key configuration");
        }
    },
    saveGoogleClientIDConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving google client id configuration:", error);
            throw new Error("Failed to save google client id configuration");
        }
    },
    saveWebConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving web configuration:", error);
            throw new Error("Failed to save web configuration");
        }
    },
    saveAppConfigurations: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving app configurations:", error);
            throw new Error("Failed to save app configurations");
        }
    },
    saveDeliveryRateConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving delivery rate configuration:", error);
            throw new Error("Failed to save delivery rate configuration");
        }
    },
    savePaypalConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving paypal configuration:", error);
            throw new Error("Failed to save paypal configuration");
        }
    },
    saveStripeConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            })
        } catch (error) {
            console.error("Error saving stripe configuration:", error);
            throw new Error("Failed to save stripe configuration");
        }
    },
    saveTwilioConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving twilio configuration:", error);
            throw new Error("Failed to save twilio configuration");
        }
    },
    saveVerificationsToggle: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving verifications toggle:", error);
            throw new Error("Failed to save verifications toggle");
        }
    },
    saveCurrencyConfiguration: async (_, { configurationInput }, { prisma }) => {
        try {
            return await prisma.configuration.update({
                where: { id: 1 },
                data: configurationInput
            });
        } catch (error) {
            console.error("Error saving currency configuration:", error);
            throw new Error("Failed to save currency configuration");
        }
    },
    ownerLogin: async (_, { email, password }, { prisma }) => {
        try {
            const user = await prisma.ownerRestaurants.findFirst({ where: { email: email, password: password } });

            if (!user) {
                return null;
            }
            const restaurants = await prisma.restaurantType.findMany({ where: { ownerId: user.id } })
            return {
                userId: user.id,
                token: "token",
                email: user.email,
                userType: "owner",
                restaurants: restaurants
            }
        } catch (error) {
            console.error("Error during owner login:", error);
            throw new Error("Failed during owner login");
        }
    },
    createSection: async (_, { section }, { prisma }) => {
        try {
            return await prisma.section.create({
                data: {
                    name: section.name,
                    enabled: section.enabled,
                    restaurants: {
                        connect: section.restaurants?.map((id) => ({ id: parseInt(id) })) || []
                    }
                }
            });
        } catch (error) {
            console.error("Error creating section:", error);
            throw new Error("Failed to create section");
        }
    },
    editSection: async (_, { section }, { prisma }) => {
        try {
            return await prisma.section.update({
                where: { id: parseInt(section.id) },
                data: {
                    name: section.name,
                    enabled: section.enabled,
                    restaurants: {
                        set: section.restaurants?.map((id) => ({ id: parseInt(id) })) || []
                    }
                }
            });
        } catch (error) {
            console.error("Error editing section:", error);
            throw new Error("Failed to edit section");
        }
    },
    deleteSection: async (_, { id }, { prisma }) => {
        try {
            return await prisma.section.delete({
                where: { id: parseInt(id) }
            });
        } catch (error) {
            console.error("Error deleting section:", error);
            throw new Error("Failed to delete section");
        }
    },
    deleteVendor: async (_, { id }, { prisma }) => {
        try {
            return await prisma.vendor.delete({ where: { id: parseInt(id) } });
        } catch (error) {
            console.error("Error deleting vendor:", error);
            throw new Error("Failed to delete vendor");
        }
    },
    updateOrderStatus: async (_, { id, status, reason }, { prisma }) => {
        try {
            const order = await prisma.restaurantOrder.update({
                where: { id: parseInt(id) },
                data: {
                    orderStatus: status,
                    reason: reason
                }
            });
            pubsub.publish('subscriptionOrder', { orderId: id }) // pubsub call
            return order
        } catch (error) {
            console.error("Error updating order status:", error);
            throw new Error("Failed to update order status");
        }
    },
    updateStatus: async (_, { id, orderStatus }, { prisma }) => {
        try {
            return await prisma.restaurantOrder.update({
                where: { id: parseInt(id) },
                data: { orderStatus }
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            throw new Error("Failed to update order status");
        }
    },
    uploadToken: async (_, { id, pushToken }, { prisma }) => {
        try {
            return await prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    pushToken: pushToken
                }
            });
        } catch (error) {
            console.error("Error uploading token:", error);
            throw new Error("Failed to upload token");
        }
    },
    resetPassword: async (_, { password, token }) => {
        try {
            // Logic to reset password using the token
            return { result: "success" }
        } catch (error) {
            console.error("Error during reset password:", error);
            throw new Error("Failed during reset password");
        }

    },
    createRider: async (_, { riderInput }, { prisma }) => {
        try {
            return await prisma.rider.create({
                data: {
                    name: riderInput.name,
                    username: riderInput.username,
                    password: riderInput.password,
                    phone: riderInput.phone,
                    zoneId: parseInt(riderInput.zone),
                    available: true
                },
            });
        } catch (error) {
            console.error("Error creating rider:", error);
            throw new Error("Failed to create rider");
        }
    },
    editRider: async (_, { riderInput }, { prisma }) => {
        try {
            return await prisma.rider.update({
                where: { id: parseInt(riderInput.id) },
                data: {
                    name: riderInput.name,
                    username: riderInput.username,
                    phone: riderInput.phone,
                    zoneId: parseInt(riderInput.zone),
                }
            });
        } catch (error) {
            console.error("Error editing rider:", error);
            throw new Error("Failed to edit rider");
        }
    },
    deleteRider: async (_, { id }, { prisma }) => {
        try {
            return await prisma.rider.delete({
                where: { id: parseInt(id) }
            })
        } catch (error) {
            console.error("Error deleting rider:", error);
            throw new Error("Failed to delete rider");
        }
    },
    toggleAvailablity: async (_, { id }, { prisma }) => {
        try {
            const rider = await prisma.rider.findUnique({ where: { id: parseInt(id) } });
            return await prisma.rider.update({
                where: { id: parseInt(id) },
                data: {
                    available: !rider.available
                }
            });
        } catch (error) {
            console.error("Error toggling rider availability:", error);
            throw new Error("Failed to toggle rider availability");
        }
    },
    assignRider: async (_, { id, riderId }, { prisma }) => {
        try {
            return await prisma.restaurantOrder.update({
                where: { id: parseInt(id) },
                data: {
                    riderId: parseInt(riderId),
                },
            });
        } catch (error) {
            console.error("Error assigning rider:", error);
            throw new Error("Failed to assign rider");
        }
    },
    updatePaymentStatus: async (_, { id, status }, { prisma }) => {
        try {
            return await prisma.restaurantOrder.update({
                where: { id: parseInt(id) },
                data: {
                    paymentStatus: status,
                    paidAmount: 100,
                }
            });
        } catch (error) {
            console.error("Error updating payment status:", error);
            throw new Error("Failed to update payment status");
        }
    },
    createOffer: async (_, { offer }, { prisma }) => {
        try {
            return await prisma.offer.create({
                data: {
                    name: offer.name,
                    tag: offer.tag,
                    restaurants: {
                        connect: offer.restaurants?.map((id) => ({ id: parseInt(id) })) || []
                    }
                },
            });
        } catch (error) {
            console.error("Error creating offer:", error);
            throw new Error("Failed to create offer");
        }
    },
    editOffer: async (_, { offer }, { prisma }) => {
        try {
            return await prisma.offer.update({
                where: { id: parseInt(offer.id) },
                data: {
                    name: offer.name,
                    tag: offer.tag,
                    restaurants: {
                        set: offer.restaurants?.map((id) => ({ id: parseInt(id) })) || []
                    }
                }
            })
        } catch (error) {
            console.error("Error editing offer:", error);
            throw new Error("Failed to edit offer");
        }
    },
    deleteOffer: async (_, { id }, { prisma }) => {
        try {
            return await prisma.offer.delete({
                where: { id: parseInt(id) }
            });
        } catch (error) {
            console.error("Error deleting offer:", error);
            throw new Error("Failed to delete offer");
        }
    },
    createOptions: async (_, { optionInput }, { prisma }) => {
        try {
            return await prisma.restaurantDetails.update({
                where: { id: 1 },
                data: {
                    options: {
                        create: {
                            title: optionInput.title,
                            description: optionInput.description,
                            price: optionInput.price,
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error creating options:", error);
            throw new Error("Failed to create options");
        }
    },
    createAddons: async (_, { addonInput }, { prisma }) => {
        try {
            return await prisma.restaurantDetails.update({
                where: { id: 1 },
                data: {
                    addons: {
                        create: {
                            title: addonInput.title,
                            description: addonInput.description,
                            options: {
                                connect: addonInput.options?.map((id) => ({ id: parseInt(id) })) || []
                            },
                            quantityMaximum: addonInput.quantityMaximum,
                            quantityMinimum: addonInput.quantityMinimum,

                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error creating addons:", error);
            throw new Error("Failed to create addons");
        }
    },
    editAddon: async (_, { addonInput }, { prisma }) => {
        try {
            return await prisma.restaurantDetails.update({
                where: { id: 1 },
                data: {
                    addons: {
                        update: {
                            where: { id: parseInt(addonInput.id) },
                            data: {
                                title: addonInput.title,
                                description: addonInput.description,
                                options: {
                                    set: addonInput.options?.map((id) => ({ id: parseInt(id) })) || []
                                },
                                quantityMaximum: addonInput.quantityMaximum,
                                quantityMinimum: addonInput.quantityMinimum,
                            }
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error editing addons:", error);
            throw new Error("Failed to edit addons");
        }
    },
    deleteAddon: async (_, { id, restaurant }, { prisma }) => {
        try {
            return await prisma.restaurantDetails.update({
                where: { id: 1 },
                data: {
                    addons: {
                        delete: { id: parseInt(id) }
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting addon:", error);
            throw new Error("Failed to delete addon");
        }
    },
    deleteOption: async (_, { id, restaurant }, { prisma }) => {
        try {
            return await prisma.restaurantDetails.update({
                where: { id: 1 },
                data: {
                    options: {
                        delete: { id: parseInt(id) }
                    }
                }
            });
        } catch (error) {
            console.error("Error deleting option:", error);
            throw new Error("Failed to delete option");
        }
    },
    editOption: async (_, { optionInput }, { prisma }) => {
        try {
            return await prisma.restaurantDetails.update({
                where: { id: 1 },
                data: {
                    options: {
                        update: {
                            where: { id: parseInt(optionInput.id) },
                            data: {
                                title: optionInput.title,
                                description: optionInput.description,
                                price: optionInput.price,
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error editing option:", error);
            throw new Error("Failed to edit option");
        }
    },
    createCoupon: async (_, { couponInput }, { prisma }) => {
        try {
            return await prisma.coupon.create({
                data: couponInput
            })
        } catch (error) {
            console.error("Error creating coupon:", error);
            throw new Error("Failed to create coupon");
        }
    },
    editCoupon: async (_, { couponInput }, { prisma }) => {
        try {
            return await prisma.coupon.update({
                where: { id: parseInt(couponInput.id) },
                data: couponInput
            });
        } catch (error) {
            console.error("Error editing coupon:", error);
            throw new Error("Failed to edit coupon");
        }
    },
    deleteCoupon: async (_, { id }, { prisma }) => {
        try {
            return await prisma.coupon.delete({ where: { id: parseInt(id) } })
        } catch (error) {
            console.error("Error deleting coupon:", error);
            throw new Error("Failed to delete coupon");
        }
    },
    createCuisine: async (_, { cuisineInput }, { prisma }) => {
        try {
            return await prisma.cuisine.create({
                data: cuisineInput
            });
        } catch (error) {
            console.error("Error creating cuisine:", error);
            throw new Error("Failed to create cuisine");
        }
    },
    editCuisine: async (_, { cuisineInput }, { prisma }) => {
        try {
            return await prisma.cuisine.update({
                where: { id: parseInt(cuisineInput.id) },
                data: cuisineInput
            })
        } catch (error) {
            console.error("Error editing cuisine:", error);
            throw new Error("Failed to edit cuisine");
        }
    },
    deleteCuisine: async (_, { id }, { prisma }) => {
        try {
            return await prisma.cuisine.delete({ where: { id: parseInt(id) } });
        } catch (error) {
            console.error("Error deleting cuisine:", error);
            throw new Error("Failed to delete cuisine");
        }
    },
    createBanner: async (_, { bannerInput }, { prisma }) => {
        try {
            return await prisma.banner.create({
                data: bannerInput
            });
        } catch (error) {
            console.error("Error creating banner:", error);
            throw new Error("Failed to create banner");
        }
    },
    editBanner: async (_, { bannerInput }, { prisma }) => {
        try {
            return await prisma.banner.update({
                where: { id: parseInt(bannerInput.id) },
                data: bannerInput
            });
        } catch (error) {
            console.error("Error editing banner:", error);
            throw new Error("Failed to edit banner");
        }
    },
    deleteBanner: async (_, { id }, { prisma }) => {
        try {
            return await prisma.banner.delete({ where: { id: parseInt(id) } })
        } catch (error) {
            console.error("Error deleting banner:", error);
            throw new Error("Failed to delete banner");
        }
    },
    createTipping: async (_, { tippingInput }, { prisma }) => {
        try {
            return await prisma.tipping.create({
                data: tippingInput
            });
        } catch (error) {
            console.error("Error creating tipping:", error);
            throw new Error("Failed to create tipping");
        }
    },
    editTipping: async (_, { tippingInput }, { prisma }) => {
        try {
            return await prisma.tipping.update({
                where: { id: parseInt(tippingInput.id) },
                data: tippingInput
            });
        } catch (error) {
            console.error("Error editing tipping:", error);
            throw new Error("Failed to edit tipping");
        }
    },
    createTaxation: async (_, { taxationInput }, { prisma }) => {
        try {
            return await prisma.taxation.create({ data: taxationInput });
        } catch (error) {
            console.error("Error creating taxation:", error);
            throw new Error("Failed to create taxation");
        }
    },
    editTaxation: async (_, { taxationInput }, { prisma }) => {
        try {
            return await prisma.taxation.update({
                where: { id: parseInt(taxationInput.id) },
                data: taxationInput
            });
        } catch (error) {
            console.error("Error editing taxation:", error);
            throw new Error("Failed to edit taxation");
        }
    },
    createVendor: async (_, { vendorInput }, { prisma }) => {
        try {
            return await prisma.vendor.create({
                data: vendorInput
            });
        } catch (error) {
            console.error("Error creating vendor:", error);
            throw new Error("Failed to create vendor");
        }
    },
    editVendor: async (_, { vendorInput }, { prisma }) => {
        try {
            return await prisma.vendor.update({
                where: { id: parseInt(vendorInput.id) },
                data: vendorInput
            });
        } catch (error) {
            console.error("Error editing vendor:", error);
            throw new Error("Failed to edit vendor");
        }
    },
    editRestaurant: async (_, { restaurant }, { prisma }) => {
        try {
            return await prisma.restaurantProfile.update({
                where: { id: parseInt(restaurant.id) },
                data: {
                    orderId: restaurant.orderId,
                    orderPrefix: restaurant.orderPrefix,
                    name: restaurant.name,
                    image: restaurant.image,
                    logo: restaurant.logo,
                    slug: restaurant.slug,
                    address: restaurant.address,
                    username: restaurant.username,
                    password: restaurant.password,
                    locationId: restaurant.location?.coordinates ? JSON.stringify(restaurant.location.coordinates) : undefined,
                    minimumOrder: restaurant.minimumOrder,
                    tax: restaurant.tax,
                    isAvailable: restaurant.isAvailable,
                    shopType: restaurant.shopType,
                    openingTimes: {
                        set: restaurant.openingTimes?.map((timing) => ({
                            day: timing.day,
                            times: timing.times
                        })) || []
                    }
                }
            });
        } catch (error) {
            console.error("Error editing restaurant:", error);
            throw new Error("Failed to edit restaurant");
        }
    },
    createZone: async (_, { zone }, { prisma }) => {
        try {
            return await prisma.zone.create({
                data: {
                    title: zone.title,
                    description: zone.description,
                    isActive: zone.isActive,
                    locationId: zone.location?.coordinates ? JSON.stringify(zone.location.coordinates) : undefined
                },
            });
        } catch (error) {
            console.error("Error creating zone:", error);
            throw new Error("Failed to create zone");
        }
    },
    editZone: async (_, { zone }, { prisma }) => {
        try {
            return await prisma.zone.update({
                where: { id: parseInt(zone.id) },
                data: {
                    title: zone.title,
                    description: zone.description,
                    isActive: zone.isActive,
                    locationId: zone.location?.coordinates ? JSON.stringify(zone.location.coordinates) : undefined
                }
            });
        } catch (error) {
            console.error("Error editing zone:", error);
            throw new Error("Failed to edit zone");
        }
    },
    deleteZone: async (_, { id }) => {
        return await prisma.zone.delete({
            where: { id: parseInt(id) }
        })
    },
    vendorResetPassword: async (_, { oldPassword, newPassword }) => {
        // add logic for reset password for vendor
        return "success";
    },
    deleteRestaurant: async (_, { id }) => {
        return await prisma.restaurantProfile.update({
            where: { id: parseInt(id) },
            data: {
                isActive: false
            }
        })
    },
    updateTimings: async (_, { id, openingTimes }) => {
        return await prisma.restaurantProfile.update({
            where: { id: parseInt(id) },
            data: {
                openingTimes: {
                    set: openingTimes?.map((timing) => ({
                        day: timing.day,
                        times: timing.times
                    })) || []
                }
            }
        })
    },
    sendNotificationUser: async (_, { notificationTitle, notificationBody }, { prisma, user }) => {
        try {
            await checkAuthorization(user, ["ADMIN"]);
               const users = await prisma.user.findMany();
             const notificationResult = await Promise.all(users.map(async (user)=> {
                    if(user.pushToken){
                      return await sendNotification(user.pushToken, notificationTitle, notificationBody)
                    }
              }))
              return "success"
            } catch (error) {
               console.error("Error during sendNotification:", error);
               throw new Error("Failed to send notification");
          }
       },
    updateCommission: async (_, { id, commissionRate }) => {
        return await prisma.restaurantType.update({
            where: { id: parseInt(id) },
            data: {
                commissionRate: commissionRate
            }
        });
    },
    createRestaurant: async (_, { restaurant, owner }) => {
        return await prisma.restaurantProfile.create({
            data: {
                orderId: restaurant.orderId,
                orderPrefix: restaurant.orderPrefix,
                name: restaurant.name,
                image: restaurant.image,
                logo: restaurant.logo,
                slug: restaurant.slug,
                address: restaurant.address,
                username: restaurant.username,
                password: restaurant.password,
                locationId: restaurant.location?.coordinates ? JSON.stringify(restaurant.location.coordinates) : undefined,
                shopType: restaurant.shopType,
                minimumOrder: restaurant.minimumOrder,
                tax: restaurant.tax,
                cuisines: restaurant.cuisines,
                ownerId: parseInt(owner),
            },

        })
    },
    updateDeliveryBoundsAndLocation: async (_, { id, boundType, bounds, circleBounds, location, address, postCode, city }) => {
        return await prisma.restaurantProfile.update({
            where: { id: parseInt(id) },
            data: {
                deliveryBoundsId: bounds ? JSON.stringify(bounds) : undefined,
                locationId: location?.coordinates ? JSON.stringify(location.coordinates) : undefined,
            },
        });
    },
    updateWithdrawReqStatus: async (_, { id, status }) => {
        const withdrawRequest = await prisma.withdrawRequest.update({
            where: { id: parseInt(id) },
            data: { status: status }
        });
        const rider = await prisma.rider.findUnique({ where: { id: withdrawRequest.riderId } });
        return {
            success: true,
            message: "success",
            data: {
                withdrawRequest: withdrawRequest,
                rider: { ...rider, currentWalletAmount: 100 } // we can't change the current wallet as this requires extra logic and models
            }
        }
    },
};
export default mutationResolvers;