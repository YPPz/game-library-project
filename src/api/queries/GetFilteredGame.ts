import { API_KEY, BASE_URL } from "../api";
import type { SearchResponse } from "./GetSearchGames";

// ดึงช่วงวันที่ 2 ปีล่าสุด
function getDateRangeForTwoYears(): string {
  const today = new Date();

  const endDate = today.toISOString().split("T")[0]; // YYYY-MM-DD ปัจจุบัน

  const pastDate = new Date(today);
  pastDate.setFullYear(today.getFullYear() - 2); //หยิบปีปัจจุบันเช่น 2025 - 2 > ไป setFullYear ได้ปี 2023 ของ pastDate
  const startDate = pastDate.toISOString().split("T")[0]; // YYYY-MM-DD 2ปีก่อน

  return `${startDate},${endDate}`;
}


async function fetchGames(ordering: string, dates?: string): Promise<SearchResponse> {
  let url = `${BASE_URL}?ordering=${ordering}&page_size=40&key=${API_KEY}`;
  if (dates) {
    url += `&dates=${dates}`;
  }

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch games");

  const data = await res.json();

  return {
    results: data.results,
    next: data.next
  };
}

export async function getTopGame(): Promise<SearchResponse> {
  const today = new Date().toISOString().split("T")[0];
  const dates = `2020-01-01,${today}`; // กรองเกมใหม่
  return await fetchGames("-added,-rating", dates);
}

export async function getNewGame(): Promise<SearchResponse> {
  const dateRange = getDateRangeForTwoYears();
  return await fetchGames("-released", dateRange);
}

export async function getAllGame(): Promise<SearchResponse> {
  return await fetchGames("-added");
}


//ใช้ในหน้า home
export async function getTrendingGame(): Promise<SearchResponse> { //ในช่วง 90 วันล่าสุด
  const today = new Date().toISOString().split("T")[0];
  const past90Days = new Date();
  past90Days.setDate(past90Days.getDate() - 90);
  const start = past90Days.toISOString().split("T")[0];

  return await fetchGames("-added", `${start},${today}`);
}


export async function FilteredGames(type: string | null, url?: string): Promise<SearchResponse> {
  // กรณีโหลดหน้าถัดไป (มี nextUrl)
  if (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch filtered games");
    const data = await res.json();
    return {
      results: data.results,
      next: data.next,
    };
  }

  // โหลดครั้งแรกไม่มี url
  if (!type) throw new Error("Filter type is required");

  switch (type) {
    case "top":
      return await getTopGame();
    case "new":
      return await getNewGame();
    case "all":
      return await getAllGame();
    default:
      // สมมติ type คือ slug ของ genre ให้ fetch ด้วย genres=type
      const fetchUrl = `${BASE_URL}?genres=${type}&key=${API_KEY}&page_size=40`;
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error("Failed to fetch filtered games by genre");
      const data = await res.json();
      return {
        results: data.results,
        next: data.next,
      };
  }
}
