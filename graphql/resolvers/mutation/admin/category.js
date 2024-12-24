import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';

const prisma = new PrismaClient();

const adminCategoryMutationResolvers = {
    createCategory: async (parent, { category }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: category.restaurant
                },
                data: {
                    categories: {
                        create: {
                            title: category.title,
                            isActive: true
                        }
                    }
                },
                include: {
                    categories: {
                        include: {
                            foods: {
                                include: {
                                    variations: true
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            console.error("Error in createCategory:", error);
            throw new Error("Failed to create category. Check server logs");
        }
    },
    editCategory: async (parent, { category }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: category.restaurant
                },
                data: {
                    categories: {
                        update: {
                            where: {
                                id: category._id
                            },
                            data: {
                                title: category.title
                            }
                        }
                    }
                },
                include: {
                    categories: {
                        include: {
                            foods: {
                                include: {
                                    variations: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error in editCategory:", error);
            throw new Error("Failed to edit category. Check server logs");
        }
    },
    deleteCategory: async (parent, { id, restaurant }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: restaurant
                },
                data: {
                    categories: {
                        delete: {
                            id: id
                        }
                    }
                },
                include: {
                    categories: {
                        include: {
                            foods: {
                                include: {
                                    variations: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error in deleteCategory:", error);
            throw new Error("Failed to delete category. Check server logs");
        }
    },
};

export default adminCategoryMutationResolvers;