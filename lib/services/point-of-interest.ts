"use server";

import db from "@/lib/db";
import { requireAuth } from "../require-auth";
import {
  pointOfInterestSchema,
  type PointOfInterestSchema,
} from "../schemas/point-of-interest";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { notFound } from "next/navigation";

export async function createPointOfInterest(input: PointOfInterestSchema) {
  await requireAuth();
  const data = pointOfInterestSchema.parse(input);

  await db.pointOfInterest.create({ data });
  revalidatePath(`/parks/${input.parkId}`);
}

export async function updatePointOfInterest(
  id: number,
  input: PointOfInterestSchema
) {
  await requireAuth();
  const data = pointOfInterestSchema.parse(input);

  await db.pointOfInterest.update({ where: { id }, data });
  revalidatePath(`/parks/${input.parkId}`);
}

export async function deletePointOfInterest(id: number) {
  await requireAuth();

  const poi = await db.pointOfInterest.findUnique({ where: { id } });
  if (!poi) notFound();
  await db.pointOfInterest.delete({ where: { id } });

  revalidatePath(`/parks/${poi.parkId}`);
}

export const getAllPointsOfInterest = cache(async () => {
  return db.pointOfInterest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getPointOfInterestById = cache(async (id: number) => {
  const poi = await db.pointOfInterest.findUnique({ where: { id } });
  if (!poi) notFound();

  return poi;
});

export const getPointsOfInterestByParkId = cache(async (parkId: number) => {
  return db.pointOfInterest.findMany({
    where: { parkId },
    orderBy: {
      createdAt: "desc",
    },
  });
});
