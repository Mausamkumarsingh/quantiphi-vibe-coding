# 🛒 LuxeStore | E-Commerce Product Multi-Filter Application

A production-quality, full-stack E-Commerce Product Multi-Filter application built with **React 19**, **Vite**, **Tailwind CSS v4**, **Axios**, **Node.js**, and **Express.js**.

Designed and implemented to technical assessment standards with clean MVC architecture, robust backend validation, debounced slider tracks, active filter chips, visual star ratings, responsive mobile drawers, and zero frontend data filtering.

---

## 🌟 Key Features

- **Interactive Sticky Sidebar Layout (Desktop)**
  - **Category Checklist**: Checkbox multi-select (`Electronics`, `Apparel`, `Footwear`).
  - **Dual-Point Price Range Slider Track**: Smooth dual-thumb control with live `$Min - $Max` display and 300ms API debouncing.
  - **Minimum Star Rating Radio Buttons**: Select 1 to 5 Stars (e.g. `4+ Stars`).
  - **Top & Bottom Reset Filters Buttons**: Easily restore base inventory state.

- **Mobile & Tablet Responsiveness**
  - **Slide-Out Filter Drawer**: Converts sidebar into a responsive mobile drawer with backdrop overlay for small viewports.

- **Active Filter Chips & Clear All**
  - Interactive chips rendered above the catalog grid for each active category, price range, or rating.
  - Individual chip removal buttons (`×`) plus a one-click `"Clear All"` button.

- **Dynamic Product Counter & Visual Stars**
  - Displays dynamic inventory counts (e.g. `Showing 7 of 30 products`).
  - Visual star rating displays (`⭐⭐⭐⭐☆ (4.5)`) on all product cards.

- **Backend Pipeline & Validation (MVC)**
  - **Strict Pipeline**: `Original Inventory` → `Category Intersect` → `Price Boundary Intersect` → `Rating Intersect` → `Sorting`.
  - **Input Validation**: Backend validates query parameters and handles invalid category, price bounds, rating values, or sort keys gracefully with meaningful error responses.

- **Professional Empty State & Error Handling**
  - Displays `"No items match your criteria."` with an icon and prominent `"Reset Filters"` button.
  - Friendly error banner with a `"Retry Connection"` button if backend communication fails.

---

## 📁 Project Structure

```text
├── client/                      # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          # Sticky sidebar wrapping filter controls
│   │   │   ├── MobileFilterDrawer.jsx # Mobile slide-out drawer modal
│   │   │   ├── FilterChips.jsx      # Active filter chips & individual removal
│   │   │   ├── CategoryFilter.jsx   # Multi-select category checkboxes
│   │   │   ├── PriceSlider.jsx      # Debounced dual-thumb range slider
│   │   │   ├── RatingFilter.jsx     # Radio star rating filters
│   │   │   ├── SortDropdown.jsx     # Pipeline sorting dropdown & counter
│   │   │   ├── ProductCard.jsx      # Product card with image zoom & visual stars
│   │   │   ├── ProductGrid.jsx      # Responsive grid & skeleton loaders
│   │   │   └── EmptyState.jsx       # Fallback empty criteria display
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main page, state management & debouncing
│   │   ├── services/
│   │   │   └── api.js               # Axios API client & parameter serializer
│   │   ├── App.jsx                  # Main application component
│   │   ├── main.jsx                 # React root entry point
│   │   └── index.css                # Tailwind CSS v4 & custom slider styles
│   ├── package.json
│   └── vite.config.js
│
└── server/                      # Express.js Backend (MVC Architecture)
    ├── controllers/
    │   └── productController.js # Combinatorial intersect & validation logic
    ├── routes/
    │   └── productRoutes.js     # API routing configuration
    ├── data/
    │   └── products.json        # 30 high-quality sample products dataset
    ├── app.js                   # Express server entry point
    └── package.json
```

---

## 💻 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Axios, Lucide React icons.
- **Backend**: Node.js, Express.js (CommonJS, MVC architecture).
- **Language**: JavaScript (ES6+).

---

## 🛠️ Installation & Execution

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Start Backend Server

```bash
cd server
npm install
npm start
```
*Backend runs on `http://localhost:5000`.*

### 2. Start Frontend Client

In a separate terminal:

```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 📡 API Documentation

### `GET /api/products`

#### Query Parameters

| Parameter  | Type     | Description                                                          | Example |
| :--------- | :------- | :------------------------------------------------------------------- | :------ |
| `category` | `string` | Comma-separated category names (`Electronics`, `Apparel`, `Footwear`) | `Electronics,Footwear` |
| `minPrice` | `number` | Minimum product price boundary ($\ge 0$)                            | `50` |
| `maxPrice` | `number` | Maximum product price boundary ($\ge 0$)                            | `300` |
| `rating`   | `number` | Minimum star rating ($0 \le rating \le 5$)                            | `4` |
| `sort`     | `string` | Sort option (`default`, `priceLow`, `priceHigh`, `topRated`, `newest`) | `priceLow` |

#### Example API Request
```http
GET http://localhost:5000/api/products?category=Electronics,Footwear&minPrice=50&maxPrice=300&rating=4&sort=priceLow
```

#### Example JSON Response
```json
{
  "success": true,
  "count": 6,
  "totalInventory": 30,
  "globalMinPrice": 28,
  "globalMaxPrice": 389,
  "data": [
    {
      "id": 9,
      "name": "Full HD 1080p Streaming Webcam",
      "category": "Electronics",
      "price": 59.99,
      "rating": 4.1,
      "image": "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80",
      "createdAt": "2025-11-28T13:30:00.000Z"
    }
  ]
}
```
