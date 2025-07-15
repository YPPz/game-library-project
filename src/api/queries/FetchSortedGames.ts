import { SearchGames } from "./GetSearchGames";
import type { SortOption } from "../types/GameOrdering";
import { SortByMap } from "../types/GameOrdering";
import type { SearchSummary } from "../types/SearchSummary";
import { loadMoreFilteredGames } from "./GetFilteredGame";

export interface SearchResponse {
    results: SearchSummary[];
    next: string | null;
}

// ใช้ในหน้า SearchPage
export async function fetchSortedGames(term: string, sortBy: SortOption): Promise<SearchResponse> {
    const ordering = SortByMap[sortBy] ;
     console.log(ordering)
    return await SearchGames(term, undefined, 40, ordering);
}


// ใช้ในหน้า FilteredPage
export async function fetchSortedFilteredGames(type: string, sortBy: SortOption): Promise<SearchResponse> {
  const ordering = SortByMap[sortBy] || ""; // fallback เป็น "" ถ้าไม่มี
  return await loadMoreFilteredGames(type, undefined, 40, ordering);
}
