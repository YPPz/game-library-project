import { getAllGame, getNewGame, getTopGame, getTrendingGame } from "../../api/queries/GetFilteredGame";
import type { SearchSummary } from "../../api/types/SearchSummary";
import { getGameByCate } from "../../api/queries/GetGameCategory";
import type { LoaderFunctionArgs } from "react-router-dom";


export interface FilterLoaderResult {
    searchResults: SearchSummary[];
    next: string | null;
}

// type LoaderFunctionArgs = {
//   request: Request;
//   params: Params<string>;
//   context?: any;
// };

export async function filterLoader({ params }: { params: { type?: string } }): Promise<FilterLoaderResult> {
    const type = params.type;
    let results: SearchSummary[] = [];
    let next: string | null = null;

    if (type === "top") {
        const res = await getTopGame();
        results = res.results;
        next = res.next;
    } else if (type === "new") {
        const res = await getNewGame();
        results = res.results;
        next = res.next;
    } else if (type === "all") {
        const res = await getAllGame();
        results = res.results;
        next = res.next;
    } else if (type === "trending") {
        const res = await getTrendingGame();
        results = res.results;
        next = res.next;
    } else {
        throw new Error("Invalid filter type");
    }

    return {
        searchResults: results,
        next,
    };
}

// export async function filterLoader({ params }: { params: { type?: string } }): Promise<FilterLoaderResult> {
//   const type = params.type;

//   const fetchMap = {
//     top: getTopGame,
//     new: getNewGame,
//     all: getAllGame,
//     trending: getTrendingGame,
//   } as const;

//   const fetchFn = fetchMap[type as keyof typeof fetchMap];
//   if (!fetchFn) throw new Error("Invalid filter type");

//   const { results, next } = await fetchFn();
//   return { searchResults: results, next };
// }

export async function categoryGameLoader({ params }: { params: { slug?: string } }) {
    const slug = params.slug;
    if (!slug) throw new Error("No category slug provided");

    const data = await getGameByCate(slug);
    return {
        searchResults: data.results,
        next: data.next
    };
}

