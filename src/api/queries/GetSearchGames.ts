import type { SearchSummary } from "../types/SearchSummary";
import { API_KEY, BASE_URL } from "../api";

export interface SearchResponse {
  results: SearchSummary[];
  next: string | null;
}

export async function SearchGames(term: string, nextUrl?: string, pageSize: number = 40, ordering?: string): Promise<SearchResponse> {
  if (!API_KEY) return { results: [], next: null }; 
  // ถ้าเป็น nextUrl (สำหรับ load more)
  if (nextUrl) {
    const res = await fetch(nextUrl);
    if (!res.ok) throw new Error("Failed to fetch next page");
    const data = await res.json();
    return {
      results: data.results,
      next: data.next,
    };
  }


  // กรณี initial fetch

  const encodedTerm = encodeURIComponent(term);
  //ช่วยป้องกัน seachterm พัง เช่น
  // term = "dark souls: remastered"
  // https://api.rawg.io/api/games?search=dark souls: remastered >> พังงง!! ค้นหาไม่เจอ
  // encodedTerm = "dark%20souls%3A%20remastered"
  // https://api.rawg.io/api/games?search=dark%20souls%3A%20remastered

  let url = `${BASE_URL}?key=${API_KEY}&search=${encodedTerm}&page_size=${pageSize}`;

  if (ordering) {
    url += `&ordering=${ordering}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch games");

  const data = await res.json();
  return {
    results: data.results,
    next: data.next,
  };
}

