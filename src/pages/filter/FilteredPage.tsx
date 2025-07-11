import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FilterLoaderResult } from "./filterLoader";
import GameCardList from "../../components/GameCardList";
import { FilteredGames } from "../../api/queries/GetFilteredGame";
import LoadingSpinner from "../../components/LoadingSpinner";
import OrderBy from "../../components/OrderBy";
import type { OrderOption } from "../../api/types/OrderOption";

export default function FilteredPage() {
  const data = useLoaderData() as FilterLoaderResult;

  const { type, slug } = useParams();
  const title = type || slug || "Games"; //แบบย่อจากข้างล่าง
  // title = "Games";
  //    if (type) {title = type;} 
  //    else if (slug) {title = slug;}

  const [games, setGames] = useState(data.searchResults);//หน้าแรกที่ fetch มา
  const [nextUrl, setNextUrl] = useState<string | null>(data.next);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<OrderOption>("popularity");

  useEffect(() => {
    setInitialLoading(true);//เปิด LoadingSpinner
    setGames(data.searchResults);
    setNextUrl(data.next);
    setTimeout(() => {
      setInitialLoading(false); //ปิด LoadingSpinner
    }, 500);
  }, [title, data.searchResults, data.next]);


  const handleLoadMore = async () => {
    if (!nextUrl || !title) return;

    setIsLoading(true);
    try {
      const { results, next } = await FilteredGames(title, nextUrl);
      // console.log("Loaded results:", results.length, "Next URL:", next);
      setGames((prev) => [...prev, ...results]);
      setNextUrl(next);
    }
    catch (error) {
      console.error("Error loading more games:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const sortedGames = [...games].sort((a, b) => {
    if (orderBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (orderBy === "released") {
      return new Date(b.released || "").getTime() - new Date(a.released || "").getTime();
    }
    if (orderBy === "popularity") {
      const scoreA = (a.rating || 0) + (a.rating_top || 0) + (a.added || 0);
      const scoreB = (b.rating || 0) + (b.rating_top || 0) + (b.added || 0);
      return scoreB - scoreA;
    }
    return 0;
  });

  const renderGame = sortedGames.map((game) => (
    <GameCardList key={game.id} game={game} />
  ));


  return (
    <div className='relative'>
      {initialLoading && <LoadingSpinner />}
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-screen-xl mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">

          <div className="mb-8 flex items-center gap-4">
            <div className="w-2 h-8 bg-blue-600 rounded-sm"></div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize tracking-wide">
              {title} Games
            </h1>
          </div>

          <div className="mb-6">
            <OrderBy value={orderBy} onSortChange={setOrderBy} />
          </div>

          {games.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-600 text-lg dark:text-gray-400">
                😢 No games found.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {renderGame}
              </div>

              {nextUrl && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-8 py-3 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}