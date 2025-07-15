import { useState, useEffect } from "react";
import type { WishlistItem } from "../api/types/WishlistItem";
import { toast } from "react-hot-toast";


interface Props {
  game: WishlistItem;
  forceActive?: boolean;
  onRemove?: () => void;
}

export default function AddToWishlist({ game, forceActive = false, onRemove }: Props) {
  const [isActive, setIsActive] = useState(forceActive);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่าเกมนี้อยู่ใน wishlist หรือยัง
    const wishlist: WishlistItem[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some((item) => item.id === game.id);
    setIsActive(exists);
  }, [game.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist: WishlistItem[] = JSON.parse(localStorage.getItem("wishlist") || "[]");

    let updatedList: WishlistItem[];

    if (isActive) {
      // ลบออก
      updatedList = wishlist.filter((item) => item.id !== game.id);
      toast.error(`Removed "${game.name}" from wishlist ❌`);
      // ✅ เรียก callback ถ้ามี เพื่อบอก parent ให้ลบการ์ด
      if (onRemove) onRemove();

    } else {
      // เพิ่มเข้า
      updatedList = [game, ...wishlist];
      toast.success(`Added "${game.name}" to wishlist ❤️`);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    setIsActive(!isActive);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className="relative ml-4 flex items-center transition-transform duration-150 ease-in-out cursor-pointer"
    >
      <span
        className={`
          text-xl text-gray-700
          transition-all duration-200
          ${isActive ? "opacity-100" : "opacity-20 hover:opacity-70"}
          ${isClicked ? "scale-150" : "scale-100"}
        `}
      >
        ❤️
      </span>
    </button>
  );
}

