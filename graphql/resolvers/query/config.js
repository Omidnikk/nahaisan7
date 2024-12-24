
export const configQueries = {
    configuration: async (parent, args, { prisma }) => {  // configuration:Configuration
      try {
        const configuration = await prisma.configuration.findFirst();
        return configuration;
      } catch (error) {
        // ... error handling
      }
    },
  
  };
  
  