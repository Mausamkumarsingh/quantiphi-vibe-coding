import React, { memo } from 'react';
import { Tag, Check } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Apparel', 'Footwear'];

const CategoryFilter = memo(({ selectedCategories = [], onCategoryChange, disabled = false }) => {
  const handleCheckboxChange = (category) => {
    if (disabled) return;
    let updated;
    if (selectedCategories.includes(category)) {
      updated = selectedCategories.filter((cat) => cat !== category);
    } else {
      updated = [...selectedCategories, category];
    }
    onCategoryChange(updated);
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCheckboxChange(category);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-wide uppercase">
        <Tag className="w-4 h-4 text-indigo-400" />
        <span>Categories</span>
      </div>

      <div className="space-y-2" role="group" aria-label="Category Filters">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <label
              key={category}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => handleKeyDown(e, category)}
              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                isSelected
                  ? 'bg-indigo-600/15 border-indigo-500/50 text-white shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white'
                      : 'border-slate-600 bg-slate-900/60'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm font-medium">{category}</span>
              </div>

              <input
                type="checkbox"
                checked={isSelected}
                disabled={disabled}
                onChange={() => handleCheckboxChange(category)}
                className="sr-only"
                id={`category-${category}`}
                aria-label={`Select category ${category}`}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
