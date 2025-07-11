import type { SearchSummary } from "../types/SearchSummary";
import { API_KEY, BASE_URL } from "../api";

export interface SearchResponse {
  results: SearchSummary[];
  next: string | null;
}


export async function SearchGames(term: string, nextUrl?: string): Promise<SearchResponse> {
  const url = nextUrl ? nextUrl : `${BASE_URL}?key=${API_KEY}&page_size=40&search=${term}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch games");
  
  const data = await res.json();

  return {
    results: data.results,
    next: data.next,
  };
}
