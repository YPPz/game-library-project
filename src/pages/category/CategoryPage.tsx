import { useLoaderData, Link } from "react-router-dom";
import type { Category } from "../../api/types/Category";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function CategoryPage() {
    const { categories } = useLoaderData() as { categories: Category[] };
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        setInitialLoading(true);
        setTimeout(() => {
            setInitialLoading(false);
        }, 500);
    }, []);

    return (
        <div className='relative'>
            {initialLoading && <LoadingSpinner />}
            <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-screen-xl mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="w-2 h-8 rounded-sm bg-gradient-to-b from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600"></div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize tracking-wide">
                            Game Categories
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/category/${category.slug}`}
                                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
                            >
                                {/* Background Image */}
                                <img
                                    src={category.image_background}
                                    alt={category.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                                {/* Text */}
                                <div className="absolute bottom-0 p-4">
                                    <h2 className="text-lg font-semibold text-white drop-shadow-md">
                                        {category.name}
                                    </h2>
                                    <p className="text-sm text-gray-200 drop-shadow-sm">
                                        {category.games_count.toLocaleString()} games
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


