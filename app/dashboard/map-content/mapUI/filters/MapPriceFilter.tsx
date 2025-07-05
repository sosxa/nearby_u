'use client';
import { useState, useEffect, useRef } from 'react';

type PricePreset = {
  label: string;
  min: number;
  max: number;
};

const MapPriceFilter = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(400);
  const minRangeRef = useRef<HTMLInputElement>(null);
  const maxRangeRef = useRef<HTMLInputElement>(null);
  const rangeTrackRef = useRef<HTMLDivElement>(null);
  const minGap = 10;

  const pricePresets: PricePreset[] = [
    { label: 'Free', min: 0, max: 0 },
    { label: 'Under $20', min: 0, max: 20 },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 to $100', min: 50, max: 100 }
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateRangeVisual();
  }, [minValue, maxValue]);

  const updateRangeVisual = () => {
    if (!rangeTrackRef.current) return;
    const minPercent = (minValue / 400) * 100;
    const maxPercent = (maxValue / 400) * 100;
    rangeTrackRef.current.style.left = `${minPercent}%`;
    rangeTrackRef.current.style.right = `${100 - maxPercent}%`;
  };

  const handleSliderChange = (isMin: boolean, value: number) => {
    if (isMin) {
      const newMin = Math.min(value, maxValue - minGap);
      setMinValue(newMin);
      if (minRangeRef.current) minRangeRef.current.value = newMin.toString();
    } else {
      const newMax = Math.max(value, minValue + minGap);
      setMaxValue(newMax);
      if (maxRangeRef.current) maxRangeRef.current.value = newMax.toString();
    }
  };

  const applyPreset = async (preset: PricePreset) => {
    setMinValue(preset.min);
    setMaxValue(preset.max);
    if (minRangeRef.current) minRangeRef.current.value = preset.min.toString();
    if (maxRangeRef.current) maxRangeRef.current.value = preset.max.toString();
    await sendPriceToAPI(preset.min, preset.max);
  };

  const sendPriceToAPI = async (min: number, max: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ticketmaster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceMin: min, priceMax: max })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Price filter updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating price filter:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced API call for slider changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (minValue !== 0 || maxValue !== 400) { // Skip initial values
        sendPriceToAPI(minValue, maxValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [minValue, maxValue]);

  return (
    <div className="w-full dark:bg-[#262626] bg-[#F5F5F4] p-6 rounded-lg shadow-lg z-[1000]">
      <h2 className="text-lg font-bold mb-4">
        PRICE RANGE
        {isLoading && <span className="ml-2 text-sm text-gray-500">(Updating...)</span>}
      </h2>

      {/* Slider */}
      <div className="relative mt-4 slider-container">
        <input
          type="range"
          ref={minRangeRef}
          min="0"
          max="400"
          value={minValue}
          onChange={(e) => handleSliderChange(true, parseInt(e.target.value))}
          className="absolute w-full bg-transparent pointer-events-none z-10"
        />
        <input
          type="range"
          ref={maxRangeRef}
          min="0"
          max="400"
          value={maxValue}
          onChange={(e) => handleSliderChange(false, parseInt(e.target.value))}
          className="absolute w-full bg-transparent pointer-events-none z-10"
        />

        <div className="relative w-full h-2 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
          <div
            ref={rangeTrackRef}
            className="absolute h-2 bg-gradient-to-r from-purple-900 to-purple-400 rounded-md"
          />
        </div>
      </div>

      {/* Price display */}
      <div className="flex justify-between mt-3 text-gray-600 dark:text-gray-400 mb-4">
        <span>Min Price: ${minValue}</span>
        <span>Max Price: ${maxValue}</span>
      </div>

      {/* Quick-select buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4 mx-4">
        {pricePresets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            disabled={isLoading}
            className={`
              px-3 py-2 text-sm rounded-md font-medium transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-500
              hover:scale-105 text-center
              ${minValue === preset.min && maxValue === preset.max
                ? 'bg-purple-800 dark:bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-[#3A3A3A] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#4A4A4A]'}
              ${isLoading ? 'opacity-80' : ''}
            `}
            role="tab"
            aria-selected={minValue === preset.min && maxValue === preset.max}
            aria-label={`Set price range to ${preset.label}`}
          >
            <p className='text-[.80rem] text-2xl'>{preset.label}</p>
          </button>
        ))}
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: white;
          border: 3px solid #ad46ff;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          position: relative;
          z-index: 3;
          transform: translateY(-30%);
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border: 3px solid #23a9f7;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          z-index: 3;
        }

        .slider-container {
          position: relative;
          height: 18px;
        }
      `}</style>
    </div>
  );
};

export default MapPriceFilter;