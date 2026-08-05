const fs = require('fs');
const path = require('path');

/**
 * Helper to load products from products.json file
 */
const getProductsData = () => {
  const filePath = path.join(__dirname, '../data/products.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Allowed sort options
const ALLOWED_SORT_OPTIONS = ['default', 'priceLow', 'priceHigh', 'topRated', 'newest'];

/**
 * Combinatorial Intersect Filtering Function
 * Evaluates active criteria state against the master inventory array.
 * A product is returned ONLY if it satisfies all active criteria simultaneously:
 *  1) Category Selection (if active)
 *  2) Price Boundary (minPrice <= price <= maxPrice)
 *  3) Star Rating (rating >= minRating)
 *
 * Graceful Null Handling:
 *  If filters are unselected, empty, or cleared, data reduction filters are safely bypassed.
 */
const applyCombinatorialIntersectFilter = (products, criteria) => {
  const { categories, minPrice, maxPrice, rating } = criteria;

  return products.filter((product) => {
    // 1. Category Selection Intersect
    if (categories && categories.length > 0) {
      const matchesCategory = categories.some(
        (cat) => cat.toLowerCase() === product.category.toLowerCase()
      );
      if (!matchesCategory) return false;
    }

    // 2. Price Range Boundary Intersect
    if (minPrice !== undefined && product.price < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && product.price > maxPrice) {
      return false;
    }

    // 3. Minimum Star Rating Intersect (product.rating >= rating)
    if (rating !== undefined && rating > 0 && product.rating < rating) {
      return false;
    }

    return true;
  });
};

/**
 * Controller to handle GET /api/products
 * Query parameters supported:
 *  - category: string (comma-separated or array)
 *  - minPrice: number
 *  - maxPrice: number
 *  - rating: number
 *  - sort: 'default' | 'priceLow' | 'priceHigh' | 'topRated' | 'newest'
 */
const getProducts = (req, res) => {
  try {
    const rawProducts = getProductsData();

    // Calculate global bounds for price range slider track initialization
    const allPrices = rawProducts.map((p) => p.price);
    const globalMinPrice = Math.floor(Math.min(...allPrices));
    const globalMaxPrice = Math.ceil(Math.max(...allPrices));

    const { category, minPrice, maxPrice, rating, sort } = req.query;

    // --- QUERY PARAMETER VALIDATION ---

    // Parse & Validate Categories
    let categories = [];
    if (Array.isArray(category)) {
      categories = category.map((c) => String(c).trim()).filter(Boolean);
    } else if (typeof category === 'string' && category.trim() !== '') {
      categories = category.split(',').map((cat) => cat.trim()).filter(Boolean);
    }

    // Parse & Validate Numeric Criteria
    let parsedMinPrice;
    if (minPrice !== undefined && minPrice !== '') {
      parsedMinPrice = parseFloat(minPrice);
      if (isNaN(parsedMinPrice) || parsedMinPrice < 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid minPrice parameter. Must be a non-negative number.',
        });
      }
    }

    let parsedMaxPrice;
    if (maxPrice !== undefined && maxPrice !== '') {
      parsedMaxPrice = parseFloat(maxPrice);
      if (isNaN(parsedMaxPrice) || parsedMaxPrice < 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid maxPrice parameter. Must be a non-negative number.',
        });
      }
    }

    // Validate minPrice vs maxPrice
    if (
      parsedMinPrice !== undefined &&
      parsedMaxPrice !== undefined &&
      parsedMinPrice > parsedMaxPrice
    ) {
      return res.status(400).json({
        success: false,
        message: 'minPrice cannot be greater than maxPrice.',
      });
    }

    let parsedRating;
    if (rating !== undefined && rating !== '') {
      parsedRating = parseFloat(rating);
      if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Invalid rating parameter. Must be a number between 0 and 5.',
        });
      }
    }

    // Parse & Validate Sort Parameter
    let selectedSort = 'default';
    if (sort) {
      if (!ALLOWED_SORT_OPTIONS.includes(sort)) {
        return res.status(400).json({
          success: false,
          message: `Invalid sort parameter '${sort}'. Allowed values are: ${ALLOWED_SORT_OPTIONS.join(', ')}.`,
        });
      }
      selectedSort = sort;
    }

    // PIPELINE STEP 1: Combinatorial Intersect Filtering Array
    let filteredResults = applyCombinatorialIntersectFilter(rawProducts, {
      categories,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      rating: parsedRating,
    });

    // PIPELINE STEP 2: Sorting (Filter First -> Sort Second)
    switch (selectedSort) {
      case 'priceLow':
        filteredResults.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filteredResults.sort((a, b) => b.price - a.price);
        break;
      case 'topRated':
        filteredResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredResults.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case 'default':
      default:
        filteredResults.sort((a, b) => a.id - b.id);
        break;
    }

    return res.status(200).json({
      success: true,
      count: filteredResults.length,
      totalInventory: rawProducts.length,
      globalMinPrice,
      globalMaxPrice,
      data: filteredResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve products due to a server error.',
      error: error.message,
    });
  }
};

/**
 * Controller to fetch all unique categories dynamically
 */
const getCategories = (req, res) => {
  try {
    const rawProducts = getProductsData();
    const categories = [...new Set(rawProducts.map((p) => p.category))];
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getCategories,
};
