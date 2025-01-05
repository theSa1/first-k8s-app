import { z } from "zod";

export const createNotesSchema = z.object({
  content: z.string().min(1).max(1000),
});

export const deleteNotesSchema = z.object({
  id: z.number(),
});
