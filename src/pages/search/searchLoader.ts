import { SearchGames } from "../../api/queries/GetSearchGames";
import type { SearchSummary } from "../../api/types/SearchSummary";

export interface SearchLoaderResult {
  searchResults: SearchSummary[];
  term: string;
  next: string | null;
}

export async function searchLoader({ request, }: { request: Request; }): Promise<SearchLoaderResult> {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (!term) {
    throw new Error("Search term must be provided!");
  }

  const { results, next } = await SearchGames(term);

  return {
    searchResults: results,
    term,
    next,
  };
}
