import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminZoneMutationResolvers = {
    createZone: async (parent, { zone }, context, info) => {
        try {
           checkAuth(context, "admin");
           return await prisma.zone.create({
                data:{
                    title:zone.title,
                   description:zone.description,
                   isActive:true,
                  location:{
                      create:{
                        coordinates:zone.location.coordinates
                     }
                  }
              },
             include:{
                  location:true
               }
           });
         } catch (error) {
             console.error("Error in createZone:", error);
           throw new Error("Failed to create zone. Check server logs");
         }
  },
   editZone: async (parent, { zone }, context, info) => {
       try {
          checkAuth(context, "admin");
            return await prisma.zone.update({
              where:{
               id:zone._id
              },
               data:{
                 title:zone.title,
                 description:zone.description,
                   isActive:zone.isActive,
                    location:{
                       update:{
                          coordinates:zone.location.coordinates
                       }
                   }
                },
              include:{
                  location:true
              }
            });
       } catch (error) {
          console.error("Error in editZone:", error);
           throw new Error("Failed to edit zone. Check server logs");
        }
    },
   deleteZone: async (parent, { id }, context, info) => {
        try {
           checkAuth(context, "admin");
             return await prisma.zone.delete({
                where:{
                   id:id
               },
             });
         } catch (error) {
           console.error("Error in deleteZone:", error);
          throw new Error("Failed to delete zone. Check server logs");
        }
  },
};
export default adminZoneMutationResolvers;