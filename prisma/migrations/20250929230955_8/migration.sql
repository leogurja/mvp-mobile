/*
  Warnings:

  - You are about to drop the column `name` on the `PointOfInterestType` table. All the data in the column will be lost.
  - Added the required column `plural` to the `PointOfInterestType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `singular` to the `PointOfInterestType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PointOfInterestType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "singular" TEXT NOT NULL,
    "plural" TEXT NOT NULL
);
INSERT INTO "new_PointOfInterestType" ("id") SELECT "id" FROM "PointOfInterestType";
DROP TABLE "PointOfInterestType";
ALTER TABLE "new_PointOfInterestType" RENAME TO "PointOfInterestType";
CREATE UNIQUE INDEX "PointOfInterestType_singular_key" ON "PointOfInterestType"("singular");
CREATE UNIQUE INDEX "PointOfInterestType_plural_key" ON "PointOfInterestType"("plural");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
