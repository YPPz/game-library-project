import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToWishlist from "../components/AddWishList";
import type { WishlistItem } from "../api/types/WishlistItem"

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    // ดึงข้อมูลจาก localStorage
    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) {
            setWishlist(JSON.parse(stored));
        }
    }, []);

    const handleRemove = (id: number) => {
        const updated = wishlist.filter((game) => game.id !== id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    return (
        <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-800 min-h-screen px-4 sm:px-6 lg:px-8 pt-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Wishlist</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        You can add your favorite games here.
                    </p>

                    <div className="mt-6 space-y-4 border-t border-gray-300 dark:border-gray-700 py-5 sm:px-6 lg:px-8">
                        {wishlist.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">No games in wishlist yet.</p>
                        ) : (
                            wishlist.map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4"
                                >
                                    {/* รูป */}
                                    <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-md border">
                                        <img
                                            src={game.background_image}
                                            alt={game.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* ข้อมูลเกม */}
                                    <div className="flex-1 ml-4">
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {game.name}
                                        </h2>
                                    </div>

                                    {/* ปุ่มฝั่งขวา */}
                                    <div className="flex flex-col items-end gap-2 ml-4">
                                        <Link
                                            to={`/game/${game.id}`}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                        >
                                            View
                                        </Link>
                                        <div onClick={() => handleRemove(game.id)}>
                                            <AddToWishlist
                                                game={game}
                                                forceActive={true} // กำหนดให้โชว์หัวใจแดง
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
