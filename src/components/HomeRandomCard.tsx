import type { SearchSummary } from "../api/types/SearchSummary";
import { Link } from "react-router-dom";

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