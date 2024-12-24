import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminBannerMutationResolvers = {
    createBanner: async (parent, { bannerInput }, context, info) => {
        try {
           checkAuth(context, "admin");
             return await prisma.banner.create({
                data:{
                  title:bannerInput.title,
                  description:bannerInput.description,
                    action:bannerInput.action,
                    file:bannerInput.file,
                    screen:bannerInput.screen,
                  parameters:bannerInput.parameters
                },
           });
        } catch (error) {
           console.error("Error in createBanner:", error);
            throw new Error("Failed to create banner. Check server logs");
        }
    },
  editBanner: async (parent, { bannerInput }, context, info) => {
    try {
        checkAuth(context, "admin");
          return await prisma.banner.update({
            where:{
               id:bannerInput._id
            },
            data:{
                 title:bannerInput.title,
              description:bannerInput.description,
             action:bannerInput.action,
                file:bannerInput.file,
                screen:bannerInput.screen,
             parameters:bannerInput.parameters
            }
        });
       } catch (error) {
         console.error("Error in editBanner:", error);
           throw new Error("Failed to edit banner. Check server logs");
       }
   },
   deleteBanner: async (parent, { id }, context, info) => {
        try {
           checkAuth(context, "admin");
           return await prisma.banner.delete({
             where:{
                id:id
             }
           });
       } catch (error) {
         console.error("Error in deleteBanner:", error);
           throw new Error("Failed to delete banner. Check server logs");
      }
    },
};

export default adminBannerMutationResolvers;