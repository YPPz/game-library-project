import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SearchSummary } from "../../api/types/SearchSummary";
import GameCardList from "../../components/GameCardList";
import LoadingSpinner from "../../components/LoadingSpinner";
import SortBy from "../../components/SortBy";
import type { SortOption } from "../../api/types/GameOrdering";
import { loadMoreFilteredGames } from "../../api/queries/GetFilteredGame";
import { fetchSortedFilteredGames } from "../../api/queries/FetchSortedGames";

export default function FilteredPage() {
  const currentURL = useLocation();
  const { type, slug } = useParams();
  const isCategoryPage = !!slug;
  const title = type || slug || "all";

  const [games, setGames] = useState<SearchSummary[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      setGames([]);        // ✅ reset list ก่อนโหลดใหม่
      setNextUrl(null);    // ✅ reset next url
      try {
        const { results, next } = await fetchSortedFilteredGames(title, sortBy);
        setGames(results);
        setNextUrl(next);
      } catch (error) {
        console.error("Failed to fetch filtered games:", error);
      } finally {
        setTimeout(() => setInitialLoading(false), 500);
      }
    };

    if (!isCategoryPage && sortBy !== "popularity") return;
    fetchData();
  }, [title, sortBy, currentURL.search]);

  const handleLoadMore = async () => {
    if (!nextUrl || !title) return;
    setIsLoading(true);
    try {
      const { results, next } = await loadMoreFilteredGames(title, nextUrl);
      setGames((prev) => [...prev, ...results]);
      setNextUrl(next);
    } catch (error) {
      console.error("Error loading more games:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

          {isCategoryPage && (
            <div className="mb-6">
              <SortBy value={sortBy} onSortChange={setSortBy} />
            </div>
          )}

          {!initialLoading && games.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-600 text-lg dark:text-gray-400">
                😢 No games found.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {games.map((game) => (
                  <GameCardList key={game.id} game={game} />
                ))}
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
