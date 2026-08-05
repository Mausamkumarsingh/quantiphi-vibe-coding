import React, { memo } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import PriceSlider from './PriceSlider';
import RatingFilter from './RatingFilter';

const MobileFilterDrawer = memo(({
  isOpen,
  onClose,
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div
        className="relative w-full max-w-xs sm:max-w-sm bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-5 shadow-2xl flex flex-col z-10 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-label="Filter Options"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Filter className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-100 text-lg">Filter Catalog</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
            aria-label="Close filters drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          disabled={disabled}
        />

        {/* Price Slider */}
        <div className="border-t border-slate-800 pt-6">
          <PriceSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            minBound={minBound}
            maxBound={maxBound}
            onChange={onPriceChange}
            disabled={disabled}
          />
        </div>

        {/* Rating Filter */}
        <div className="border-t border-slate-800 pt-6">
          <RatingFilter
            selectedRating={selectedRating}
            onRatingChange={onRatingChange}
            disabled={disabled}
          />
        </div>

        {/* Drawer Footer Actions */}
        <div className="mt-auto border-t border-slate-800 pt-5 flex gap-3">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                onResetFilters();
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-semibold text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
});

MobileFilterDrawer.displayName = 'MobileFilterDrawer';

export default MobileFilterDrawer;
