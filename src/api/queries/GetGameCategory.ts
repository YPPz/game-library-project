import type { Category } from "../types/Category";
import type { SearchResponse } from "./GetSearchGames";
import { API_KEY, BASE_URL } from "../api";

//In this project, we use category as genre.

export async function getGameCategory(): Promise<Category[]> {
    const res = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    //console.log(data.results)

    return data.results as Category[];
}

export async function getGameByCate(genres: string): Promise<SearchResponse> {
    const res = await fetch(`${BASE_URL}?genres=${genres}&key=${API_KEY}`); 
    if (!res.ok) throw new Error("Failed to fetch games by category");

    const data = await res.json();
    // console.log(data)

    return data as SearchResponse;
}
