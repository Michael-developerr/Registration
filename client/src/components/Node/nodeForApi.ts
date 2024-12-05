import { z } from "zod";

export const NodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});

export const NodeSchemaArray = z.object({
  list: z.array(NodeSchema),
  pageCount: z.number(),
});

export type Node = z.infer<typeof NodeSchema>;
export type NodeResponse = z.infer<typeof NodeSchemaArray>;
