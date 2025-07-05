import React, { useState } from 'react';

const distanceOptions = ['1 mile', '5 miles', '10 miles', '25 miles', '50 miles'];

const MapDistanceFilter = () => {
  const [selected, setSelected] = useState<string | null>('10 miles');
  const [isLoading, setIsLoading] = useState(false);

  const handleMileSelection = async (option: string) => {
    const previousSelection = selected;
    setSelected(option);
    
    try {
      setIsLoading(true);
      
      // Extract numeric value (remove " miles" text)
      const milesValue = parseInt(option);
      
      // Added API call to your backend
      const response = await fetch('/api/ticketmaster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          distance: milesValue,
          unit: 'miles'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update distance filter');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating distance:', error);
      // Revert on error
      setSelected(previousSelection);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-sm mx-auto md:mx-0 md:max-w-none dark:bg-[#262626] bg-[#F5F5F4] p-4 z-[1000]">
      <h6 className="text-lg font-bold mb-4">
        Filter by Distance
        {isLoading && (
          <span className="ml-2 text-sm text-gray-500">(Updating...)</span>
        )}
      </h6>

      <ul className="flex gap-3 my-4 flex-wrap justify-center md:justify-start text-sm md:text-base">
        {distanceOptions.map((option) => (
          <li
            key={option}
            className={`
              px-4 py-1 rounded-[30px] cursor-pointer select-none transition
              ${selected === option
                ? 'bg-purple-800 dark:bg-purple-600 text-white outline outline-purple-500 dark:outline-purple-600'
                : 'bg-gray-100 dark:bg-[#3A3A3A] dark:text-gray-300 text-gray-800 hover:shadow hover:shadow-purple-500 hover:outline hover:outline-purple-600'
              }
            `}
            onClick={() => handleMileSelection(option)}
            role="button"
            aria-pressed={selected === option}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMileSelection(option);
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>

      {selected && (
        <p className="mt-2 text-center md:text-left text-sm text-gray-700 dark:text-gray-300">
          Showing events within <strong>{selected}</strong>
          {isLoading && '...'}
        </p>
      )}
    </section>
  );
};

export default MapDistanceFilter;