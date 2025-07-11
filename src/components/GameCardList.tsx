import type { SearchSummary } from "../api/types/SearchSummary";
import { Link } from 'react-router-dom';
import AddToWishlist from "./AddWishList";

interface GameCardListProps {
  game: SearchSummary;
}

export default function GameCardList({ game }: GameCardListProps) {
  // Platform
  const renderPlatform = (
    <div className="flex gap-2 flex-wrap">
      {game.platforms?.map((p) => (
        <span
          key={p.platform.name}
          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded"
          >
          {p.platform.name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg hover:scale-105 transition-transform duration-200 ease-in-out overflow-hidden relative group">
      <Link to={`/game/${game.id}`} className='hover:cursor-pointer'>
        {/* รูปเกม */}
        <div className="relative">
          <img
            className="object-cover w-full h-60 md:h-64 lg:h-72 group-hover:scale-105 transition-transform duration-300"
            src={game.background_image}
            alt={game.name}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition" />
        </div>

        {/* ข้อมูล */}
        <div className="px-5 pt-4">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {game.name}
          </h5>
        </div>
      </Link>

      <div className="px-5 pb-4 pt-1 flex items-center justify-between">
        <span className="text-sm text-yellow-500">⭐ {game.rating} / 5</span>

        <div className="relative z-10">
          <AddToWishlist
            game={{
              id: game.id,
              name: game.name,
              background_image: game.background_image,
            }}
          />
        </div>
      </div>

      {/* Platform */}
      <div className="px-5 pb-4">{renderPlatform}</div>
    </div>
  );
}
