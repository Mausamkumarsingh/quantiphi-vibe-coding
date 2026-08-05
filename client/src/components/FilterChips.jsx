import React, { memo } from 'react';
import { X, RotateCcw } from 'lucide-react';

const FilterChips = memo(({
  selectedCategories = [],
  onRemoveCategory,
  minPrice,
  maxPrice,
  minBound = 0,
  maxBound = 500,
  onResetPrice,
  selectedRating = 0,
  onResetRating,
  onClearAll,
}) => {
  const isPriceFiltered = minPrice > minBound || maxPrice < maxBound;
  const isRatingFiltered = selectedRating > 0;
  const hasActiveFilters =
    selectedCategories.length > 0 || isPriceFiltered || isRatingFiltered;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
        Active Filters:
      </span>

      {/* Category Chips */}
      {selectedCategories.map((category) => (
        <span
          key={category}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 shadow-sm"
        >
          <span>{category}</span>
          <button
            type="button"
            onClick={() => onRemoveCategory(category)}
            className="hover:bg-indigo-500/30 p-0.5 rounded-full text-indigo-300 hover:text-white transition-colors cursor-pointer"
            aria-label={`Remove filter ${category}`}
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        </span>
      ))}

      {/* Price Range Chip */}
      {isPriceFiltered && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/15 border border-purple-500/30 text-purple-300 shadow-sm">
          <span>
            Price: ${minPrice} - ${maxPrice}
          </span>
          <button
            type="button"
            onClick={onResetPrice}
            className="hover:bg-purple-500/30 p-0.5 rounded-full text-purple-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Remove price filter"
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        </span>
      )}

      {/* Rating Chip */}
      {isRatingFiltered && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm">
          <span>Rating: {selectedRating}+ ★</span>
          <button
            type="button"
            onClick={onResetRating}
            className="hover:bg-amber-500/30 p-0.5 rounded-full text-amber-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Remove rating filter"
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        </span>
      )}

      {/* Clear All Button */}
      <button
        type="button"
        onClick={onClearAll}
        className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear All</span>
      </button>
    </div>
  );
});

FilterChips.displayName = 'FilterChips';

export default FilterChips;
