export const riderQueries = {
    riders: async (parent, { input }, { prisma }) => {  // riders(input: RiderSearchInput!): RidersResult!
      // ... implementation (similar to users query)
    },
    availableRiders: async (parent, args, { prisma }) => {  // availableRiders:[Rider]
      try {
        const riders = await prisma.rider.findMany({
          where: { available: true },
          include: { zone: true },
        });
        return riders;
      } catch (error) {
        // ... error handling
      }
    },
      ridersByZone: async (parent, { id }, { prisma }) => { // ridersByZone(id:String):[Rider]
      try {
          const riders = await prisma.rider.findMany({
              where: { zoneId: parseInt(id) },
              include: { zone: true },
          });
          return riders;
  
      } catch (error) {
          console.error("Error fetching riders by zone:", error);
          throw new Error("Failed to fetch riders by zone");
      }
  },
  
  
  
    // ... (other rider queries)
  };
  