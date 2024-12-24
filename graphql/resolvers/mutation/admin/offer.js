import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminOfferMutationResolvers = {
   createOffer: async (parent, { offer }, context, info) => {
      try {
        checkAuth(context, "admin");
          return await prisma.offer.create({
              data:{
                  name: offer.name,
                  tag: offer.tag,
                  restaurants:{
                       connect: offer.restaurants.map(restaurantId => ({ id: restaurantId }))
                     }
              },
             include:{
                  restaurants:true
              }
            });
       } catch (error) {
            console.error("Error in createOffer:", error);
          throw new Error("Failed to create offer. Check server logs");
      }
    },
  editOffer: async (parent, { offer }, context, info) => {
      try {
         checkAuth(context, "admin");
            return await prisma.offer.update({
              where:{
                  id:offer._id
              },
                data:{
                   name: offer.name,
                 tag: offer.tag,
                  restaurants:{
                     set: offer.restaurants.map(restaurantId => ({ id: restaurantId }))
                    }
              },
              include:{
                 restaurants:true
               }
            });
         } catch (error) {
             console.error("Error in editOffer:", error);
            throw new Error("Failed to edit offer. Check server logs");
        }
   },
  deleteOffer: async (parent, { id }, context, info) => {
        try {
           checkAuth(context, "admin");
            return await prisma.offer.delete({
              where: {
                id: id
              },
          });
       } catch (error) {
           console.error("Error in deleteOffer:", error);
           throw new Error("Failed to delete offer. Check server logs");
       }
   },
};

export default adminOfferMutationResolvers;