import { useLoaderData } from "react-router-dom";
import type { DetailLoaderResult } from "./detailsLoader";
import { useEffect, useState } from "react";
import { getGameScreenshots } from "../../api/queries/GetGameDetails";
import AddToWishlist from "../../components/AddWishList";

const MAX_HISTORY = 50;

function saveToHistory(game: { id: number; name: string }) {
    const existing = JSON.parse(localStorage.getItem("game_history") || "[]");

    const filtered = existing.filter((item: { id: number }) => item.id !== game.id);

    const newHistory = [{ ...game, viewedAt: new Date().toISOString() }, ...filtered];

    const trimmed = newHistory.slice(0, MAX_HISTORY);

    localStorage.setItem("game_history", JSON.stringify(trimmed));
}

export default function GameDetailPage() {
    const { details } = useLoaderData() as DetailLoaderResult;

    const [screenshots, setScreenshots] = useState<{ id: number; image: string }[]>([]);
    const [mainImage, setMainImage] = useState(details.background_image);

    useEffect(() => {
        async function fetchScreenshots() {
            try {
                const data = await getGameScreenshots(details.id);
                setScreenshots(data);
            } catch (error) {
                console.error("Failed to fetch screenshots:", error);
            }
        }

        fetchScreenshots();
    }, [details.id]);


    useEffect(() => {
        if (details?.id && details?.name) {
            saveToHistory({ id: Number(details.id), name: details.name });
        }
    }, [details.id]);

    return (
        <div className='relative'>
            <div className="px-4 sm:px-8 lg:px-16 py-8 max-w-screen-xl mx-auto space-y-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-screen-xl mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                    {/* Title */}
                    <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
                        {details.name}
                    </h1>

                    {/* Meta Info Section */}
                    <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 mb-6 lg:mx-10 xl:mx-20">
                        {/* Row 1: Release, Rating, Wishlist */}
                        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
                            <div className="flex flex-wrap items-center gap-3 flex-grow">
                                {/* Release Date */}
                                <span className="px-1.5 py-1.5 md:px-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm text-sm max-[479px]:text-xs">
                                    📅 Released: {details.released}
                                </span>

                                {/* Rating */}
                                <span className="px-1.5 py-1.5 md:px-4 bg-yellow-100 text-yellow-800 rounded-md shadow-sm text-sm max-[479px]:text-xs">
                                    ⭐ Rating: {details.rating}
                                </span>
                            </div>

                            {/* Wishlist */}
                            <div className="flex justify-end">
                                <AddToWishlist
                                    game={{
                                        id: Number(details.id),
                                        name: details.name,
                                        background_image: details.background_image,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Row 2: Platforms */}
                        <div className="flex flex-wrap justify-start gap-2 mt-2">
                            {details.platforms.map((p) => (
                                <span
                                    key={p.platform.name}
                                    className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-800 dark:text-gray-100"
                                >
                                    🎮 {p.platform.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Main Image & Screenshots */}
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-2">
                        {/* Main Image */}
                        <div className="w-full lg:w-3/4">
                            <img
                                src={mainImage}
                                alt={details.name}
                                className="max-w-full max-h-[500px] object-cover rounded-xl shadow-lg mx-auto"
                            />

                            {/* Mobile thumbnails */}
                            <div className="flex gap-4 mt-4 overflow-x-auto lg:hidden justify-center">
                                {details.background_image && (
                                    <img
                                        key="main-image"
                                        src={details.background_image}
                                        alt="main screenshot"
                                        className={`w-24 h-24 min-w-[96px] object-cover rounded-md border cursor-pointer ${mainImage === details.background_image ? "border-blue-500" : ""
                                            }`}
                                        onClick={() => setMainImage(details.background_image)}
                                    />
                                )}
                                {screenshots.map((s) => (
                                    <img
                                        key={s.id}
                                        src={s.image}
                                        alt="screenshot"
                                        className={`w-24 h-24 min-w-[96px] object-cover rounded-md border cursor-pointer hover:opacity-80 ${mainImage === s.image ? "border-blue-500" : ""
                                            }`}
                                        onClick={() => setMainImage(s.image)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop thumbnails */}
                        {screenshots.length > 0 && (
                            <div className="hidden lg:flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 items-center">
                                {details.background_image && (
                                    <img
                                        key="main-image"
                                        src={details.background_image}
                                        alt="main screenshot"
                                        className={`w-24 h-24 object-cover rounded-md border cursor-pointer ${mainImage === details.background_image ? "border-blue-500" : ""
                                            }`}
                                        onClick={() => setMainImage(details.background_image)}
                                    />
                                )}
                                {screenshots.map((s) => (
                                    <img
                                        key={s.id}
                                        src={s.image}
                                        alt="screenshot"
                                        className={`w-24 h-24 object-cover rounded-md border cursor-pointer hover:opacity-80 ${mainImage === s.image ? "border-blue-500" : ""
                                            }`}
                                        onClick={() => setMainImage(s.image)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Genres & Tags */}
                    {(details.genres?.length > 0 || details.tags?.length > 0) && (
                        <div className="flex flex-wrap gap-2 justify-center items-center mb-3 px-2 overflow-x-auto scrollbar-thin lg:justify-start lg:ml-10 xl:ml-20">
                            {/* Genres */}
                            {details.genres.map((genre) => (
                                <span
                                    key={`genre-${genre.id}`}
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-800 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap"
                                >
                                    {genre.name}
                                </span>
                            ))}

                            {/* Tags (ขนาดเล็กลง) */}
                            {details.tags.slice(0, 6).map((tag) => (
                                <span
                                    key={`tag-${tag.id}`}
                                    className="flex items-center justify-center bg-emerald-50  text-emerald-800 text-[11px] font-medium px-2 h-[22px] rounded-full whitespace-nowrap"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div
                        className="prose max-w-none text-gray-800 dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: details.description }}
                    />
                </div>
            </div>
        </div>
    );
}

