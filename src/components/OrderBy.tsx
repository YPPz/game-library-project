import React from 'react';
import type { OrderOption } from '../api/types/OrderOption';

interface OrderByProps {
  value: OrderOption;
  onSortChange: (orderBy: OrderOption) => void;
}

const OrderBy: React.FC<OrderByProps> = ({ value, onSortChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
      <label htmlFor="order" className="text-gray-800 dark:text-gray-200 font-medium">
        Sort by:
      </label>
      <select
        id="order"
        value={value}
        onChange={(e) => onSortChange(e.target.value as OrderOption)}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
      >
        <option value="name">Name (A-Z)</option>
        <option value="released">Release Date</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default OrderBy;
