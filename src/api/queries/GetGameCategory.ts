import type { Category } from "../types/Category";
import { API_KEY } from "../api";

//In this project, we use category as genre.

export async function getGameCategory(): Promise<Category[]> {
    const res = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    //console.log(data.results)

    return data.results as Category[];
}
