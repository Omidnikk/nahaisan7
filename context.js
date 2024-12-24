import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Replace with a strong secret
const prisma = new PrismaClient();
const pubsub = new PubSub();

const getUserFromToken = async (token) => {
   try {
     // Your JWT verification logic here (e.g., using jsonwebtoken library)
     const decoded = jwt.verify(token, JWT_SECRET);  // Replace JWT_SECRET

     const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
     return user;

   } catch (error) {
     console.error("Error verifying token:", error);
     return null;
   }
};
const createContext = async ({ req }) => {
    const authHeader = req?.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    let user = null;
     if (token) {
      //   try {
      //      const decoded = jwt.verify(token, JWT_SECRET);
      //      user = await prisma.user.findUnique({where: {id: decoded.userId}})
      //        if(!user) {
      //          console.log("invalid token");
      //          return { prisma, pubsub }
      //          }
      //        return { prisma, pubsub, user: {...decoded, ...user} };
      //     } catch (error) {
      //      console.log('invalid token');
      //       return { prisma, pubsub };
      //  }
      user = await getUserFromToken(token);
    }
    return { prisma, pubsub, user, userId: user ? user.id : null, userRole: user?.role || 'GUEST' }
};


export default createContext;