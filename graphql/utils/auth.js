const checkAuth = (context, requiredType) => {
    const userId = context?.user?.id;
    const userType = context?.user?.userType;

    if (!userId || !userType) {
        throw new Error("Not authenticated");
    }
    if (requiredType && userType !== requiredType) {
        throw new Error(`Not authorized. ${requiredType} role required.`);
    }
    return {userId,userType}
};

export default checkAuth;