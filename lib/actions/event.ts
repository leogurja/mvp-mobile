"use server";

import db from "@/lib/db";
import { requireAuth } from "../require-auth";
import { eventSchema, type EventSchema } from "../schemas/event";
import { revalidatePath } from "next/cache";

export async function createEvent(input: EventSchema) {
  await requireAuth();
  const data = eventSchema.parse(input);

  await db.event.create({ data });
  revalidatePath("/admin");
}

export async function updateEvent(id: number, input: EventSchema) {
  await requireAuth();
  const data = eventSchema.parse(input);

  await db.event.update({ where: { id }, data });
  revalidatePath("/admin");
}

export async function deleteEvent(id: number) {
  await requireAuth();

  await db.event.delete({ where: { id } });
  revalidatePath("/admin");
}
