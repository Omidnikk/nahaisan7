import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminConfigurationMutationResolvers = {
    saveEmailConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    email: configurationInput.email,
                    emailName: configurationInput.emailName,
                    password: configurationInput.password,
                    enableEmail: configurationInput.enableEmail,
                },
            });
        } catch (error) {
            console.error("Error in saveEmailConfiguration:", error);
            throw new Error("Failed to save email configuration. Check server logs");
        }
    },
    saveFormEmailConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    formEmail: configurationInput.formEmail,
                },
            });
        } catch (error) {
            console.error("Error in saveFormEmailConfiguration:", error);
            throw new Error("Failed to save form email configuration. Check server logs");
        }
    },
    saveSendGridConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    sendGridApiKey: configurationInput.sendGridApiKey,
                    sendGridEnabled: configurationInput.sendGridEnabled,
                    sendGridEmail: configurationInput.sendGridEmail,
                    sendGridEmailName: configurationInput.sendGridEmailName,
                    sendGridPassword: configurationInput.sendGridPassword,
                },
            });
        } catch (error) {
            console.error("Error in saveSendGridApiKey:", error);
            throw new Error("Failed to save send grid api key. Check server logs");
        }
    },
    saveFirebaseConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    firebaseKey: configurationInput.firebaseKey,
                    authDomain: configurationInput.authDomain,
                    projectId: configurationInput.projectId,
                    storageBucket: configurationInput.storageBucket,
                    msgSenderId: configurationInput.msgSenderId,
                    appId: configurationInput.appId,
                    measurementId: configurationInput.measurementId,
                    vapidKey: configurationInput.vapidKey
                },
            });
        } catch (error) {
            console.error("Error in saveFirebaseConfiguration:", error);
            throw new Error("Failed to save firebase configuration. Check server logs");
        }
    },
    saveSentryConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    dashboardSentryUrl: configurationInput.dashboardSentryUrl,
                    webSentryUrl: configurationInput.webSentryUrl,
                    apiSentryUrl: configurationInput.apiSentryUrl,
                    customerAppSentryUrl: configurationInput.customerAppSentryUrl,
                    restaurantAppSentryUrl: configurationInput.restaurantAppSentryUrl,
                    riderAppSentryUrl: configurationInput.riderAppSentryUrl,
                },
            });
        } catch (error) {
            console.error("Error in saveSentryConfiguration:", error);
            throw new Error("Failed to save sentry configuration. Check server logs");
        }
    },
    saveGoogleApiKeyConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    googleApiKey: configurationInput.googleApiKey,
                },
            });
        } catch (error) {
            console.error("Error in saveGoogleApiKeyConfiguration:", error);
            throw new Error("Failed to save google api key configuration. Check server logs");
        }
    },
    saveCloudinaryConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    cloudinaryUploadUrl: configurationInput.cloudinaryUploadUrl,
                    cloudinaryApiKey: configurationInput.cloudinaryApiKey,
                },
            });
        } catch (error) {
            console.error("Error in saveCloudinaryConfiguration:", error);
            throw new Error("Failed to save cloudinary configuration. Check server logs");
        }
    },
    saveAmplitudeApiKeyConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    webAmplitudeApiKey: configurationInput.webAmplitudeApiKey,
                    appAmplitudeApiKey: configurationInput.appAmplitudeApiKey,
                },
            });
        } catch (error) {
            console.error("Error in saveAmplitudeApiKeyConfiguration:", error);
            throw new Error("Failed to save amplitude api key configuration. Check server logs");
        }
    },
    saveGoogleClientIDConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    webClientID: configurationInput.webClientID,
                    androidClientID: configurationInput.androidClientID,
                    iOSClientID: configurationInput.iOSClientID,
                    expoClientID: configurationInput.expoClientID,
                },
            });
        } catch (error) {
            console.error("Error in saveGoogleClientIDConfiguration:", error);
            throw new Error("Failed to save google client ID configuration. Check server logs");
        }
    },
    saveWebConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    googleMapLibraries: configurationInput.googleMapLibraries,
                    googleColor: configurationInput.googleColor,
                },
            });
        } catch (error) {
            console.error("Error in saveWebConfiguration:", error);
            throw new Error("Failed to save web configuration. Check server logs");
        }
    },
    saveAppConfigurations: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    termsAndConditions: configurationInput.termsAndConditions,
                    privacyPolicy: configurationInput.privacyPolicy,
                    testOtp: configurationInput.testOtp,
                },
            });
        } catch (error) {
            console.error("Error in saveAppConfigurations:", error);
            throw new Error("Failed to save app configuration. Check server logs");
        }
    },
    saveDeliveryRateConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    deliveryRate: configurationInput.deliveryRate,
                    costType: configurationInput.costType,
                },
            });
        } catch (error) {
            console.error("Error in saveDeliveryRateConfiguration:", error);
            throw new Error("Failed to save delivery rate configuration. Check server logs");
        }
    },
    savePaypalConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    clientId: configurationInput.clientId,
                    clientSecret: configurationInput.clientSecret,
                    sandbox: configurationInput.sandbox,
                },
            });
        } catch (error) {
            console.error("Error in savePaypalConfiguration:", error);
            throw new Error("Failed to save paypal configuration. Check server logs");
        }
    },
    saveStripeConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    publishableKey: configurationInput.publishableKey,
                    secretKey: configurationInput.secretKey,
                },
            });
        } catch (error) {
            console.error("Error in saveStripeConfiguration:", error);
            throw new Error("Failed to save stripe configuration. Check server logs");
        }
    },
    saveTwilioConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    twilioAccountSid: configurationInput.twilioAccountSid,
                    twilioAuthToken: configurationInput.twilioAuthToken,
                    twilioPhoneNumber: configurationInput.twilioPhoneNumber,
                    twilioEnabled: configurationInput.twilioEnabled,
                },
            });
        } catch (error) {
            console.error("Error in saveTwilioConfiguration:", error);
            throw new Error("Failed to save twilio configuration. Check server logs");
        }
    },
    saveVerificationsToggle: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    skipEmailVerification: configurationInput.skipEmailVerification,
                    skipMobileVerification: configurationInput.skipMobileVerification,
                },
            });
        } catch (error) {
            console.error("Error in saveVerificationsToggle:", error);
            throw new Error("Failed to save verification toggles. Check server logs");
        }
    },
    saveCurrencyConfiguration: async (parent, { configurationInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.configuration.update({
                where: {
                    id: 1,
                },
                data: {
                    currency: configurationInput.currency,
                    currencySymbol: configurationInput.currencySymbol,
                },
            });
        } catch (error) {
            console.error("Error in saveCurrencyConfiguration:", error);
            throw new Error("Failed to save currency configuration. Check server logs");
        }
    },
};

export default adminConfigurationMutationResolvers;