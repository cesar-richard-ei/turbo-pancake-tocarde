export interface LinkType {
  id: number;
  name: string;
  description?: string;
  url: string;
}

export interface PaginatedLinks {
  count: number;
  next: string | null;
  previous: string | null;
  results: LinkType[];
}

export async function fetchLinks(): Promise<LinkType[]> {
  const resp = await fetch('/api/resources/links/');
  if (!resp.ok) throw new Error('Failed to fetch links');
  const data: PaginatedLinks = await resp.json();
  return data.results;
}
