/*
  Warnings:

  - You are about to drop the `ActiveOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActiveOrdersWithPaginationResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AddonType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CouponResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardDataResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardOrdersResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardSalesResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardTotalResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryBounds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfferRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderDateRangeResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrdersOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OwnerRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OwnerRestaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantFood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantFoodVariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantListItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RiderType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RidersResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeRange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendorRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WithdrawRequestsResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZoneType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActiveOrderItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RestaurantOrderItemAddonTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `optionId` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `discount` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - The primary key for the `Cuisine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coordinates` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderDetailId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to alter the column `orderId` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `restaurantId` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `taxationCharges` on the `Taxation` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Variation` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - You are about to alter the column `requestAmount` on the `WithdrawRequest` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - Made the column `quantityMaximum` on table `Addon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantityMinimum` on table `Addon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Addon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Banner` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `restaurantId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `discount` on table `Coupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `Coupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Coupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Cuisine` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `latitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Offer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `restaurantId` to the `OpeningTime` table without a default value. This is not possible if the table is not empty.
  - Made the column `day` on table `OpeningTime` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `deliveryCharges` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `foodId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `variationId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restaurantId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Rider` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `Section` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Section` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `Taxation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `taxationCharges` on table `Taxation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `Tipping` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `foodId` to the `Variation` table without a default value. This is not possible if the table is not empty.
  - Made the column `discounted` on table `Variation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Variation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userType` on table `Vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requestAmount` on table `WithdrawRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requestId` on table `WithdrawRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `riderId` on table `WithdrawRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `WithdrawRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Zone` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "_ActiveOrderItems_B_index";

-- DropIndex
DROP INDEX "_ActiveOrderItems_AB_unique";

-- DropIndex
DROP INDEX "_RestaurantOrderItemAddonTypes_B_index";

-- DropIndex
DROP INDEX "_RestaurantOrderItemAddonTypes_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActiveOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActiveOrdersWithPaginationResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AddonType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CouponResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DashboardDataResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DashboardOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DashboardOrdersResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DashboardSalesResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DashboardTotalResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DeliveryAddress";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DeliveryBounds";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FoodItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OfferRestaurant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OptionType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderDateRangeResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderDetails";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrdersOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OwnerRestaurant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OwnerRestaurants";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantCategory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantDetails";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantFood";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantFoodVariation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantListItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantOrderItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantProfile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RestaurantType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReviewType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RiderType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RidersResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SalesOrder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SectionRestaurant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TimeRange";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsersResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VendorRestaurant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WithdrawRequestsResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ZoneType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActiveOrderItems";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RestaurantOrderItemAddonTypes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locationId" INTEGER NOT NULL,
    "deliveryAddress" TEXT,
    "details" TEXT,
    "label" TEXT,
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "Address_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Address_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "categoryId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL NOT NULL,
    "addonId" INTEGER,
    "restaurantId" INTEGER,
    CONSTRAINT "Option_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Option_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AddonToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AddonToOrderItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AddonToOrderItem_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_VariationToAddon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_VariationToAddon_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_VariationToAddon_B_fkey" FOREIGN KEY ("B") REFERENCES "Variation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RestaurantToSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RestaurantToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RestaurantToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RestaurantToCuisine" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RestaurantToCuisine_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RestaurantToCuisine_B_fkey" FOREIGN KEY ("B") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OfferToRestaurant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OfferToRestaurant_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OfferToRestaurant_B_fkey" FOREIGN KEY ("B") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "quantityMinimum" INTEGER NOT NULL,
    "quantityMaximum" INTEGER NOT NULL,
    "restaurantId" INTEGER,
    CONSTRAINT "Addon_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Addon" ("description", "id", "quantityMaximum", "quantityMinimum", "title") SELECT "description", "id", "quantityMaximum", "quantityMinimum", "title" FROM "Addon";
DROP TABLE "Addon";
ALTER TABLE "new_Addon" RENAME TO "Addon";
CREATE TABLE "new_Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "action" TEXT,
    "screen" TEXT,
    "file" TEXT,
    "parameters" TEXT
);
INSERT INTO "new_Banner" ("action", "description", "file", "id", "parameters", "screen", "title") SELECT "action", "description", "file", "id", "parameters", "screen", "title" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("id") SELECT "id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Coupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "discount" DECIMAL NOT NULL,
    "enabled" BOOLEAN NOT NULL
);
INSERT INTO "new_Coupon" ("discount", "enabled", "id", "title") SELECT "discount", "enabled", "id", "title" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
CREATE TABLE "new_Cuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "shopType" TEXT
);
INSERT INTO "new_Cuisine" ("description", "id", "image", "name", "shopType") SELECT "description", "id", "image", "name", "shopType" FROM "Cuisine";
DROP TABLE "Cuisine";
ALTER TABLE "new_Cuisine" RENAME TO "Cuisine";
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "address" TEXT
);
INSERT INTO "new_Location" ("id") SELECT "id" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE TABLE "new_Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT
);
INSERT INTO "new_Offer" ("id", "name", "tag") SELECT "id", "name", "tag" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
CREATE TABLE "new_OpeningTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT NOT NULL,
    "times" TEXT,
    "restaurantId" INTEGER NOT NULL,
    CONSTRAINT "OpeningTime_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OpeningTime" ("day", "id") SELECT "day", "id" FROM "OpeningTime";
DROP TABLE "OpeningTime";
ALTER TABLE "new_OpeningTime" RENAME TO "OpeningTime";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliveryCharges" DECIMAL NOT NULL,
    "orderAmount" DECIMAL NOT NULL,
    "paidAmount" DECIMAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "orderId" TEXT,
    "userId" INTEGER NOT NULL,
    "reason" TEXT,
    "status" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riderId" INTEGER,
    "restaurantId" INTEGER NOT NULL,
    "zoneId" INTEGER,
    "isPickedUp" BOOLEAN NOT NULL DEFAULT false,
    "tipping" DECIMAL,
    "taxationAmount" DECIMAL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id") SELECT "createdAt", "id" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");
CREATE TABLE "new_OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "foodId" INTEGER NOT NULL,
    "variationId" INTEGER NOT NULL,
    "specialInstructions" TEXT,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OrderItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("foodId", "id", "quantity", "specialInstructions", "variationId") SELECT "foodId", "id", "quantity", "specialInstructions", "variationId" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER,
    "orderPrefix" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "image" TEXT,
    "logo" TEXT,
    "address" TEXT NOT NULL,
    "locationId" INTEGER,
    "deliveryBounds" TEXT,
    "username" TEXT,
    "password" TEXT,
    "deliveryTime" TEXT,
    "minimumOrder" DECIMAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "commissionRate" DECIMAL,
    "tax" DECIMAL,
    "ownerId" INTEGER NOT NULL,
    "shopType" TEXT,
    "stripeDetailsSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "postCode" TEXT,
    "city" TEXT,
    CONSTRAINT "Restaurant_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Restaurant" ("address", "id", "image", "locationId", "name") SELECT "address", "id", "image", "locationId", "name" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("createdAt", "description", "id", "orderId", "rating", "restaurantId") SELECT coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "description", "id", "orderId", "rating", "restaurantId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_orderId_key" ON "Review"("orderId");
CREATE TABLE "new_Rider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "zoneId" INTEGER,
    "currentWalletAmount" DECIMAL,
    CONSTRAINT "Rider_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Rider" ("available", "id", "name", "password", "phone", "username", "zoneId") SELECT coalesce("available", true) AS "available", "id", "name", "password", "phone", "username", "zoneId" FROM "Rider";
DROP TABLE "Rider";
ALTER TABLE "new_Rider" RENAME TO "Rider";
CREATE UNIQUE INDEX "Rider_username_key" ON "Rider"("username");
CREATE UNIQUE INDEX "Rider_phone_key" ON "Rider"("phone");
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL
);
INSERT INTO "new_Section" ("enabled", "id", "name") SELECT "enabled", "id", "name" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
CREATE TABLE "new_Taxation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taxationCharges" DECIMAL NOT NULL,
    "enabled" BOOLEAN NOT NULL
);
INSERT INTO "new_Taxation" ("enabled", "id", "taxationCharges") SELECT "enabled", "id", "taxationCharges" FROM "Taxation";
DROP TABLE "Taxation";
ALTER TABLE "new_Taxation" RENAME TO "Taxation";
CREATE TABLE "new_Tipping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipVariations" TEXT,
    "enabled" BOOLEAN NOT NULL
);
INSERT INTO "new_Tipping" ("enabled", "id", "tipVariations") SELECT "enabled", "id", "tipVariations" FROM "Tipping";
DROP TABLE "Tipping";
ALTER TABLE "new_Tipping" RENAME TO "Tipping";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "pushToken" TEXT
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE TABLE "new_Variation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "price" DECIMAL NOT NULL,
    "discounted" BOOLEAN NOT NULL,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "Variation_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Variation" ("discounted", "id", "price", "title") SELECT "discounted", "id", "price", "title" FROM "Variation";
DROP TABLE "Variation";
ALTER TABLE "new_Variation" RENAME TO "Variation";
CREATE TABLE "new_Vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "userType" TEXT NOT NULL
);
INSERT INTO "new_Vendor" ("email", "id", "userType") SELECT "email", "id", "userType" FROM "Vendor";
DROP TABLE "Vendor";
ALTER TABLE "new_Vendor" RENAME TO "Vendor";
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
CREATE TABLE "new_WithdrawRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requestId" TEXT NOT NULL,
    "requestAmount" DECIMAL NOT NULL,
    "requestTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riderId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "WithdrawRequest_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WithdrawRequest" ("id", "requestAmount", "requestId", "requestTime", "riderId", "status") SELECT "id", "requestAmount", "requestId", coalesce("requestTime", CURRENT_TIMESTAMP) AS "requestTime", "riderId", "status" FROM "WithdrawRequest";
DROP TABLE "WithdrawRequest";
ALTER TABLE "new_WithdrawRequest" RENAME TO "WithdrawRequest";
CREATE UNIQUE INDEX "WithdrawRequest_requestId_key" ON "WithdrawRequest"("requestId");
CREATE TABLE "new_Zone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "locationId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Zone_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Zone" ("description", "id", "isActive", "locationId", "title") SELECT "description", "id", coalesce("isActive", true) AS "isActive", "locationId", "title" FROM "Zone";
DROP TABLE "Zone";
ALTER TABLE "new_Zone" RENAME TO "Zone";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Address_orderId_key" ON "Address"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "_AddonToOrderItem_AB_unique" ON "_AddonToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonToOrderItem_B_index" ON "_AddonToOrderItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VariationToAddon_AB_unique" ON "_VariationToAddon"("A", "B");

-- CreateIndex
CREATE INDEX "_VariationToAddon_B_index" ON "_VariationToAddon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToSection_AB_unique" ON "_RestaurantToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToSection_B_index" ON "_RestaurantToSection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToCuisine_AB_unique" ON "_RestaurantToCuisine"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToCuisine_B_index" ON "_RestaurantToCuisine"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OfferToRestaurant_AB_unique" ON "_OfferToRestaurant"("A", "B");

-- CreateIndex
CREATE INDEX "_OfferToRestaurant_B_index" ON "_OfferToRestaurant"("B");
