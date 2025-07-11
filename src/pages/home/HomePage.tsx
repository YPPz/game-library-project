import { useLoaderData } from "react-router-dom";
import type { SearchSummary } from "../../api/types/SearchSummary";
import { HomeTrendCard, HomeTopCard, HomeRandomCard } from "../../components/HomePageCard";
import logo from '../../assets/myICON_WE_2025 ver.nobg.png'

interface HomeData {
    trending: SearchSummary[];
    top: SearchSummary[];
    randomSuggest: SearchSummary[];
};

export default function HomePage() {
    const { trending, top, randomSuggest } = useLoaderData() as HomeData;

    return (
        <div className='relative'>
            <div className="bg-gray-100 dark:bg-gray-800 min-h-screen px-4 sm:px-6 lg:px-8 pt-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 p-6">

                    {/* Welcome Message */}
                    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-md border border-gray-100 dark:border-gray-700  transition-colors duration-300">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                            Discover Your Next Favorite Game
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                            Explore the best games across every platform. Curated lists, real-time ratings, and more await you.
                        </p>
                    </header>

                    <section>
                        <HomeTrendCard games={trending} />
                    </section>

                    <section>
                        <HomeTopCard games={top} />
                    </section>

                    <section>
                        <HomeRandomCard games={randomSuggest} />
                    </section>

                </div>

                <footer className="mt-10 border-t border-gray-300 dark:border-gray-700 py-5 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between gap-4 text-center md:text-left">
                        
                        <div className="flex items-center justify-center">
                            <img
                                src={logo}
                                alt="Site Logo"
                                className="h-10 w-auto dark:invert rounded"
                            />
                        </div>
                       
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-x-3">
                            <span>&copy; 2025 Ektasaeng_W</span>
                            <span>All rights reserved.</span>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    );
}

