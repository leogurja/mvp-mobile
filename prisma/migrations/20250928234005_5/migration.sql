/*
  Warnings:

  - A unique constraint covering the columns `[name,parkId]` on the table `PointOfInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PointOfInterest_name_parkId_key" ON "PointOfInterest"("name", "parkId");
