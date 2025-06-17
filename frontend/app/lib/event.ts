import { z } from "zod";

export interface EventType {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  at_compiegne: boolean;
  is_public: boolean;
}

export interface PaginatedEvents {
  count: number;
  next: string | null;
  previous: string | null;
  results: EventType[];
}

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

export const PaginatedEventsSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(EventTypeSchema),
});

export async function fetchEvents(): Promise<EventType[]> {
  const resp = await fetch('/api/event/events/');
  if (!resp.ok) throw new Error('Failed to fetch events');
  const data = await resp.json();
  const parsed = PaginatedEventsSchema.parse(data);
  return parsed.results;
}
