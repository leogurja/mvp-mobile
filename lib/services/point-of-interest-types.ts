"use server";

import db from "@/lib/db";
import { cache } from "react";

export const getAllPointOfInterestTypes = cache(async () => {
  return db.pointOfInterestType.findMany();
});
