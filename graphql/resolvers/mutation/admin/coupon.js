import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminCouponMutationResolvers = {
    createCoupon: async (parent, { couponInput }, context, info) => {
        try {
           checkAuth(context, "admin");
            return await prisma.coupon.create({
              data:{
                title:couponInput.title,
                 discount:couponInput.discount,
                enabled: couponInput.enabled
              },
           });
         } catch (error) {
            console.error("Error in createCoupon:", error);
            throw new Error("Failed to create coupon. Check server logs");
       }
    },
   editCoupon: async (parent, { couponInput }, context, info) => {
        try {
           checkAuth(context, "admin");
            return await prisma.coupon.update({
              where:{
                  id:couponInput._id
                },
                data:{
                    title:couponInput.title,
                 discount:couponInput.discount,
                  enabled:couponInput.enabled
               }
             });
        } catch (error) {
           console.error("Error in editCoupon:", error);
            throw new Error("Failed to edit coupon. Check server logs");
        }
   },
   deleteCoupon: async (parent, { id }, context, info) => {
       try {
           checkAuth(context, "admin");
             return await prisma.coupon.delete({
                where:{
                   id:id
                }
            });
          } catch (error) {
              console.error("Error in deleteCoupon:", error);
            throw new Error("Failed to delete coupon. Check server logs");
         }
   },
};

export default adminCouponMutationResolvers;