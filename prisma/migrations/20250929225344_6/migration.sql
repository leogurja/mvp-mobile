-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Park" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "biodiversity" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Park" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Park";
DROP TABLE "Park";
ALTER TABLE "new_Park" RENAME TO "Park";
CREATE UNIQUE INDEX "Park_name_key" ON "Park"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
