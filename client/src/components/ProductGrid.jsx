import React, { memo } from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

const ProductGrid = memo(({ products = [], loading, onResetFilters }) => {
  // Skeleton Loading State
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-busy="true"
        aria-label="Loading products catalog"
      >
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4 animate-pulse"
          >
            <div className="w-full aspect-4/3 bg-slate-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-5 bg-slate-800 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-800/60 rounded-lg w-1/2" />
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <div className="h-6 bg-slate-800 rounded-lg w-1/3" />
              <div className="w-9 h-9 bg-slate-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return <EmptyState onResetFilters={onResetFilters} />;
  }

  // Product Cards Grid
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="region"
      aria-label="Product List"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
