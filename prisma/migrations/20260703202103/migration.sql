-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobTitle" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "vendorName" TEXT,
    "vendorContact" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "availableQty" REAL NOT NULL DEFAULT 0,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "collectionId" INTEGER,
    CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorageHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "productId" INTEGER,
    CONSTRAINT "StorageHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantityInBase" REAL NOT NULL,
    "isBase" BOOLEAN NOT NULL,
    "defaultValue" REAL NOT NULL,
    "variantValue" REAL NOT NULL,
    "price" REAL NOT NULL,
    "cost" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ProductUnit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalAmount" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "totalAmountWithTax" REAL NOT NULL,
    "discount" REAL,
    "profit" REAL NOT NULL,
    "partiallyPaidIn" REAL,
    "totalAmountString" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "type" TEXT NOT NULL,
    "paymentMode" TEXT,
    "paymentRef" TEXT,
    "orderRef" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "customerId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unitPrice" REAL NOT NULL,
    "totalAmount" REAL NOT NULL,
    "unitProfit" REAL NOT NULL,
    "totalProfit" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "productUnitId" INTEGER,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME,
    CONSTRAINT "OrderItem_productUnitId_fkey" FOREIGN KEY ("productUnitId") REFERENCES "ProductUnit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Timeline_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Timeline_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ice" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "archived" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "soldQuantity" REAL NOT NULL,
    "saleNumber" REAL NOT NULL,
    "soldRevenue" REAL NOT NULL,
    "soldProfit" REAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductStats_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SaleStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "totalAmount" REAL NOT NULL,
    "totalAmountWithTax" REAL NOT NULL,
    "totalOrders" REAL NOT NULL,
    "profit" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CollectionStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "saleNumber" REAL NOT NULL,
    "soldRevenue" REAL NOT NULL,
    "soldProfit" REAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CollectionStats_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_handle_key" ON "Product"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUnit_productId_name_key" ON "ProductUnit"("productId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_handle_key" ON "Collection"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_orderId_key" ON "Timeline"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderId_key" ON "Invoice"("orderId");

-- CreateIndex
CREATE INDEX "ProductStats_period_key_createdAt_idx" ON "ProductStats"("period", "key", "createdAt");

-- CreateIndex
CREATE INDEX "SaleStats_period_key_createdAt_idx" ON "SaleStats"("period", "key", "createdAt");

-- CreateIndex
CREATE INDEX "CollectionStats_period_key_createdAt_idx" ON "CollectionStats"("period", "key", "createdAt");
