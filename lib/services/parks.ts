import { cache } from "react";
import db from "../db";

export const getAllParks = cache(async () => {
  return db.park.findMany();
});

export const findParkById = cache(async (id: number) => {
  return db.park.findUnique({
    where: { id },
  });
});

export const getAllParkIds = cache(async () => {
  const parks = await db.park.findMany({
    select: { id: true },
  });
  return parks.map((park) => ({ id: park.id.toString() }));
});
