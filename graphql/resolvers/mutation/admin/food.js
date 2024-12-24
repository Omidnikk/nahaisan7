import { PrismaClient } from '@prisma/client';
import checkAuth from '../../../utils/auth.js';
const prisma = new PrismaClient();

const adminFoodMutationResolvers = {
    createFood: async (parent, { foodInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: foodInput.restaurant
                },
                data: {
                    categories: {
                        update: {
                            where: {
                                id: foodInput.categoryId
                            },
                            data: {
                                foods: {
                                    create: {
                                        title: foodInput.title,
                                        description: foodInput.description,
                                        image: foodInput.image,
                                        variations: {
                                            createMany: {
                                                data: foodInput.variations
                                            }
                                        },
                                        isActive: true
                                    }
                                }
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
            })
        } catch (error) {
            console.error("Error in createFood:", error);
            throw new Error("Failed to create food. Check server logs");
        }
    },
    editFood: async (parent, { foodInput }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: foodInput.restaurant
                },
                data: {
                    categories: {
                        update: {
                            where: {
                                id: foodInput.categoryId
                            },
                            data: {
                                foods: {
                                    update: {
                                        where: {
                                            id: foodInput._id
                                        },
                                        data: {
                                            title: foodInput.title,
                                            description: foodInput.description,
                                            image: foodInput.image,
                                            variations: {
                                                deleteMany: {},
                                                createMany: {
                                                    data: foodInput.variations
                                                }
                                            },
                                            isActive: foodInput.isActive
                                        }
                                    }
                                }
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
            console.error("Error in editFood:", error);
            throw new Error("Failed to edit food. Check server logs");
        }
    },
    deleteFood: async (parent, { id, restaurant, categoryId }, context, info) => {
        try {
            checkAuth(context, "admin");
            return await prisma.restaurant.update({
                where: {
                    id: restaurant
                },
                data: {
                    categories: {
                        update: {
                            where: {
                                id: categoryId
                            },
                            data: {
                                foods: {
                                    delete: {
                                        id: id
                                    }
                                }
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
            })
        } catch (error) {
            console.error("Error in deleteFood:", error);
            throw new Error("Failed to delete food. Check server logs");
        }
    },
}

export default adminFoodMutationResolvers;