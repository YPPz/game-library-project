import { getTopGame, getTrendingGame, getAllGame } from "../../api/queries/GetFilteredGame";

export async function homeLoader() {
  const [trending, top, all] = await Promise.all([
    getTrendingGame(6),
    getTopGame(15),
    getAllGame()
  ]);

  // Random Suggest = 5 เกมแบบสุ่มจาก all
  const randomSuggest = all.results
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return {
    trending: trending.results,
    top: top.results,
    randomSuggest
  };
}