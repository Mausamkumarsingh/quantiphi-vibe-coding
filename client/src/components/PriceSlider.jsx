import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DollarSign } from 'lucide-react';

const PriceSlider = memo(({
  minPrice,
  maxPrice,
  minBound = 0,
  maxBound = 500,
  onChange,
  disabled = false,
}) => {
  // Local state for smooth dragging before debouncing
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const rangeRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Synchronize local state when parent props change externally (e.g., Reset button)
  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  // Convert price value to track percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minBound) / (maxBound - minBound)) * 100),
    [minBound, maxBound]
  );

  // Update track highlight gradient width and position
  useEffect(() => {
    const minPercent = getPercent(localMin);
    const maxPercent = getPercent(localMax);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [localMin, localMax, getPercent]);

  // Handle debounced callback to parent on slider drag
  const triggerDebouncedChange = (newMin, newMax) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      onChange({ minPrice: newMin, maxPrice: newMax });
    }, 300);
  };

  const handleMinInput = (e) => {
    const value = Math.min(Number(e.target.value), localMax - 10);
    setLocalMin(value);
    triggerDebouncedChange(value, localMax);
  };

  const handleMaxInput = (e) => {
    const value = Math.max(Number(e.target.value), localMin + 10);
    setLocalMax(value);
    triggerDebouncedChange(localMin, value);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-wide uppercase">
          <DollarSign className="w-4 h-4 text-indigo-400" />
          <span>Price Range</span>
        </div>
        <div className="text-xs text-indigo-400 font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          ${localMin} - ${localMax}
        </div>
      </div>

      {/* Dual Slider Control Track */}
      <div className="relative pt-2 pb-6 px-1">
        <div className="range-slider">
          <div ref={rangeRef} className="range-slider__range" />
        </div>

        <input
          type="range"
          min={minBound}
          max={maxBound}
          value={localMin}
          onChange={handleMinInput}
          disabled={disabled}
          className="thumb z-30 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Minimum Price Boundary"
          aria-valuemin={minBound}
          aria-valuemax={maxBound}
          aria-valuenow={localMin}
        />

        <input
          type="range"
          min={minBound}
          max={maxBound}
          value={localMax}
          onChange={handleMaxInput}
          disabled={disabled}
          className="thumb z-40 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Maximum Price Boundary"
          aria-valuemin={minBound}
          aria-valuemax={maxBound}
          aria-valuenow={localMax}
        />
      </div>

      {/* Min/Max Live Numeric Values */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400">Min Price</span>
          <div className="flex items-center text-sm font-bold text-slate-100 mt-0.5">
            <span className="text-slate-500 mr-0.5">$</span>
            <span>{localMin}</span>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400">Max Price</span>
          <div className="flex items-center text-sm font-bold text-slate-100 mt-0.5">
            <span className="text-slate-500 mr-0.5">$</span>
            <span>{localMax}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

PriceSlider.displayName = 'PriceSlider';

export default PriceSlider;
