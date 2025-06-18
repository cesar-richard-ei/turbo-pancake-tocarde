import { z } from "zod";
import { PaginatedSchema } from "./paginatedSchema";

export const LinkTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  url: z.string(),
});

export type LinkType = z.infer<typeof LinkTypeSchema>;

export const PaginatedLinksSchema = PaginatedSchema(LinkTypeSchema);
export type PaginatedLinks = z.infer<typeof PaginatedLinksSchema>;

export async function fetchLinks(): Promise<PaginatedLinks> {
  const resp = await fetch('/api/resources/links/');
  if (!resp.ok) throw new Error('Failed to fetch links');
  const data = await resp.json();
  return PaginatedLinksSchema.parse(data);
}
