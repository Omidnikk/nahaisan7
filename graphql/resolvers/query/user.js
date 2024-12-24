export const userQueries = {
    users: async (parent, { input }, { prisma }) => { // getUsers(input:UserSearchInput):UsersResult
      const { search, pagination } = input;
      const page = pagination?.page || 1;
      const rowsPerPage = pagination?.rowsPerPage || 10;
  
      try {
        // ... (Implementation -  similar to previous example, using whereClause, pagination, and totalCount)
      } catch (error) {
        // ... (Error handling)
      }
    },
  };