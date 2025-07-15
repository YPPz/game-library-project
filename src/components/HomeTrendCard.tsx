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