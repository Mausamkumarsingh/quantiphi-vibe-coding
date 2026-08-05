import React, { memo } from 'react';
import { ArrowUpDown, Filter } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'topRated', label: 'Top Rated First' },
  { value: 'newest', label: 'Newest First' },
];

const SortDropdown = memo(({
  sortOption,
  onSortChange,
  totalCount,
  filteredCount,
  onOpenMobileFilters,
  activeFilterCount,
  disabled = false,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shadow-lg">
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        {/* Dynamic Product Counter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-400">Showing</span>
          <span className="text-sm font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
            {filteredCount}
          </span>
          <span className="text-sm font-medium text-slate-400">
            of <strong className="text-slate-200">{totalCount}</strong> products
          </span>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-semibold text-xs hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
          aria-label="Open filter menu"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Sort Dropdown Selector */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <label
          htmlFor="sort-dropdown"
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 whitespace-nowrap"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
          <span>Sort By:</span>
        </label>

        <div className="relative">
          <select
            id="sort-dropdown"
            value={sortOption}
            disabled={disabled}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500/50 text-slate-200 text-sm font-medium rounded-xl px-4 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            aria-label="Sort products options"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

SortDropdown.displayName = 'SortDropdown';

export default SortDropdown;
