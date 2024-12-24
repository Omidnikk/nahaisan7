// import { PrismaClient } from '@prisma/client';
// import checkAuth from '../../../utils/auth.js';

// const prisma = new PrismaClient();
import adminFoodMutationResolvers from './food.js';
import adminCategoryMutationResolvers from './category.js';
import adminConfigurationMutationResolvers from './configuration.js';
import adminOrderMutationResolvers from './order.js';
import adminUserMutationResolvers from './user.js';
import adminRiderMutationResolvers from './rider.js';
import adminOfferMutationResolvers from './offer.js';
import adminCouponMutationResolvers from './coupon.js';
import adminCuisineMutationResolvers from './cuisine.js';
import adminBannerMutationResolvers from './banner.js';
import adminTippingMutationResolvers from './tipping.js';
import adminTaxationMutationResolvers from './taxation.js';
import adminVendorMutationResolvers from './vendor.js';
import adminRestaurantMutationResolvers from './restaurant.js';
import adminZoneMutationResolvers from './zone.js';


const adminMutationResolvers = {
    ...adminFoodMutationResolvers,
    ...adminCategoryMutationResolvers,
    ...adminConfigurationMutationResolvers,
    ...adminOrderMutationResolvers,
    ...adminUserMutationResolvers,
    ...adminRiderMutationResolvers,
    ...adminOfferMutationResolvers,
    ...adminCouponMutationResolvers,
      ...adminCuisineMutationResolvers,
       ...adminBannerMutationResolvers,
         ...adminTippingMutationResolvers,
        ...adminTaxationMutationResolvers,
    ...adminVendorMutationResolvers,
        ...adminRestaurantMutationResolvers,
    ...adminZoneMutationResolvers
};

export default adminMutationResolvers;
// const adminMutationResolvers = {
//     createFood: async (parent, { foodInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: foodInput.restaurant
//                 },
//                 data: {
//                     categories: {
//                         update: {
//                             where: {
//                                 id: foodInput.categoryId
//                             },
//                             data: {
//                                 foods: {
//                                     create: {
//                                         title: foodInput.title,
//                                         description: foodInput.description,
//                                         image: foodInput.image,
//                                         variations: {
//                                             createMany: {
//                                                 data: foodInput.variations
//                                             }
//                                         },
//                                         isActive: true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             foods: {
//                                 include: {
//                                     variations: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error("Error in createFood:", error);
//             throw new Error("Failed to create food. Check server logs");
//         }
//     },
//     editFood: async (parent, { foodInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: foodInput.restaurant
//                 },
//                 data: {
//                     categories: {
//                         update: {
//                             where: {
//                                 id: foodInput.categoryId
//                             },
//                             data: {
//                                 foods: {
//                                     update: {
//                                         where: {
//                                             id: foodInput._id
//                                         },
//                                         data: {
//                                             title: foodInput.title,
//                                             description: foodInput.description,
//                                             image: foodInput.image,
//                                             variations: {
//                                                 deleteMany: {},
//                                                 createMany: {
//                                                     data: foodInput.variations
//                                                 }
//                                             },
//                                             isActive: foodInput.isActive
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             foods: {
//                                 include: {
//                                     variations: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editFood:", error);
//             throw new Error("Failed to edit food. Check server logs");
//         }
//     },
//     deleteFood: async (parent, { id, restaurant, categoryId }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: restaurant
//                 },
//                 data: {
//                     categories: {
//                         update: {
//                             where: {
//                                 id: categoryId
//                             },
//                             data: {
//                                 foods: {
//                                     delete: {
//                                         id: id
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             foods: {
//                                 include: {
//                                     variations: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error("Error in deleteFood:", error);
//             throw new Error("Failed to delete food. Check server logs");
//         }
//     },
//     createCategory: async (parent, { category }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: category.restaurant
//                 },
//                 data: {
//                     categories: {
//                         create: {
//                             title: category.title,
//                             isActive: true
//                         }
//                     }
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             foods: {
//                                 include: {
//                                     variations: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error("Error in createCategory:", error);
//             throw new Error("Failed to create category. Check server logs");
//         }
//     },
//     editCategory: async (parent, { category }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: category.restaurant
//                 },
//                 data: {
//                     categories: {
//                         update: {
//                             where: {
//                                 id: category._id
//                             },
//                             data: {
//                                 title: category.title
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             foods: {
//                                 include: {
//                                     variations: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editCategory:", error);
//             throw new Error("Failed to edit category. Check server logs");
//         }
//     },
//     deleteCategory: async (parent, { id, restaurant }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: restaurant
//                 },
//                 data: {
//                     categories: {
//                         delete: {
//                             id: id
//                         }
//                     }
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             foods: {
//                                 include: {
//                                     variations: true
//                                 }
//                             }
//                         }
//                     }
//                 }});
//         } catch (error) {
//             console.error("Error in deleteCategory:", error);
//             throw new Error("Failed to delete category. Check server logs");
//         }
//     },
//     saveEmailConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     email: configurationInput.email,
//                     emailName: configurationInput.emailName,
//                     password: configurationInput.password,
//                     enableEmail: configurationInput.enableEmail,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveEmailConfiguration:", error);
//             throw new Error("Failed to save email configuration. Check server logs");
//         }
//     },
//     saveFormEmailConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     formEmail: configurationInput.formEmail,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveFormEmailConfiguration:", error);
//             throw new Error("Failed to save form email configuration. Check server logs");
//         }
//     },
//     saveSendGridConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     sendGridApiKey: configurationInput.sendGridApiKey,
//                     sendGridEnabled: configurationInput.sendGridEnabled,
//                     sendGridEmail: configurationInput.sendGridEmail,
//                     sendGridEmailName: configurationInput.sendGridEmailName,
//                     sendGridPassword: configurationInput.sendGridPassword,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveSendGridApiKey:", error);
//             throw new Error("Failed to save send grid api key. Check server logs");
//         }
//     },
//     saveFirebaseConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     firebaseKey: configurationInput.firebaseKey,
//                     authDomain: configurationInput.authDomain,
//                     projectId: configurationInput.projectId,
//                     storageBucket: configurationInput.storageBucket,
//                     msgSenderId: configurationInput.msgSenderId,
//                     appId: configurationInput.appId,
//                     measurementId: configurationInput.measurementId,
//                     vapidKey: configurationInput.vapidKey
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveFirebaseConfiguration:", error);
//             throw new Error("Failed to save firebase configuration. Check server logs");
//         }
//     },
//     saveSentryConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     dashboardSentryUrl: configurationInput.dashboardSentryUrl,
//                     webSentryUrl: configurationInput.webSentryUrl,
//                     apiSentryUrl: configurationInput.apiSentryUrl,
//                     customerAppSentryUrl: configurationInput.customerAppSentryUrl,
//                     restaurantAppSentryUrl: configurationInput.restaurantAppSentryUrl,
//                     riderAppSentryUrl: configurationInput.riderAppSentryUrl,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveSentryConfiguration:", error);
//             throw new Error("Failed to save sentry configuration. Check server logs");
//         }
//     },
//     saveGoogleApiKeyConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     googleApiKey: configurationInput.googleApiKey,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveGoogleApiKeyConfiguration:", error);
//             throw new Error("Failed to save google api key configuration. Check server logs");
//         }
//     },
//     saveCloudinaryConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     cloudinaryUploadUrl: configurationInput.cloudinaryUploadUrl,
//                     cloudinaryApiKey: configurationInput.cloudinaryApiKey,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveCloudinaryConfiguration:", error);
//             throw new Error("Failed to save cloudinary configuration. Check server logs");
//         }
//     },
//     saveAmplitudeApiKeyConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     webAmplitudeApiKey: configurationInput.webAmplitudeApiKey,
//                     appAmplitudeApiKey: configurationInput.appAmplitudeApiKey,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveAmplitudeApiKeyConfiguration:", error);
//             throw new Error("Failed to save amplitude api key configuration. Check server logs");
//         }
//     },
//     saveGoogleClientIDConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     webClientID: configurationInput.webClientID,
//                     androidClientID: configurationInput.androidClientID,
//                     iOSClientID: configurationInput.iOSClientID,
//                     expoClientID: configurationInput.expoClientID,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveGoogleClientIDConfiguration:", error);
//             throw new Error("Failed to save google client ID configuration. Check server logs");
//         }
//     },
//     saveWebConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     googleMapLibraries: configurationInput.googleMapLibraries,
//                     googleColor: configurationInput.googleColor,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveWebConfiguration:", error);
//             throw new Error("Failed to save web configuration. Check server logs");
//         }
//     },
//     saveAppConfigurations: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     termsAndConditions: configurationInput.termsAndConditions,
//                     privacyPolicy: configurationInput.privacyPolicy,
//                     testOtp: configurationInput.testOtp,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveAppConfigurations:", error);
//             throw new Error("Failed to save app configuration. Check server logs");
//         }
//     },
//     saveDeliveryRateConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     deliveryRate: configurationInput.deliveryRate,
//                     costType: configurationInput.costType,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveDeliveryRateConfiguration:", error);
//             throw new Error("Failed to save delivery rate configuration. Check server logs");
//         }
//     },
//     savePaypalConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     clientId: configurationInput.clientId,
//                     clientSecret: configurationInput.clientSecret,
//                     sandbox: configurationInput.sandbox,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in savePaypalConfiguration:", error);
//             throw new Error("Failed to save paypal configuration. Check server logs");
//         }
//     },
//     saveStripeConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     publishableKey: configurationInput.publishableKey,
//                     secretKey: configurationInput.secretKey,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveStripeConfiguration:", error);
//             throw new Error("Failed to save stripe configuration. Check server logs");
//         }
//     },
//     saveTwilioConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     twilioAccountSid: configurationInput.twilioAccountSid,
//                     twilioAuthToken: configurationInput.twilioAuthToken,
//                     twilioPhoneNumber: configurationInput.twilioPhoneNumber,
//                     twilioEnabled: configurationInput.twilioEnabled,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveTwilioConfiguration:", error);
//             throw new Error("Failed to save twilio configuration. Check server logs");
//         }
//     },
//     saveVerificationsToggle: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     skipEmailVerification: configurationInput.skipEmailVerification,
//                     skipMobileVerification: configurationInput.skipMobileVerification,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveVerificationsToggle:", error);
//             throw new Error("Failed to save verification toggles. Check server logs");
//         }
//     },
//     saveCurrencyConfiguration: async (parent, { configurationInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.configuration.update({
//                 where: {
//                     id: 1,
//                 },
//                 data: {
//                     currency: configurationInput.currency,
//                     currencySymbol: configurationInput.currencySymbol,
//                 },
//             });
//         } catch (error) {
//             console.error("Error in saveCurrencyConfiguration:", error);
//             throw new Error("Failed to save currency configuration. Check server logs");
//         }
//     },
//     ownerLogin: async (parent, { email, password }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: email
//                 },
//                 include: {
//                     restaurants: {
//                         include: {
//                             location: true
//                         }
//                     }
//                 }
//             })
//             if (!user || user.password !== password || user.userType !== 'owner') {
//                 throw new Error('invalid credentials')
//             }
//             return {
//                 userId: user.id,
//                 token: "test token",
//                 email: user.email,
//                 userType: user.userType,
//                 restaurants: user.restaurants
//             }
//         } catch (error) {
//             console.error("Error in ownerLogin:", error);
//             throw new Error("Failed to owner login. Check server logs");
//         }
//     },
//     createSection: async (parent, { section }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.section.create({
//                 data: {
//                     name: section.name,
//                     enabled: true,
//                     restaurants: {
//                         connect: section.restaurants.map(restaurantId => ({ id: restaurantId }))
//                     }
//                 },
//                 include: {
//                     restaurants: true
//                 }
//             })
//         } catch (error) {
//             console.error("Error in createSection:", error);
//             throw new Error("Failed to create section. Check server logs");
//         }
//     },
//     editSection: async (parent, { section }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.section.update({
//                 where: {
//                     id: section._id
//                 },
//                 data: {
//                     name: section.name,
//                     enabled: section.enabled,
//                     restaurants: {
//                         set: section.restaurants.map(restaurantId => ({ id: restaurantId }))
//                     }
//                 },
//                 include: {
//                     restaurants: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editSection:", error);
//             throw new Error("Failed to edit section. Check server logs");
//         }
//     },
//     deleteSection: async (parent, { id }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.section.delete({
//                 where: {
//                     id: id
//                 },
//             })
//         } catch (error) {
//             console.error("Error in deleteSection:", error);
//             throw new Error("Failed to delete section. Check server logs");
//         }
//     },
//     deleteVendor: async (parent, { id }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.vendor.delete({
//                 where: {
//                     id: id
//                 },
//             })
//         } catch (error) {
//             console.error("Error in deleteVendor:", error);
//             throw new Error("Failed to delete vendor. Check server logs");
//         }
//     },
//     updateOrderStatus: async (parent, { id, status, reason }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.order.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     orderStatus: status,
//                     reason: reason
//                 }
//             })
//         } catch (error) {
//             console.error("Error in updateOrderStatus:", error);
//             throw new Error("Failed to update order status. Check server logs");
//         }
//     },
//     updateStatus: async (parent, { id, orderStatus }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.order.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     orderStatus: orderStatus
//                 }
//             })
//         } catch (error) {
//             console.error("Error in updateStatus:", error);
//             throw new Error("Failed to update order status. Check server logs");
//         }
//     },
//     uploadToken: async (parent, { id, pushToken }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     notificationToken: pushToken
//                 }
//             });
//         } catch (error) {
//             console.error("Error in uploadToken:", error);
//             throw new Error("Failed to upload token. Check server logs");
//         }
//     },
//     resetPassword: async (parent, { password, token }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             const user = await prisma.user.findUnique({
//                 where: {
//                     id: token
//                 }
//             });

//             if (!user) {
//                 throw new Error("User not found");
//             }
//             await prisma.user.update({
//                 where: {
//                     id: token
//                 },
//                 data: {
//                     password: password
//                 }
//             })
//             return {
//                 result: true
//             }
//         } catch (error) {
//             console.error("Error in resetPassword:", error);
//             throw new Error("Failed to reset password. Check server logs");
//         }
//     },
//     createRider: async (parent, { riderInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.rider.create({
//                 data: {
//                     name: riderInput.name,
//                     username: riderInput.username,
//                     password: riderInput.password,
//                     phone: riderInput.phone,
//                     available: true,
//                     zone: {
//                         connect: {
//                             id: riderInput.zone
//                         }
//                     }
//                 },
//                 include: {
//                     zone: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in createRider:", error);
//             throw new Error("Failed to create rider. Check server logs");
//         }
//     },
//     editRider: async (parent, { riderInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.rider.update({
//                 where: {
//                     id: riderInput._id
//                 },
//                 data: {
//                     name: riderInput.name,
//                     username: riderInput.username,
//                     phone: riderInput.phone,
//                     zone: {
//                         connect: {
//                             id: riderInput.zone
//                         }
//                     }
//                 },
//                 include: {
//                     zone: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editRider:", error);
//             throw new Error("Failed to edit rider. Check server logs");
//         }
//     },
//     deleteRider: async (parent, { id }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.rider.delete({
//                 where: {
//                     id: id
//                 },
//             });
//         } catch (error) {
//             console.error("Error in deleteRider:", error);
//             throw new Error("Failed to delete rider. Check server logs");
//         }
//     },
//     toggleAvailablity: async (parent, { id }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.rider.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     available: false
//                 }
//             });
//         } catch (error) {
//             console.error("Error in toggleAvailablity:", error);
//             throw new Error("Failed to toggle rider availability. Check server logs");
//         }
//     },
//     assignRider: async (parent, { id, riderId }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.order.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     riderId: riderId,
//                     orderStatus: "onTheWay"
//                 },
//                 include: {
//                     rider: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in assignRider:", error);
//             throw new Error("Failed to assign rider. Check server logs");
//         }
//     },
//     updatePaymentStatus: async (parent, { id, status }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.order.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     paymentStatus: status,
//                     paidAmount: 10
//                 }
//             })
//         } catch (error) {
//             console.error("Error in updatePaymentStatus:", error);
//             throw new Error("Failed to update payment status. Check server logs");
//         }
//     },
//     createOffer: async (parent, { offer }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.offer.create({
//                 data: {
//                     name: offer.name,
//                     tag: offer.tag,
//                     restaurants: {
//                         connect: offer.restaurants.map(restaurantId => ({ id: restaurantId }))
//                     }
//                 },
//                 include: {
//                     restaurants: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in createOffer:", error);
//             throw new Error("Failed to create offer. Check server logs");
//         }
//     },
//     editOffer: async (parent, { offer }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.offer.update({
//                 where: {
//                     id: offer._id
//                 },
//                 data: {
//                     name: offer.name,
//                     tag: offer.tag,
//                     restaurants: {
//                         set: offer.restaurants.map(restaurantId => ({ id: restaurantId }))
//                     }
//                 },
//                 include: {
//                     restaurants: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editOffer:", error);
//             throw new Error("Failed to edit offer. Check server logs");
//         }
//     },
//     deleteOffer: async (parent, { id }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.offer.delete({
//                 where: {
//                     id: id
//                 },
//             });
//         } catch (error) {
//             console.error("Error in deleteOffer:", error);
//             throw new Error("Failed to delete offer. Check server logs");
//         }
//     },
//     createOptions: async (parent, { optionInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: optionInput.restaurant
//                 },
//                 data: {
//                     options: {
//                         create: {
//                             title: optionInput.title,
//                             description: optionInput.description,
//                             price: optionInput.price,
//                         }
//                     }
//                 },
//                 include: {
//                     options: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in createOptions:", error);
//             throw new Error("Failed to create options. Check server logs");
//         }
//     },
//     createAddons: async (parent, { addonInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: addonInput.restaurant
//                 },
//                 data: {
//                     addons: {
//                         create: {
//                             title: addonInput.title,
//                             description: addonInput.description,
//                             quantityMaximum: addonInput.quantityMaximum,
//                             quantityMinimum: addonInput.quantityMinimum,
//                             options: {
//                                 connect: addonInput.options.map(optionId => ({ id: optionId }))
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     addons: {
//                         include: {
//                             options: true
//                         }
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error("Error in createAddons:", error);
//             throw new Error("Failed to create addons. Check server logs");
//         }
//     },
//     editAddon: async (parent, { addonInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: addonInput.restaurant
//                 },
//                 data: {
//                     addons: {
//                         update: {
//                             where: {
//                                 id: addonInput._id
//                             },
//                             data: {
//                                 title: addonInput.title,
//                                 description: addonInput.description,
//                                 quantityMaximum: addonInput.quantityMaximum,
//                                 quantityMinimum: addonInput.quantityMinimum,
//                                 options: {
//                                     set: addonInput.options.map(optionId => ({ id: optionId }))
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     addons: {
//                         include: {
//                             options: true
//                         }
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error("Error in editAddon:", error);
//             throw new Error("Failed to edit addon. Check server logs");
//         }
//     },
//     deleteAddon: async (parent, { id, restaurant }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: restaurant
//                 },
//                 data: {
//                     addons: {
//                         delete: {
//                             id: id
//                         }
//                     }
//                 },
//                 include: {
//                     addons: {
//                         include: {
//                             options: true
//                         }
//                     }
//                 }
//             });
//         } catch (error) {
//             console.error("Error in deleteAddon:", error);
//             throw new Error("Failed to delete addon. Check server logs");
//         }
//     },
//     deleteOption: async (parent, { id, restaurant }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: restaurant
//                 },
//                 data: {
//                     options: {
//                         delete: {
//                             id: id
//                         }
//                     }
//                 },
//                 include: {
//                     options: true
//                 }
//             })
//         } catch (error) {
//             console.error("Error in deleteOption:", error);
//             throw new Error("Failed to delete option. Check server logs");
//         }
//     },
//     editOption: async (parent, { optionInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.restaurant.update({
//                 where: {
//                     id: optionInput.restaurant
//                 },
//                 data: {
//                     options: {
//                         update: {
//                             where: {
//                                 id: optionInput._id
//                             },
//                             data: {
//                                 title: optionInput.title,
//                                 description: optionInput.description,
//                                 price: optionInput.price
//                             }
//                         }
//                     }
//                 },
//                 include: {
//                     options: true
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editOption:", error);
//             throw new Error("Failed to edit option. Check server logs");
//         }
//     },
//     createCoupon: async (parent, { couponInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.coupon.create({
//                 data: {
//                     title: couponInput.title,
//                     discount: couponInput.discount,
//                     enabled: couponInput.enabled
//                 },
//             });
//         } catch (error) {
//             console.error("Error in createCoupon:", error);
//             throw new Error("Failed to create coupon. Check server logs");
//         }
//     },
//     editCoupon: async (parent, { couponInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.coupon.update({
//                 where: {
//                     id: couponInput._id
//                 },
//                 data: {
//                     title: couponInput.title,
//                     discount: couponInput.discount,
//                     enabled: couponInput.enabled
//                 }
//             });
//         } catch (error) {
//             console.error("Error in editCoupon:", error);
//             throw new Error("Failed to edit coupon. Check server logs");
//         }
//     },
//     deleteCoupon: async (parent, { id }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.coupon.delete({
//                 where: {
//                     id: id
//                 }
//             });
//         } catch (error) {
//             console.error("Error in deleteCoupon:", error);
//             throw new Error("Failed to delete coupon. Check server logs");
//         }
//     },
//     createCuisine: async (parent, { cuisineInput }, context, info) => {
//         try {
//             checkAuth(context, "admin");
//             return await prisma.cuisine.create({
//                 data: {
//                     name: cuisineInput.name,
//                     description: cuisineInput.description,
//                     image: cuisineInput.image,
//                     shopType: cuisineInput.shopType
//                 },
//             });
//         } catch (error) {
//             console.error("Error in createCuisine:", error);
//             throw new Error("Failed to create cuisine. Check server logs");
//         }
//     }
//     //   editCuisine: async (parent, { cuisineInput }, context, info) => {
//     //        try {
//     //           checkAuth(context, "admin");
//     //             return await prisma.cuisine.update({
//     //               where:{
//     //                  id:cuisineInput._id
//     //                 },
//     //                 data:{
//     //                   name:cuisineInput.name,
//     //                     description:cuisine


//     //                 }}}}}}
// }