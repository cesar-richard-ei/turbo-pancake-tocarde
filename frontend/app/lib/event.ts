export interface EventType {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
}

export interface PaginatedEvents {
  count: number;
  next: string | null;
  previous: string | null;
  results: EventType[];
}

export async function fetchEvents(): Promise<EventType[]> {
  const resp = await fetch('/api/event/events/');
  if (!resp.ok) throw new Error('Failed to fetch events');
  const data: PaginatedEvents = await resp.json();
  return data.results;
}
