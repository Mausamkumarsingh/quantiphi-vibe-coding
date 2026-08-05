import React, { memo } from 'react';
import { Star } from 'lucide-react';

const RATING_OPTIONS = [
  { value: 4, label: '4 Stars & above' },
  { value: 3, label: '3 Stars & above' },
  { value: 2, label: '2 Stars & above' },
  { value: 1, label: '1 Star & above' },
];

const RatingFilter = memo(({ selectedRating = 0, onRatingChange, disabled = false }) => {
  const handleSelect = (value) => {
    if (disabled) return;
    onRatingChange(value);
  };

  const handleKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-wide uppercase">
        <Star className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
        <span>Minimum Rating</span>
      </div>

      <div className="space-y-2" role="radiogroup" aria-label="Minimum Rating Filter">
        {/* All Ratings option */}
        <label
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${
            selectedRating === 0
              ? 'bg-indigo-600/15 border-indigo-500/50 text-white shadow-sm shadow-indigo-500/10'
              : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                selectedRating === 0
                  ? 'border-indigo-400 bg-indigo-500'
                  : 'border-slate-600 bg-slate-900'
              }`}
            >
              {selectedRating === 0 && (
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </div>
            <span className="text-sm font-medium">All Ratings</span>
          </div>

          <input
            type="radio"
            name="rating"
            checked={selectedRating === 0}
            disabled={disabled}
            onChange={() => handleSelect(0)}
            className="sr-only"
            aria-label="All Ratings"
          />
        </label>

        {RATING_OPTIONS.map((option) => {
          const isSelected = selectedRating === option.value;
          return (
            <label
              key={option.value}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
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
                  className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-500'
                      : 'border-slate-600 bg-slate-900'
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < option.value
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-400">
                {option.value}+
              </span>

              <input
                type="radio"
                name="rating"
                checked={isSelected}
                disabled={disabled}
                onChange={() => handleSelect(option.value)}
                className="sr-only"
                aria-label={`${option.value} stars and above`}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
});

RatingFilter.displayName = 'RatingFilter';

export default RatingFilter;
