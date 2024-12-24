import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminUserMutationResolvers = {
    uploadToken: async (parent, { id, pushToken }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: id
                },
                data: {
                    notificationToken: pushToken
                }
            });
        } catch (error) {
            console.error("Error in uploadToken:", error);
            throw new Error("Failed to upload token. Check server logs");
        }
    },
    resetPassword: async (parent, { password, token }, context, info) => {
        try {
            checkAuth(context, "admin");
            const user = await prisma.user.findUnique({
                where: {
                    id: token
                }
            });

            if (!user) {
                throw new Error("User not found");
            }
            await prisma.user.update({
                where: {
                    id: token
                },
                data: {
                    password: password
                }
            })
            return {
                result: true
            }
        } catch (error) {
            console.error("Error in resetPassword:", error);
            throw new Error("Failed to reset password. Check server logs");
        }
    },
    vendorResetPassword: async (parent, { oldPassword, newPassword }, context, info) => {
        try {
            checkAuth(context, "admin");
            const user = await prisma.user.findFirst({
                where: {
                    id: context.user.id
                }
            });
            if (!user || user.password !== oldPassword) throw new Error("Invalid credentials");
            await prisma.user.update({
                where: {
                    id: context.user.id
                },
                data: {
                    password: newPassword
                }
            })
            return { success: true }
        } catch (error) {
            console.error("Error in vendorResetPassword:", error);
            throw new Error("Failed to reset password for vendor. Check server logs");
        }
    },
    deleteVendor: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.vendor.delete({
                where: {
                    id: id
                },
            })
        } catch (error) {
            console.error("Error in deleteVendor:", error);
            throw new Error("Failed to delete vendor. Check server logs");
        }
    },
};
export default adminUserMutationResolvers;