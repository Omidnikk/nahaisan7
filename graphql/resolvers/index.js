// import queryResolvers from "./query.js";
// import mutationResolvers from "./mutation.js";
// import subscriptionResolvers from "./subscription.js"
// import { PrismaClient } from '@prisma/client';
// import { GraphQLUpload } from 'graphql-upload-ts';

// const prisma = new PrismaClient();

// const resolvers = {
//     Query: queryResolvers,
//     Mutation: mutationResolvers,
//     Subscription: subscriptionResolvers,
//     Upload: GraphQLUpload,
//     // User: {
//     //     products: async (parent, _, { prisma }) => {
//     //         return await prisma.product.findMany({ where: { vendorId: parent.id } });
//     //     },
//     //     orders: async (parent, _, { prisma }) => {
//     //         return await prisma.order.findMany({ where: { customerId: parent.id } })
//     //     }
//     // },
//     // Product: {
//     //     category: async (parent, _, { prisma }) => {
//     //         return await prisma.category.findUnique({ where: { id: parent.categoryId } });
//     //     },
//     //     vendor: async (parent, _, { prisma }) => {
//     //         return await prisma.user.findUnique({ where: { id: parent.vendorId } });
//     //     },
//     // },
//     // Category: {
//     //     products: async (parent, _, { prisma }) => {
//     //         return await prisma.product.findMany({ where: { categoryId: parent.id } });
//     //     },
//     // },
//     // Order: {
//     //     customer: async (parent, _, { prisma }) => {
//     //         return await prisma.user.findUnique({ where: { id: parent.customerId } })
//     //     }
//     // }

// };
// export default resolvers;

import adminQuery from './query/admin/index.js';
import restaurantQuery from './query/restaurant/index.js';
import riderQuery from './query/rider/index.js';
import customerQuery from './query/customer/index.js';

import adminMutation from './mutation/admin/index.js';
import restaurantMutation from './mutation/restaurant/index.js';
import riderMutation from './mutation/rider/index.js';
import customerMutation from './mutation/customer/index.js';

import subscription from './subscription/index.js';

const resolvers = {
  Query: {
    ...adminQuery,
    ...restaurantQuery,
    ...riderQuery,
    ...customerQuery,
    },
    Mutation:{
      ...adminMutation,
      ...restaurantMutation,
      ...riderMutation,
      ...customerMutation
      },
  Subscription:{
       ...subscription,
      }
}

export default resolvers;