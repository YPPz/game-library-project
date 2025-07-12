import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import HomeIcon from '../assets/game-controller.png';
import { MenuLink, BurgerMenu } from './MenuButton';

const menuItems = [
  { label: "Top", path: "/filtered/top" },
  { label: "New Releases", path: "/filtered/new" },
  { label: "All Games", path: "/filtered/all" },
  { label: "Categories", path: "/categories" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setActiveLink(label);
    setTimeout(() => setActiveLink(null), 300);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4 flex-wrap">

        {/* Left Side */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap text-xs sm:text-base max-[479px]:gap-0 max-[479px]:text-[10px]">
          {/* Home */}
          <Link to="/" className="relative group shrink-0">
            <img
              src={HomeIcon}
              alt="Home"
              className="w-8 h-8 sm:w-10 sm:h-10 max-[479px]:w-6 max-[479px]:h-6 object-contain"
            />
          </Link>

          {/* MenuLink */}
          {menuItems.map((item) => (
            <MenuLink
              key={item.label}
              label={item.label}
              path={item.path}
              active={activeLink === item.label}
              onClick={() => handleClick(item.label)}
            />
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {/* Search */}
          <div className="flex-1 max-w-md min-w-[120px]">
            <div className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800">
              <SearchInput />
            </div>
          </div>

          {/*Burger Button */}
          <BurgerMenu activeLink={activeLink} onClick={handleClick} />
        </div>
      </div>
    </header>

  );
}