import type { GameDetails } from "../types/GameDetails";
import { API_KEY, BASE_URL } from "../api";

export async function getGameDetails(id: string): Promise<GameDetails> {
    if (!API_KEY) throw new Error("API key is missing");
    const res = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`)
    if (!res.ok) throw new Error("Failed to fetch games");

    const data = await res.json();

    if (typeof data.id === "string") {
        data.id = Number(data.id);
    }
    // console.log(data)
    return data as GameDetails;
}

export async function getGameScreenshots(id: string) {
    if (!API_KEY) throw new Error("API key is missing");
    
    const res = await fetch(`${BASE_URL}/${id}/screenshots?key=${API_KEY}`);
    // console.log("Fetching screenshots from:", res);
    if (!res.ok) throw new Error("Failed to fetch screenshots");
    const data = await res.json();

    return data.results;
}

