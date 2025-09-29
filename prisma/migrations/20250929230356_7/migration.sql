/*
  Warnings:

  - You are about to drop the column `type` on the `PointOfInterest` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PointOfInterestType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PointOfInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL DEFAULT 1,
    "parkId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PointOfInterest_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PointOfInterestType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PointOfInterest_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PointOfInterest" ("createdAt", "description", "id", "name", "parkId", "updatedAt") SELECT "createdAt", "description", "id", "name", "parkId", "updatedAt" FROM "PointOfInterest";
DROP TABLE "PointOfInterest";
ALTER TABLE "new_PointOfInterest" RENAME TO "PointOfInterest";
CREATE UNIQUE INDEX "PointOfInterest_name_parkId_key" ON "PointOfInterest"("name", "parkId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PointOfInterestType_name_key" ON "PointOfInterestType"("name");
