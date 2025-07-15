import { API_KEY, BASE_URL } from "../api";
import type { SearchResponse } from "./GetSearchGames";
import { GameOrdering } from "../types/GameOrdering";

async function fetchGames(ordering: string[], dates?: Date[], pageSize: number = 40): Promise<SearchResponse> {
  let url = `${BASE_URL}?ordering=${ordering}&page_size=${pageSize}&key=${API_KEY}`;

  if (dates && dates.length === 2) {
    const dateStr = dates.map((d) => d.toISOString().split("T")[0]).join(",");
    // แปลง Date[] เป็น string ในรูปแบบ "YYYY-MM-DD,YYYY-MM-DD"
    url += `&dates=${dateStr}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch games");
  const data = await res.json();

  // console.log("final ordering is", ordering);
  // console.log("[fetchGames] url:", url); // ✅ เช็ค url ที่ fetch ข้อมูล

  return {
    results: data.results,
    next: data.next,
  };
}

// --- API functions by category ---
export async function getTopGame(pageSize: number = 40): Promise<SearchResponse> {
  const today = new Date();
  const past5Years = new Date();
  past5Years.setFullYear(today.getFullYear() - 5);
  return await fetchGames([GameOrdering.AddedDesc], [past5Years, today], pageSize);
}

export async function getNewGame(pageSize: number = 40): Promise<SearchResponse> {
  const today = new Date();
  const past2Years = new Date(today);
  past2Years.setFullYear(today.getFullYear() - 2);
  return await fetchGames([GameOrdering.ReleasedDesc], [past2Years, today], pageSize);
}

export async function getAllGame(pageSize: number = 40): Promise<SearchResponse> {
  return await fetchGames([GameOrdering.MetacriticDesc], undefined, pageSize);
}

export async function getTrendingGame(pageSize: number = 40): Promise<SearchResponse> {
  const today = new Date();
  const past90Days = new Date();
  past90Days.setDate(past90Days.getDate() - 90);
  return await fetchGames([GameOrdering.AddedDesc], [past90Days, today], pageSize);
}

// --- Fetch Load more function ---
export async function loadMoreFilteredGames(type: string, url?: string, pageSize: number = 40, ordering?: string): Promise<SearchResponse> {
  async function getGameByGenreSlug(slug: string, pageSize: number, ordering?: string): Promise<SearchResponse> {
    let url = `${BASE_URL}?key=${API_KEY}&page_size=${pageSize}&genres=${slug}`;
    if (ordering) url += `&ordering=${ordering}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch games by genre");
    const data = await res.json();
    return { results: data.results, next: data.next };
  }

  //ถ้ามี nextURL
  if (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch next page");
    const data = await res.json();

    // console.log("[loadMoreFilteredGames] finalUrl:", url);
    return { results: data.results, next: data.next };
  }

  switch (type) {
    case "top":
      return await getTopGame(pageSize);
    case "new":
      return await getNewGame(pageSize);
    case "all":
      return await getAllGame(pageSize);
    case "trending":
      return await getTrendingGame(pageSize);
    default:
      return await getGameByGenreSlug(type, pageSize, ordering); // ✅ เรียก function ที่แยกไว้
  }
}