import { getTopGame, getTrendingGame, getAllGame } from "../../api/queries/GetFilteredGame";

export async function homeLoader() {
  const [trending, top, all] = await Promise.all([
    getTrendingGame(),
    getTopGame(),
    getAllGame()
  ]);

  // Random Suggest = 5 เกมแบบสุ่มจาก all
  const randomSuggest = all.results
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return {
    trending: trending.results.slice(0, 6),
    top: top.results.slice(0, 15),
    randomSuggest
  };
}
