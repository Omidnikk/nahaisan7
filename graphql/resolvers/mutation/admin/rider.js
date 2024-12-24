import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminRiderMutationResolvers = {
    createRider: async (parent, { riderInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.rider.create({
                data: {
                    name: riderInput.name,
                    username: riderInput.username,
                    password: riderInput.password,
                    phone: riderInput.phone,
                    available: true,
                    zone: {
                        connect: {
                            id: riderInput.zone
                        }
                    }
                },
                include: {
                    zone: true
                }
            });
        } catch (error) {
            console.error("Error in createRider:", error);
            throw new Error("Failed to create rider. Check server logs");
        }
    },
    editRider: async (parent, { riderInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.rider.update({
                where: {
                    id: riderInput._id
                },
                data: {
                    name: riderInput.name,
                    username: riderInput.username,
                    phone: riderInput.phone,
                    zone: {
                        connect: {
                            id: riderInput.zone
                        }
                    }
                },
                include: {
                    zone: true
                }
            });
        } catch (error) {
            console.error("Error in editRider:", error);
            throw new Error("Failed to edit rider. Check server logs");
        }
    },
    deleteRider: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.rider.delete({
                where: {
                    id: id
                },
            });
        } catch (error) {
            console.error("Error in deleteRider:", error);
            throw new Error("Failed to delete rider. Check server logs");
        }
    },
    toggleAvailablity: async (parent, { id }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.rider.update({
                where: {
                    id: id
                },
                data: {
                    available: false
                }
            });
        } catch (error) {
            console.error("Error in toggleAvailablity:", error);
            throw new Error("Failed to toggle rider availability. Check server logs");
        }
    },
    assignRider: async (parent, { id, riderId }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.order.update({
                where: {
                    id: id
                },
                data: {
                    riderId: riderId,
                    orderStatus: "onTheWay"
                },
                include: {
                    rider: true
                }
            });
        } catch (error) {
            console.error("Error in assignRider:", error);
            throw new Error("Failed to assign rider. Check server logs");
        }
    },
};
export default adminRiderMutationResolvers;