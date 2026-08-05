import React, { memo } from 'react';
import CategoryFilter from './CategoryFilter';
import PriceSlider from './PriceSlider';
import RatingFilter from './RatingFilter';
import { Filter, RotateCcw } from 'lucide-react';

const Sidebar = memo(({
  selectedCategories,
  onCategoryChange,
  minPrice,
  maxPrice,
  minBound,
  maxBound,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onResetFilters,
  activeFilterCount,
  disabled = false,
}) => {
  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
      <div className="lg:sticky lg:top-20 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">Filter Products</h2>
              <p className="text-xs text-slate-400">Refine catalog criteria</p>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              disabled={disabled}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1 px-2.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 cursor-pointer disabled:opacity-50"
              title="Reset all filters"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          disabled={disabled}
        />

        <div className="border-t border-slate-800/80 pt-6">
          {/* Price Range Slider */}
          <PriceSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            minBound={minBound}
            maxBound={maxBound}
            onChange={onPriceChange}
            disabled={disabled}
          />
        </div>

        <div className="border-t border-slate-800/80 pt-6">
          {/* Minimum Rating Filter */}
          <RatingFilter
            selectedRating={selectedRating}
            onRatingChange={onRatingChange}
            disabled={disabled}
          />
        </div>

        {/* Bottom Reset Filters Button */}
        {activeFilterCount > 0 && (
          <div className="border-t border-slate-800/80 pt-5">
            <button
              type="button"
              onClick={onResetFilters}
              disabled={disabled}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer disabled:opacity-50"
              aria-label="Reset all active filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Reset All Filters ({activeFilterCount})</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
