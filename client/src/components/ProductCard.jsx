import React, { memo } from 'react';
import { Star, ShoppingBag } from 'lucide-react';

const ProductCard = memo(({ product }) => {
  const { name, category, price, rating, image } = product;

  return (
    <article className="group bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-800 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md border border-slate-700/60 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
          {category}
        </div>

        {/* Rating Display */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/60 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-100 text-base leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Visual Rating Stars */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const isFull = rating >= starValue;
                const isHalf = rating >= starValue - 0.5 && rating < starValue;

                return (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      isFull
                        ? 'text-amber-400 fill-amber-400'
                        : isHalf
                        ? 'text-amber-400 fill-amber-400/50'
                        : 'text-slate-700 fill-slate-800'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-xs font-medium text-slate-400">
              ({rating.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Price
            </span>
            <span className="text-xl font-extrabold text-slate-100 tracking-tight">
              ${price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-white transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            aria-label={`Add ${name} to cart`}
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
