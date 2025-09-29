import { PointOfInterestType } from "@/generated/prisma";
import { z } from "zod";

export const pointOfInterestSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.nativeEnum(PointOfInterestType),
  parkId: z.coerce.number().int().positive(),
});

export type PointOfInterestSchema = z.infer<typeof pointOfInterestSchema>;
