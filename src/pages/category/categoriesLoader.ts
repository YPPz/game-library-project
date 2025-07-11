import { getGameCategory } from "../../api/queries/GetGameCategory";

export async function categoriesLoader() {
    const categories = await getGameCategory();

    return {
        categories,
    }
}
