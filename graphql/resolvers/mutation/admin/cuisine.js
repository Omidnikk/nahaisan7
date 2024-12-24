import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminCuisineMutationResolvers = {
     createCuisine: async (parent, { cuisineInput }, context, info) => {
      try {
         checkAuth(context, "admin");
            return await prisma.cuisine.create({
                data:{
                   name:cuisineInput.name,
                 description:cuisineInput.description,
                image:cuisineInput.image,
                    shopType:cuisineInput.shopType
                },
          });
         } catch (error) {
           console.error("Error in createCuisine:", error);
            throw new Error("Failed to create cuisine. Check server logs");
         }
   },
  editCuisine: async (parent, { cuisineInput }, context, info) => {
       try {
          checkAuth(context, "admin");
            return await prisma.cuisine.update({
              where:{
                 id:cuisineInput._id
                },
                data:{
                  name:cuisineInput.name,
                    description:cuisineInput.description,
                   image:cuisineInput.image,
                      shopType:cuisineInput.shopType
               }
             });
        } catch (error) {
           console.error("Error in editCuisine:", error);
          throw new Error("Failed to edit cuisine. Check server logs");
        }
  },
    deleteCuisine: async (parent, { id }, context, info) => {
     try {
         checkAuth(context, "admin");
            return await prisma.cuisine.delete({
                where:{
                   id:id
               }
           })
      } catch (error) {
        console.error("Error in deleteCuisine:", error);
          throw new Error("Failed to delete cuisine. Check server logs");
        }
    },
};

export default adminCuisineMutationResolvers;