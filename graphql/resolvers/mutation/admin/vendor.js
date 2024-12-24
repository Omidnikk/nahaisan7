import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminVendorMutationResolvers = {
  createVendor: async (parent, { vendorInput }, context, info) => {
    try {
      checkAuth(context, "admin");
       return await prisma.vendor.create({
        data:{
          email:vendorInput.email,
           userType:vendorInput.userType,
           restaurants:{
             connect: vendorInput.restaurants.map(restaurantId => ({ id: restaurantId }))
          }
        },
        include:{
            restaurants:true
       }
      });
    } catch (error) {
      console.error("Error in createVendor:", error);
        throw new Error("Failed to create vendor. Check server logs");
    }
  },
  editVendor: async (parent, { vendorInput }, context, info) => {
      try {
         checkAuth(context, "admin");
            return await prisma.vendor.update({
               where:{
                   id:vendorInput._id
             },
              data:{
                email:vendorInput.email,
                userType:vendorInput.userType,
                restaurants:{
                     set: vendorInput.restaurants.map(restaurantId => ({ id: restaurantId }))
                   }
            },
             include:{
                  restaurants:true
              }
            });
        } catch (error) {
           console.error("Error in editVendor:", error);
          throw new Error("Failed to edit vendor. Check server logs");
       }
  },
};
export default adminVendorMutationResolvers;