import { Toaster } from 'react-hot-toast';
import Root from './pages/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { homeLoader } from './pages/home/homeLoader';
import SearchPage from './pages/search/SearchPage'
import { searchLoader } from './pages/search/searchLoader';
import FilteredPage from './pages/filter/FilteredPage';
import { filterLoader, categoryGameLoader } from './pages/filter/filterLoader';
import GameDetailPage from './pages/details/GameDetailPage';
import { detailsLoader } from './pages/details/detailsLoader'
import CategoryPage from './pages/category/CategoryPage';
import { categoriesLoader } from './pages/category/categoriesLoader';
import WishlistPage from './pages/WishlistPage';
import HistoryPage from './pages/HistoryPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader
      },
      {
        path: '/game/:id',
        element: <GameDetailPage />,
        loader: detailsLoader
      },
      {
        path: '/search',
        element: <SearchPage />,
        loader: searchLoader
      },
      {
        path: '/filtered/:type',
        element: <FilteredPage />,
        loader: filterLoader
      },
      {
        path: '/categories',
        element: <CategoryPage />,
        loader: categoriesLoader
      },
      {
        path: "/category/:slug", 
        element: <FilteredPage />,
        loader: categoryGameLoader,
      },
      {
        path: '/wishlist',
        element: <WishlistPage/>,
      },
      {
        path: '/history',
        element: <HistoryPage/>,
      },
    ]
  }
])


function App() {

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#3b3939] dark:text-white transition-colors duration-300">
      <Toaster position="bottom-center"/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

