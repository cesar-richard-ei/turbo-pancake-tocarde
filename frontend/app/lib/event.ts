import { z } from "zod";
import { PaginatedSchema } from "./paginatedSchema";

export const EventTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  location: z.string(),
  at_compiegne: z.boolean(),
  is_public: z.boolean(),
});

export type EventType = z.infer<typeof EventTypeSchema>;

export const PaginatedEventsSchema = PaginatedSchema(EventTypeSchema);
export type PaginatedEvents = z.infer<typeof PaginatedEventsSchema>;

export async function fetchEvents(): Promise<PaginatedEvents> {
  const resp = await fetch('/api/event/events/');
  if (!resp.ok) throw new Error('Failed to fetch events');
  const data = await resp.json();
  return PaginatedEventsSchema.parse(data);
}
