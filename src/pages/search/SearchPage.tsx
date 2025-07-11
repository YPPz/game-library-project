import { useLoaderData, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import type { SearchLoaderResult } from "./searchLoader";
import GameCardList from "../../components/GameCardList";
import { SearchGames } from "../../api/queries/GetSearchGames";
import LoadingSpinner from "../../components/LoadingSpinner";
import OrderBy from "../../components/OrderBy";
import type { OrderOption } from "../../api/types/OrderOption";

export default function SearchPage() {
    const data = useLoaderData() as SearchLoaderResult;
    const currentURL = useLocation();

    const [games, setGames] = useState(data.searchResults);
    const [nextUrl, setNextUrl] = useState<string | null>(data.next);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [orderBy, setOrderBy] = useState<OrderOption>("popularity");



    useEffect(() => {
        setInitialLoading(true);
        setGames(data.searchResults);
        setNextUrl(data.next);
        setTimeout(() => {
            setInitialLoading(false);
        }, 500);
    }, [currentURL.search, data.searchResults, data.next]);

    const handleLoadMore = async () => {
        if (!nextUrl) return;

        setIsLoading(true);
        const { results, next } = await SearchGames(data.term, nextUrl);
        setGames((prev) => [...prev, ...results]);
        setNextUrl(next);
        setIsLoading(false);
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
            <div className="bg-gray-100 dark:bg-gray-800 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-md w-fit mx-auto whitespace-nowrap">
                        Search Results
                    </h1>

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
                            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center">
                               {renderGame}
                            </div>

                            {nextUrl && (
                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={isLoading}
                                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition disabled:opacity-50"
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