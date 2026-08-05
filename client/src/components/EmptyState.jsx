import React, { memo } from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

const EmptyState = memo(({ onResetFilters }) => {
  return (
    <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center my-6 shadow-xl">
      {/* Empty State Icon */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 shadow-inner">
        <SearchX className="w-10 h-10" />
      </div>

      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-2 tracking-tight">
        No items match your criteria
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        We couldn't find any products matching your active filters. Try clearing your category selection, widening your price range, or lowering the star rating.
      </p>

      {/* Prominent Reset Button */}
      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 transition-all duration-200 shadow-xl shadow-indigo-500/25 cursor-pointer"
        aria-label="Reset all active criteria filters"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
