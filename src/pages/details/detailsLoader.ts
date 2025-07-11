import type { GameDetails } from "../../api/types/GameDetails";
import type { Params } from "react-router-dom";
import { getGameDetails } from "../../api/queries/GetGameDetails"

interface LoaderAgrs {
    params: Params;
}

export interface DetailLoaderResult {
    details: GameDetails;
}

export async function detailsLoader({ params }: LoaderAgrs): Promise<DetailLoaderResult> {
    const { id } = params;

    if (!id) {
        throw new Error("Game's ID must be provided!")
    }

    const details = await getGameDetails(id)
    return {
        details: details
    }
}

