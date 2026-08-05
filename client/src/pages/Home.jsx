import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import FilterChips from '../components/FilterChips';
import SortDropdown from '../components/SortDropdown';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/api';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const DEFAULT_MIN_BOUND = 0;
const DEFAULT_MAX_BOUND = 500;

const Home = () => {
  // Filtering & Sorting State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_BOUND);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_BOUND);
  const [minBound, setMinBound] = useState(DEFAULT_MIN_BOUND);
  const [maxBound, setMaxBound] = useState(DEFAULT_MAX_BOUND);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState('default');

  // UI & Data Fetching State
  const [products, setProducts] = useState([]);
  const [totalInventoryCount, setTotalInventoryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch products from backend whenever criteria changes
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts({
        categories: selectedCategories,
        minPrice,
        maxPrice,
        rating: selectedRating,
        sort: sortOption,
      });

      if (data && data.success) {
        setProducts(data.data || []);
        setTotalInventoryCount(data.totalInventory || data.data?.length || 0);

        // Update bounds on initial load from backend metadata
        if (isInitialLoad) {
          if (data.globalMinPrice !== undefined) {
            setMinBound(data.globalMinPrice);
            setMinPrice(data.globalMinPrice);
          }
          if (data.globalMaxPrice !== undefined) {
            setMaxBound(data.globalMaxPrice);
            setMaxPrice(data.globalMaxPrice);
          }
          setIsInitialLoad(false);
        }
      } else {
        setError(data?.message || 'Failed to fetch products from backend server.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to connect to backend server. Please verify that Node.js express server is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, minPrice, maxPrice, selectedRating, sortOption, isInitialLoad]);

  // Real-time backend fetch on filter change
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Reset all filters to default baseline
  const handleResetFilters = useCallback(() => {
    setSelectedCategories([]);
    setMinPrice(minBound);
    setMaxPrice(maxBound);
    setSelectedRating(0);
    setSortOption('default');
  }, [minBound, maxBound]);

  // Individual chip removal callbacks
  const handleRemoveCategory = useCallback((categoryToRemove) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat !== categoryToRemove));
  }, []);

  const handleResetPrice = useCallback(() => {
    setMinPrice(minBound);
    setMaxPrice(maxBound);
  }, [minBound, maxBound]);

  const handleResetRating = useCallback(() => {
    setSelectedRating(0);
  }, []);

  const handlePriceChange = useCallback(({ minPrice: newMin, maxPrice: newMax }) => {
    setMinPrice(newMin);
    setMaxPrice(newMax);
  }, []);

  // Compute active filters count memoized
  const activeFilterCount = useMemo(() => {
    return (
      (selectedCategories.length > 0 ? 1 : 0) +
      (minPrice > minBound || maxPrice < maxBound ? 1 : 0) +
      (selectedRating > 0 ? 1 : 0)
    );
  }, [selectedCategories.length, minPrice, maxPrice, minBound, maxBound, selectedRating]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                LuxeStore
              </span>
              <span className="hidden sm:inline-block ml-2 text.xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Catalog Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
            <span className="hidden md:inline-block">Real-time Multi-Filter Engine</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Backend Online" />
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-grow w-full">
        {/* Error Alert Box with Retry */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <p className="text-sm font-medium">{error}</p>
            </div>

            <button
              type="button"
              onClick={loadProducts}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-md cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Left Side: Sticky Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minBound={minBound}
              maxBound={maxBound}
              onPriceChange={handlePriceChange}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
              disabled={loading}
            />
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer
            isOpen={isMobileFiltersOpen}
            onClose={() => setIsMobileFiltersOpen(false)}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minBound={minBound}
            maxBound={maxBound}
            onPriceChange={handlePriceChange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
            disabled={loading}
          />

          {/* Right Side: Header Controls, Chips & Product Grid */}
          <section className="flex-1 w-full min-w-0">
            {/* Sort & Counter Dropdown */}
            <SortDropdown
              sortOption={sortOption}
              onSortChange={setSortOption}
              totalCount={totalInventoryCount}
              filteredCount={products.length}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              activeFilterCount={activeFilterCount}
              disabled={loading}
            />

            {/* Active Filter Chips */}
            <FilterChips
              selectedCategories={selectedCategories}
              onRemoveCategory={handleRemoveCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minBound={minBound}
              maxBound={maxBound}
              onResetPrice={handleResetPrice}
              selectedRating={selectedRating}
              onResetRating={handleResetRating}
              onClearAll={handleResetFilters}
            />

            {/* Product Catalog Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              onResetFilters={handleResetFilters}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>© 2026 LuxeStore E-Commerce. Production-Quality Multi-Filter Architecture.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
