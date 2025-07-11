import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bin from '../assets/bin.png'

interface GameHistoryItem {
    id: number;
    name: string;
    viewedAt: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<GameHistoryItem[]>([]);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("game_history") || "[]");
        setHistory(data);
    }, []);



    const handleDelete = (id: number) => {
        setDeletingId(id);  // เริ่ม animation การลบ

        setTimeout(() => {
            const updated = history.filter(item => item.id !== id);
            setHistory(updated);
            localStorage.setItem("game_history", JSON.stringify(updated));
            setDeletingId(null); // ลบสถานะกำลังลบออก
        }, 300);
    };

    return (
        <div className='relative'>
            <div className="bg-gray-100 dark:bg-gray-800 min-h-screen px-4 sm:px-6 lg:px-8 pt-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Watch History</h1>
                    <p className="mt-4 mb-2 text-gray-600 dark:text-gray-400">Recently viewed games will appear here.</p>
                    {history.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 mt-5 border-t border-gray-300 dark:border-gray-700 py-5 px-4 sm:px-6 lg:px-8">No history found.</p>
                    ) : (
                        <ul className="space-y-3">
                            {history.map((item) => (
                                <li key={item.id} className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                                    <div>
                                        <Link
                                            to={`/game/${item.id}`}
                                            className="text-gray-800 dark:text-white hover:underline font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Viewed on {new Date(item.viewedAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deletingId === item.id}
                                        className={`transition-all duration-300 flex items-center justify-center cursor-pointer ${deletingId === item.id
                                                ? "animate-pulse opacity-70"
                                                : "hover:opacity-80"
                                            }`}
                                        aria-label={`Delete ${item.name} from history`}
                                    >
                                        <img
                                            src={bin}
                                            alt="Delete icon"
                                            className={`w-6 h-6 dark:invert ${deletingId === item.id ? "filter brightness-75" : ""}`}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}


