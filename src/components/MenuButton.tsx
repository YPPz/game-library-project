import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "../assets/menu.png";

type MenuLinkProps = {
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
};
export function MenuLink({ label, path, active, onClick }: MenuLinkProps) {
  return (
    <Link to={path} onClick={onClick}>
      <span
        className={`
          text-sm sm:text-base font-medium px-3 py-1 rounded
          max-[400px]:text-[12px]
          transition-all duration-600 ease-in-out
          text-gray-800 dark:text-gray-200
          ${active ? "bg-gray-200 dark:bg-gray-600" : ""}
        `}
      >
        {label}
      </span>
    </Link>
  );
}



type BurgerMenuProps = {
  activeLink: string | null;
  onClick: (label: string) => void;
};
const menuItems = [
  { label: "History", path: "/history" },
  { label: "Wishlist", path: "/wishlist" },
];
export function BurgerMenu({ activeLink, onClick }: BurgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">

      {/* Burger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`p-2 rounded-md  transition-all duration-300 ease-in-out ${isMenuOpen ? "bg-gray-200 dark:bg-gray-600" : ""}`}>
        <img src={MenuIcon} alt="Menu" className="w-6 h-6 object-contain dark:invert " />
      </button>


      {/* Popup Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 w-fit z-50 p-4 space-y-4">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.path} onClick={() => {
              onClick(item.label);
              setIsMenuOpen(false);
            }}
              className={`block text-right px-2 py-1 rounded text-sm font-medium transition-colors align-end
                ${activeLink === item.label
                  ? "bg-gray-200 dark:bg-gray-700 text-blue-600"
                  : "text-gray-700 dark:text-gray-200 hover:underline"}
              `}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
