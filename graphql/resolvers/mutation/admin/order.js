import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminOrderMutationResolvers = {
    updateOrderStatus: async (parent, { id, status, reason }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.order.update({
                where: {
                    id: id
                },
                data: {
                    orderStatus: status,
                    reason: reason
                }
            })
        } catch (error) {
            console.error("Error in updateOrderStatus:", error);
            throw new Error("Failed to update order status. Check server logs");
        }
    },
    updateStatus: async (parent, { id, orderStatus }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.order.update({
                where: {
                    id: id
                },
                data: {
                    orderStatus: orderStatus
                }
            })
        } catch (error) {
            console.error("Error in updateStatus:", error);
            throw new Error("Failed to update order status. Check server logs");
        }
    },
};
export default adminOrderMutationResolvers;