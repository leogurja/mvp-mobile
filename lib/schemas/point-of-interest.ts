import { z } from "zod";

export const pointOfInterestSchema = z.object({
  name: z.string(),
  description: z.string(),
  typeId: z.coerce.number(),
  parkId: z.coerce.number().int().positive(),
});

export type PointOfInterestSchema = z.infer<typeof pointOfInterestSchema>;
