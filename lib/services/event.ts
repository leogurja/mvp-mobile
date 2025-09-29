"use server";

import db from "@/lib/db";
import { requireAuth } from "../require-auth";
import { eventSchema, type EventSchema } from "../schemas/event";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { notFound } from "next/navigation";

export async function createEvent(input: EventSchema) {
  await requireAuth();
  const data = eventSchema.parse(input);

  await db.event.create({ data });
  revalidatePath(`/parks/${data.parkId}`);
}

export async function updateEvent(id: number, input: EventSchema) {
  await requireAuth();
  const data = eventSchema.parse(input);

  await db.event.update({ where: { id }, data });
  revalidatePath(`/parks/${data.parkId}`);
}

export async function deleteEvent(id: number) {
  await requireAuth();

  const event = await db.event.findUnique({ where: { id } });
  if (!event) notFound();

  await db.event.delete({ where: { id } });
  revalidatePath(`/parks/${event.parkId}`);
}

export const getAllEvents = cache(async () => {
  return db.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getEventById = cache(async (id: number) => {
  const poi = await db.event.findUnique({ where: { id } });
  if (!poi) notFound();

  return poi;
});

export const getEventsByParkId = cache(async (parkId: number) => {
  return db.event.findMany({
    where: { parkId },
    orderBy: {
      date: "asc",
    },
  });
});
