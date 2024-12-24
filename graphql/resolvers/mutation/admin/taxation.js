import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminTaxationMutationResolvers = {
    createTaxation: async (parent, { taxationInput }, context, info) => {
        try {
           checkAuth(context, "admin");
            return await prisma.tax.create({
               data:{
                    taxationCharges: taxationInput.taxationCharges,
                    enabled:taxationInput.enabled
                }
           });
       } catch (error) {
           console.error("Error in createTaxation:", error);
            throw new Error("Failed to create taxation configuration. Check server logs");
        }
    },
   editTaxation: async (parent, { taxationInput }, context, info) => {
        try {
           checkAuth(context, "admin");
            return await prisma.tax.update({
               where:{
                  id:taxationInput._id
                },
                data:{
                    taxationCharges: taxationInput.taxationCharges,
                     enabled:taxationInput.enabled
                }
            });
        } catch (error) {
           console.error("Error in editTaxation:", error);
           throw new Error("Failed to edit taxation configuration. Check server logs");
         }
   },
};
export default adminTaxationMutationResolvers;