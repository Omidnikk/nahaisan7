-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliveryAddress" TEXT,
    "deliveryCharges" REAL,
    "orderAmount" REAL,
    "paidAmount" REAL,
    "paymentMethod" TEXT,
    "orderId" TEXT,
    "userId" TEXT,
    "reason" TEXT,
    "status" TEXT,
    "paymentStatus" TEXT,
    "orderStatus" TEXT,
    "createdAt" DATETIME,
    "reviewId" TEXT,
    "riderId" TEXT
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderDetailId" INTEGER,
    "foodId" INTEGER,
    "variationId" INTEGER,
    "specialInstructions" TEXT,
    "quantity" INTEGER,
    CONSTRAINT "OrderItem_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetails" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Variation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "price" REAL,
    "discounted" BOOLEAN
);

-- CreateTable
CREATE TABLE "AddonType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "quantityMinimum" INTEGER,
    "quantityMaximum" INTEGER,
    "orderItemId" INTEGER,
    "optionId" INTEGER,
    CONSTRAINT "AddonType_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OptionType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "price" REAL,
    "addonTypeId" INTEGER,
    CONSTRAINT "OptionType_addonTypeId_fkey" FOREIGN KEY ("addonTypeId") REFERENCES "AddonType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RiderType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "ReviewType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" REAL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT,
    "restaurantId" TEXT,
    "rating" REAL,
    "description" TEXT,
    "createdAt" DATETIME
);

-- CreateTable
CREATE TABLE "OrderDateRangeResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalAmountCashOnDelivery" REAL,
    "countCashOnDeliveryOrders" INTEGER
);

-- CreateTable
CREATE TABLE "RestaurantOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT,
    "restaurantId" TEXT,
    "deliveryAddressId" TEXT,
    "userId" TEXT,
    "paymentMethod" TEXT,
    "paidAmount" REAL,
    "orderAmount" REAL,
    "orderStatus" TEXT,
    "status" TEXT,
    "paymentStatus" TEXT,
    "reason" TEXT,
    "isActive" BOOLEAN,
    "createdAt" DATETIME,
    "deliveryCharges" REAL,
    "tipping" REAL,
    "taxationAmount" REAL,
    "riderId" TEXT
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "image" TEXT,
    "address" TEXT,
    "locationId" INTEGER
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coordinates" TEXT
);

-- CreateTable
CREATE TABLE "DeliveryAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locationId" INTEGER,
    "deliveryAddress" TEXT,
    "details" TEXT,
    "label" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantOrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "restaurantOrderId" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "quantity" INTEGER,
    "variationId" INTEGER,
    "specialInstructions" TEXT,
    "isActive" BOOLEAN,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "RestaurantOrderItem_restaurantOrderId_fkey" FOREIGN KEY ("restaurantOrderId") REFERENCES "RestaurantOrder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DashboardTotalResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalOrders" INTEGER,
    "totalSales" REAL
);

-- CreateTable
CREATE TABLE "DashboardSalesResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "SalesOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT,
    "amount" REAL
);

-- CreateTable
CREATE TABLE "DashboardOrdersResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "OrdersOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT,
    "count" INTEGER
);

-- CreateTable
CREATE TABLE "DashboardDataResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalOrders" INTEGER,
    "totalUsers" INTEGER,
    "totalSales" REAL
);

-- CreateTable
CREATE TABLE "DashboardOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT,
    "count" INTEGER,
    "amount" REAL
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "emailName" TEXT,
    "password" TEXT,
    "enableEmail" BOOLEAN,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "sandbox" BOOLEAN,
    "publishableKey" TEXT,
    "secretKey" TEXT,
    "currency" TEXT,
    "currencySymbol" TEXT,
    "deliveryRate" REAL,
    "twilioAccountSid" TEXT,
    "twilioAuthToken" TEXT,
    "twilioPhoneNumber" TEXT,
    "twilioEnabled" BOOLEAN,
    "formEmail" TEXT,
    "sendGridApiKey" TEXT,
    "sendGridEnabled" BOOLEAN,
    "sendGridEmail" TEXT,
    "sendGridEmailName" TEXT,
    "sendGridPassword" TEXT,
    "dashboardSentryUrl" TEXT,
    "webSentryUrl" TEXT,
    "apiSentryUrl" TEXT,
    "customerAppSentryUrl" TEXT,
    "restaurantAppSentryUrl" TEXT,
    "riderAppSentryUrl" TEXT,
    "googleApiKey" TEXT,
    "cloudinaryUploadUrl" TEXT,
    "cloudinaryApiKey" TEXT,
    "webAmplitudeApiKey" TEXT,
    "appAmplitudeApiKey" TEXT,
    "webClientID" TEXT,
    "androidClientID" TEXT,
    "iOSClientID" TEXT,
    "expoClientID" TEXT,
    "googleMapLibraries" TEXT,
    "googleColor" TEXT,
    "termsAndConditions" TEXT,
    "privacyPolicy" TEXT,
    "testOtp" TEXT,
    "firebaseKey" TEXT,
    "authDomain" TEXT,
    "projectId" TEXT,
    "storageBucket" TEXT,
    "msgSenderId" TEXT,
    "appId" TEXT,
    "measurementId" TEXT,
    "isPaidVersion" BOOLEAN,
    "skipEmailVerification" BOOLEAN,
    "skipMobileVerification" BOOLEAN,
    "costType" TEXT,
    "vapidKey" TEXT
);

-- CreateTable
CREATE TABLE "ActiveOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneId" INTEGER,
    "orderId" TEXT,
    "restaurantId" INTEGER,
    "deliveryAddressId" INTEGER,
    "userId" TEXT,
    "paymentMethod" TEXT,
    "paidAmount" REAL,
    "orderAmount" REAL,
    "orderStatus" TEXT,
    "isPickedUp" BOOLEAN,
    "status" TEXT,
    "paymentStatus" TEXT,
    "reason" TEXT,
    "isActive" BOOLEAN,
    "createdAt" DATETIME,
    "deliveryCharges" REAL,
    "riderId" INTEGER
);

-- CreateTable
CREATE TABLE "ZoneType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "ActiveOrdersWithPaginationResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderCount" INTEGER,
    "page" INTEGER,
    "rowsPerPage" INTEGER
);

-- CreateTable
CREATE TABLE "Rider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "username" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "available" BOOLEAN,
    "zoneId" INTEGER
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "locationId" INTEGER,
    "isActive" BOOLEAN
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "userType" TEXT
);

-- CreateTable
CREATE TABLE "VendorRestaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT,
    "orderPrefix" TEXT,
    "slug" TEXT,
    "name" TEXT,
    "image" TEXT,
    "address" TEXT,
    "locationId" INTEGER,
    "zoneId" INTEGER,
    "shopType" TEXT
);

-- CreateTable
CREATE TABLE "Taxation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taxationCharges" REAL,
    "enabled" BOOLEAN
);

-- CreateTable
CREATE TABLE "CouponResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalCount" INTEGER
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "discount" REAL,
    "enabled" BOOLEAN
);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "shopType" TEXT
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "action" TEXT,
    "screen" TEXT,
    "file" TEXT,
    "parameters" TEXT
);

-- CreateTable
CREATE TABLE "Tipping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipVariations" TEXT,
    "enabled" BOOLEAN
);

-- CreateTable
CREATE TABLE "Addon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "quantityMinimum" INTEGER,
    "quantityMaximum" INTEGER,
    "optionId" INTEGER
);

-- CreateTable
CREATE TABLE "OwnerRestaurants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "userType" TEXT
);

-- CreateTable
CREATE TABLE "OwnerRestaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT,
    "orderPrefix" TEXT,
    "name" TEXT,
    "slug" TEXT,
    "image" TEXT,
    "address" TEXT,
    "username" TEXT,
    "password" TEXT,
    "locationId" INTEGER,
    "shopType" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantListItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "image" TEXT,
    "orderPrefix" TEXT,
    "slug" TEXT,
    "address" TEXT,
    "deliveryTime" REAL,
    "minimumOrder" REAL,
    "isActive" BOOLEAN,
    "commissionRate" REAL,
    "tax" REAL,
    "ownerId" INTEGER,
    "shopType" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT,
    "orderPrefix" TEXT,
    "slug" TEXT,
    "name" TEXT,
    "image" TEXT,
    "logo" TEXT,
    "address" TEXT,
    "locationId" INTEGER,
    "deliveryBoundsId" INTEGER,
    "username" TEXT,
    "password" TEXT,
    "deliveryTime" REAL,
    "minimumOrder" REAL,
    "tax" REAL,
    "isAvailable" BOOLEAN,
    "stripeDetailsSubmitted" BOOLEAN,
    "shopType" TEXT,
    "ownerId" INTEGER
);

-- CreateTable
CREATE TABLE "DeliveryBounds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coordinates" TEXT
);

-- CreateTable
CREATE TABLE "OpeningTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT
);

-- CreateTable
CREATE TABLE "TimeRange" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" TEXT,
    "endTime" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT,
    "orderPrefix" TEXT,
    "slug" TEXT,
    "name" TEXT,
    "image" TEXT,
    "address" TEXT,
    "locationId" INTEGER,
    "deliveryTime" REAL,
    "minimumOrder" REAL,
    "tax" REAL,
    "shopType" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT
);

-- CreateTable
CREATE TABLE "RestaurantFood" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "isActive" BOOLEAN
);

-- CreateTable
CREATE TABLE "RestaurantFoodVariation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "price" REAL,
    "discounted" BOOLEAN
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "tag" TEXT
);

-- CreateTable
CREATE TABLE "OfferRestaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "enabled" BOOLEAN
);

-- CreateTable
CREATE TABLE "SectionRestaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "UsersResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalCount" INTEGER
);

-- CreateTable
CREATE TABLE "RidersResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalCount" INTEGER
);

-- CreateTable
CREATE TABLE "WithdrawRequestsResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalCount" INTEGER
);

-- CreateTable
CREATE TABLE "WithdrawRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestId" TEXT,
    "requestAmount" REAL,
    "requestTime" DATETIME,
    "riderId" INTEGER,
    "status" TEXT
);

-- CreateTable
CREATE TABLE "_RestaurantOrderItemAddonTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RestaurantOrderItemAddonTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "AddonType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RestaurantOrderItemAddonTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "RestaurantOrderItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActiveOrderItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ActiveOrderItems_A_fkey" FOREIGN KEY ("A") REFERENCES "ActiveOrder" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActiveOrderItems_B_fkey" FOREIGN KEY ("B") REFERENCES "RestaurantOrderItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantOrderItemAddonTypes_AB_unique" ON "_RestaurantOrderItemAddonTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantOrderItemAddonTypes_B_index" ON "_RestaurantOrderItemAddonTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActiveOrderItems_AB_unique" ON "_ActiveOrderItems"("A", "B");

-- CreateIndex
CREATE INDEX "_ActiveOrderItems_B_index" ON "_ActiveOrderItems"("B");
