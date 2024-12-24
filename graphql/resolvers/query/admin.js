export const adminQueries = {

    // ... (Previous queries: getDashboardSales, getDashboardOrders, getDashboardData, etc.)

    getCoupons: async (parent, { page = 1, rowsPerPage = 10, search = '' }, { prisma }) => {  // coupons(page:Int,rowsPerPage:Int,search:String):CouponResult
        try {
            // ... (Implementation using pagination, search, and totalCount)
        } catch (error) {
            // ... (Error handling)
        }
    },
    orderCount: async (parent, { restaurant }, { prisma }) => { // orderCount(restaurant:String!):Int
        try {
            // ... implementation
        } catch (error) {
            // ... error handling
        }
    },


    pageCount: async (parent, { restaurant }, { prisma }) => {  // pageCount(restaurant:String!):Int
        try {
            // ... implementation
        } catch (error) {
            // ... error handling
        }
    },

    getZones: async (parent, args, { prisma }) => {  // zones:[Zone]
        try {
            const zones = await prisma.zone.findMany();
            return zones;
        } catch (error) {
            // ... error handling
        }
    },
    getVendors: async (parent, args, { prisma }) => {  // vendors:[Vendor]
        try {
            const vendors = await prisma.vendor.findMany({ include: { restaurants: true } });
            return vendors;
        } catch (error) {
            // ... error handling
        }
    },
    getVendor: async (parent, { id }, { prisma }) => { // getVendor(id:String!):VendorResult
        try {

            // ... (Add Prisma query logic, error handling if vendor not found)
        } catch (error) {
            // ... error handling
        }
    },

    getTaxation: async (parent, args, { prisma }) => { // taxes:[Taxation]
        try {

            const tax = await prisma.taxation.findFirst(); // Assuming only one taxation record
            return tax;

        } catch (error) {
            // ... error handling
        }
    },
    getCuisines: async (parent, args, { prisma }) => {  // cuisines:[Cuisine]
        try {
            const cuisines = await prisma.cuisine.findMany();
            return cuisines;
        } catch (error) {
            // ... error handling
        }
    },
    getBanners: async (parent, args, { prisma }) => {  // banners:[Banner]
        try {
            const banners = await prisma.banner.findMany();
            return banners;
        } catch (error) {
            // ... error handling
        }
    },

    getBannerActions: async (parent, args, { }) => { // bannerActions:[String]
        // This seems to be a static list.  No Prisma query is needed.
        try {
            return [
                'Home',
                'Foods',
                'Categories',
                'Restaurants',
                'Restaurant detail',
                'Coupons',
                'Order',
                'Offers',
                'Search',
            ];

        } catch (error) {
            // ... error handling (if any)
        }
    },
    getTipping: async (parent, args, { prisma }) => { // tips:[Tipping]
        try {
            const tipping = await prisma.tipping.findFirst(); // Assuming single tipping config
            return tipping
        } catch (error) {
            // ... error handling
        }
    },
    getAddons: async (parent, args, { prisma }) => { // addons:[Addon]
        try {
            const addons = await prisma.addon.findMany({ include: { options: true } });
            return addons;
        } catch (error) {
            // ... error handling
        }
    },
    getOptions: async (parent, args, { prisma }) => { // options:[Option]
        try {
            const options = await prisma.option.findMany();
            return options;
        } catch (error) {
            // ... error handling
        }
    },


    getPaymentStatuses: async (parent, args, { prisma }) => {  // getPaymentStatuses:[String]
        // Static data - no Prisma query needed
        try {
            return ['Pending', 'Paid', 'Unpaid'];
        } catch (error) {
            // ... error handling (if any)
        }
    },
    getOffers: async (parent, args, { prisma }) => { // offers:[Offer]
        try {
            const offers = await prisma.offer.findMany({ include: { restaurants: true } });
            return offers;
        } catch (error) {
            // ... error handling
        }
    },

    getSections: async (parent, args, { prisma }) => {  // sections:[Section]
        try {
            const sections = await prisma.section.findMany({ include: { restaurants: true } });
            return sections
        } catch (error) {
            // ... error handling
        }
    },

    // ... other admin queries
};