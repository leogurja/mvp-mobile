import { z } from "zod";

export const eventSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  location: z.string(),
  parkId: z.coerce.number().int().positive(),
});

export type EventSchema = z.infer<typeof eventSchema>;
