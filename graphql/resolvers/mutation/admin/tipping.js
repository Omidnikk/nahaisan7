import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminTippingMutationResolvers = {
   createTipping: async (parent, { tippingInput }, context, info) => {
        try {
            checkAuth(context, "admin");
             return await prisma.tip.create({
                data:{
                  tipVariations: tippingInput.tipVariations,
                    enabled:tippingInput.enabled
                }
           });
        } catch (error) {
           console.error("Error in createTipping:", error);
             throw new Error("Failed to create tipping configuration. Check server logs");
        }
    },
  editTipping: async (parent, { tippingInput }, context, info) => {
        try {
           checkAuth(context, "admin");
             return await prisma.tip.update({
                where:{
                    id:tippingInput._id
                },
                data:{
                   tipVariations: tippingInput.tipVariations,
                  enabled:tippingInput.enabled
                }
            });
        } catch (error) {
          console.error("Error in editTipping:", error);
            throw new Error("Failed to edit tipping configuration. Check server logs");
       }
  },
};
export default adminTippingMutationResolvers;