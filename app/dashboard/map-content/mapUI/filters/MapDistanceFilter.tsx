import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked?: boolean;
  icon?: string;
}

const MapDistanceFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOption[]>([
    { id: 'concerts', label: 'Concerts', count: 56, icon: '🎵' },
    { id: 'sports', label: 'Sports', count: 42, icon: '⚽' },
    { id: 'arts', label: 'Arts/Theater', count: 35, icon: '🎭', checked: true },
    { id: 'food', label: 'Food/Drink', count: 28, icon: '🍽️' },
    { id: 'free', label: 'Free Events', count: 89, checked: true },
    { id: 'under20', label: 'Under $20', count: 76 },
    { id: 'under50', label: 'Under $50', count: 63 },
  ]);

  const toggleFilter = (id: string) => {
    setFilters(filters.map(filter =>
      filter.id === id ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  return (
    <section className="absolute top-0 my-25 left-1/2 sm:left-4 z-10 w-[90vw] sm:w-[350px] -translate-x-1/2 sm:translate-x-0 rounded-lg">
      <div className="flex items-center justify-center p-4">
        <button
          className="text-white bg-purple-600 dark:bg-purple-800 dark:hover:bg-purple-600 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter by distance
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className="absolute z-10 mt-2 w-56 p-3 dark:bg-[#262626] bg-[#F5F5F4] rounded-lg shadow-lg">
              <h6 className="mb-3 text-sm font-medium dark:text-white text-gray-900">
                Distance Filters
              </h6>
              <ul className="space-y-2 text-sm">
                {filters.map((filter) => (
                  <li key={filter.id} className="flex items-center">
                    <input
                      id={filter.id}
                      type="checkbox"
                      checked={filter.checked || false}
                      onChange={() => toggleFilter(filter.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={filter.id} className="ml-2 font-medium dark:text-white text-gray-900">
                      {filter.icon && <span className="mr-2">{filter.icon}</span>}
                      {filter.label} <span className="dark:text-white">({filter.count})</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t">
                <button
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </section>
  );
};

export default MapDistanceFilter;