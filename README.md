
# InventoryFlow React Dashboard

## Project Overview
InventoryFlow is a modern, data-rich inventory management dashboard built with React and Vite. It features a clean, intuitive UI, centralized design system, and accessibility-focused color theory. The dashboard consists of two main pages: StockDashboard and ProductDetails.

## Features
- **Centralized Design System:** All colors, fonts, shadows, gradients, and layout styles are managed in `src/design.js` for consistency and easy updates.
- **Gradient Backgrounds:** Pages use a light blue to white gradient; all boxes use a light green to white gradient for visual separation.
- **Modern Font:** Uses Poppins for a clean, professional look.
- **Box Shadows:** Enhanced shadows make cards and tables pop out.
- **Responsive Layout:** Flexbox-based sections and cards.
- **Accessibility:** High-contrast text, color-coded status, and readable font sizes.
- **Mock & Real Data Toggle:** Easily switch between mock data and real data from a PHP/MySQL backend.
- **Navigation:** Header links connect dashboard and product details pages.
- **Reusable Styles:** All repeated style objects (layout, cards, tables) are imported from the design system.

## Pages
### StockDashboard
- **Header:** Minimal navigation (Dashboard, Products).
- **KPI Cards:** Total inventory value, product count, low/out-of-stock items.
- **Sales History:** Bar chart placeholder for monthly sales.
- **Needs Reordering:** Table of products below reorder level, with bulk order actions.
- **Inventory Table:** Full product list with status, price, and quick actions.
- **Order Modal:** Place orders for selected products.

### ProductDetails
- **Header:** Consistent with dashboard.
- **Product Summary:** Image, category badge, supplier info, stock/cost/price details.
- **Stock History:** Table of stock changes over time.
- **Order Items:** Table of sales and purchase orders.
- **Reorder Requests:** List of pending reorder requests.

## How It Works
1. **Design System:** All style constants and layout objects are defined in `src/design.js` and imported into pages.
2. **Data Toggle:** Use the button at the top to switch between mock and real data. Real data is fetched from a PHP endpoint (see `fetchRealData` in `StockDashboard.jsx`).
3. **Navigation:** Click "Products" in the header to view product details.
4. **Actions:** Select products for reorder, view details, and place orders via modals.
5. **Accessibility:** All text is black except on dark backgrounds; color theory is used for status and badges.

## Project Progress
- Project scaffolded with Vite and React.
- Centralized design system created (`design.js`).
- Two main pages implemented and visually aligned.
- Mock data and real data toggle working.
- Error handling and debugging completed.
- Color contrast and accessibility improved.
- All design and layout code centralized for maintainability.
- README updated to reflect current state and usage.

## Getting Started
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open `http://localhost:3000` in your browser.

## File Structure
- `src/design.js`: Centralized design system.
- `src/pages/StockDashboard.jsx`: Main dashboard page.
- `src/pages/ProductDetails.jsx`: Product details page.
- `public/`: Static assets and placeholder images.

## Next Steps
- Integrate real backend API for live data.
- Add more charts and analytics.
- Expand user management and permissions.
- Polish mobile responsiveness.

---
For any questions or feature requests, please contact the project maintainer.
