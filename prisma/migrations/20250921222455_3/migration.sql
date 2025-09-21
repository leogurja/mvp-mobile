/*
  Warnings:

  - You are about to drop the column `text` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `PointOfInterest` table. All the data in the column will be lost.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `PointOfInterest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parkId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "date", "id", "location", "parkId", "updatedAt") SELECT "createdAt", "date", "id", "location", "parkId", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_PointOfInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'OTHER',
    "parkId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PointOfInterest_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PointOfInterest" ("createdAt", "id", "name", "parkId", "type", "updatedAt") SELECT "createdAt", "id", "name", "parkId", "type", "updatedAt" FROM "PointOfInterest";
DROP TABLE "PointOfInterest";
ALTER TABLE "new_PointOfInterest" RENAME TO "PointOfInterest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
