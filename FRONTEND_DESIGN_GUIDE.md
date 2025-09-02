# Inventory Dashboard Front-End Design Guide

## Overview
This guide outlines the design principles, page layouts, and UI components for a React-based inventory dashboard. The dashboard is intuitive, visually clear, and leverages color theory for accessibility and clarity.

---

## General Design Principles
- **Intuitive Navigation:** Use a sidebar or top navigation for easy access to main pages.
- **Consistent Color Palette:** Use category colors for badges, status colors for stock, and avoid color clashes (e.g., dark text on light backgrounds).
- **Clear Hierarchy:** Use headings, cards, and tables to organize information.
- **Accessible UI:** Ensure sufficient contrast, readable fonts, and clear indicators for status and actions.
- **Responsive Layout:** Works well on desktop and tablet.

---

## Page 1: Stock Overview & Reorder
### Purpose
- View all products and their stock status
- Indicate time/urgency until reorder
- Allow admin to select and reorder low-stock items

### Layout
- **Header:** Title, user profile, notifications
- **Sidebar:** Navigation (Dashboard, Orders, Products, Suppliers, etc.)
- **Main Section:**
  - **Product Table:**
    - Columns: Image, Name, SKU, Category (badge), Supplier, Current Stock, Status (color-coded), Reorder Level, Max Stock, Last Updated
    - **Status Indicator:**
      - Green: In Stock
      - Yellow: Low
      - Red: Out of Stock
    - **Reorder Urgency:**
      - Progress bar or countdown (e.g., days left until reorder needed)
    - **Bulk Actions:**
      - Checkbox to select products
      - Button to place reorder for selected items
  - **Filters:** Category, Supplier, Status

### Color Theory
- Use category color for badges
- Status colors: Green (#4CAF50), Yellow (#FFC107), Red (#F44336)
- Background: Light neutral (e.g., #F5F5F5)
- Text: Dark gray (#212121)
- Button: Primary color (e.g., #1976D2), with hover effect

---

## Page 2: Product Details & History
### Purpose
- View individual product details
- See sales history, last purchase, reorder requests

### Layout
- **Header:** Product name, image, category badge
- **Main Section:**
  - **Product Info Card:**
    - Name, SKU, Description, Supplier, Cost, Price, Current Stock, Reorder Level
    - Images (carousel if multiple)
  - **Sales History Table:**
    - Columns: Date, Order ID, Customer, Quantity, Unit Price, Total Price, Status
  - **Last Purchase Info:**
    - Date, Supplier, Quantity, Price
  - **Reorder Requests:**
    - List of requests with status (pending, ordered, received)
  - **Audit Log:**
    - Recent actions for this product

### Color Theory
- Use category color for badge
- Status colors for order/reorder: Blue (#2196F3), Orange (#FF9800), Green (#4CAF50)
- Card backgrounds: White (#FFFFFF) with subtle shadow
- Table headers: Slightly darker background (#EEEEEE)
- Text: Dark gray (#212121)

---

## Component Suggestions
- **Table:** For stock and history, sortable and filterable
- **Badge:** For category and status
- **Progress Bar:** For reorder urgency
- **Modal/Dialog:** For placing orders
- **Tabs:** For switching between product info, history, and logs
- **Notification Toasts:** For success/error/info messages

---

## Accessibility & Usability
- Ensure all interactive elements are keyboard accessible
- Use ARIA labels for important controls
- Avoid color-only indicators (use icons or text as well)
- Responsive design for different screen sizes

---

## Example Color Palette
- Primary: #1976D2
- Secondary: #FFC107
- Success: #4CAF50
- Warning: #FFC107
- Error: #F44336
- Info: #2196F3
- Background: #F5F5F5
- Surface: #FFFFFF
- Text: #212121

---

## Next Steps
- Scaffold React project (Vite + React)
- Implement pages and components as described
- Use provided database schema for API integration
- Test for usability and accessibility

---

*Replace colors and layout as needed to match your brand and user needs.*
