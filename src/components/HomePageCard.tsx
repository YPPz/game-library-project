import { useEffect, useState } from "react";
import type { SearchSummary } from "../api/types/SearchSummary";
import { Link } from "react-router-dom";

export function HomeTrendCard({ games }: { games: SearchSummary[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 30000);
        return () => clearInterval(interval);
    }, [games.length]);

    return (
        <section className="relative w-full mt-10">
            <div className='relative flex items-center justify-between'>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Trending Games
                </h2>
                <a href="/filtered/trending" className="text-sm bottom-0 right-0 font-medium text-gray-400 hover:underline hover:text-gray-700 dark:hover:text-white transition-colors duration-200">
                    See More →
                </a>
            </div>


            <div className="relative h-auto md:h-[36rem]">
                {games.map((_, index) => {
                    const currentGames = [
                        games[index],
                        games[(index + 1) % games.length],
                        games[(index + 2) % games.length],
                    ];

                    return (
                        <div
                            key={index}
                            className={`inset-0 transition-opacity duration-1000 ease-in-out
                                ${index === currentIndex
                                    ? "opacity-100 relative"
                                    : "opacity-0 pointer-events-none absolute"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row rounded-lg overflow-hidden gap-4 px-4 h-auto md:h-[36rem]">
                                {/* Left large image */}
                                <Link
                                    to={`/game/${currentGames[0].id}`}
                                    className="w-full md:w-[70%] aspect-video md:aspect-auto md:h-full relative group overflow-hidden rounded-lg"
                                >
                                    <img
                                        src={currentGames[0].background_image}
                                        alt={currentGames[0].name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 dark:bg-black/70 text-white p-4 text-lg font-semibold">
                                        {currentGames[0].name}
                                    </div>
                                </Link>

                                {/* Right two small images */}
                                <div className="w-full flex flex-row md:flex-col gap-4 md:h-full md:w-[30%]">
                                    {[1, 2].map((i) => (
                                        <Link
                                            key={i}
                                            to={`/game/${currentGames[i].id}`}
                                            className="w-1/2 md:w-full aspect-video md:h-1/2 relative group overflow-hidden rounded-lg"
                                        >
                                            <img
                                                src={currentGames[i].background_image}
                                                alt={currentGames[i].name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 dark:bg-black/70 text-white px-3 py-2 text-sm font-medium">
                                                {currentGames[i].name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function HomeTopCard({ games }: { games: SearchSummary[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides: SearchSummary[][] = [];
    for (let i = 0; i < 15; i += 3) {
        slides.push(games.slice(i, i + 3));
    }//slide = [[1,2,3] , [4,5,6] , [7,8,9] , [10,11,12] , [13,14,15]]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 20000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="relative w-full mt-10">
            <div className='relative flex items-center justify-between'>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Top Games
                </h2>
                <a href="/filtered/top" className="text-sm bottom-0 right-0 font-medium z-20 text-gray-400 hover:underline hover:text-gray-700 dark:hover:text-white transition-colors duration-200">
                    See More →
                </a>
            </div>

            <div className="relative overflow-hidden rounded-lg">
                {slides.map((group, idx) => (
                    <div
                        key={idx}
                        className={`transition-opacity duration-1000 ease-in-out 
                            ${idx === currentIndex
                                ? "opacity-100 relative"
                                : "opacity-0 pointer-events-none absolute"
                            }`}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-4">
                            {group.map((game) => (
                                <Link
                                    key={game.id}
                                    to={`/game/${game.id}`}
                                    className="w-full bg-white dark:bg-gray-900 rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out overflow-hidden relative group shadow"
                                >
                                    {/* รูปเกม */}
                                    <div className="relative">
                                        <img
                                            className="object-cover w-full h-48 sm:h-56 md:h-60 lg:h-72 group-hover:scale-105 transition-transform duration-300"
                                            src={game.background_image}
                                            alt={game.name}
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition" />
                                    </div>

                                    {/* ชื่อเกม */}
                                    <div className="px-4 py-3">
                                        <h5 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                            {game.name}
                                        </h5>

                                        {/* Rating */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-yellow-500">
                                                ⭐ {game.rating.toFixed(1)} / 5
                                            </span>
                                            <div className="opacity-20 hover:opacity-100 transition-opacity duration-200">
                                                {/* <AddToWishlist /> */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center space-x-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-black dark:bg-white" : "bg-gray-500"}`}
                    />
                ))}
            </div>

            {/* Controls */}
            <button
                title="Previous Slide"
                onClick={() =>
                    setCurrentIndex((prev) =>
                        prev === 0 ? slides.length - 1 : prev - 1
                    )
                }
                className="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                </span>
            </button>

            <button
                title="Next Slide"
                onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % slides.length)
                }
                className="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                </span>
            </button>
        </section>
    );
}

export function HomeRandomCard({ games }: { games: SearchSummary[] }) {
    return (
        <section className="relative w-full mt-10 mx-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Random Game Suggestions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {games.map((game) => (
                    <Link
                        to={`/game/${game.id}`}
                        key={game.id}
                        className="flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                    >
                        <div className="w-full aspect-video overflow-hidden rounded shadow">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-full object-cover scale-95 hover:scale-100 transition-transform duration-300"
                            />
                        </div>
                        <span className="text-xs mt-2 text-gray-700 dark:text-gray-300 line-clamp-2">
                            {game.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}