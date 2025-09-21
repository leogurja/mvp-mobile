/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Park` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Park_name_key" ON "Park"("name");
