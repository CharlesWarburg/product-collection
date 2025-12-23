# Product Collection

An interactive product collection page built to explore real-world e-commerce filtering patterns and responsive UI behaviour.

This project focuses on product thinking, UI structure, and state-driven interactions rather than framework-specific implementation.

---

## Overview

The page presents a grid of products with a combination of:

- Category navigation
- Attribute-based filters (skin type, skin concern)
- Conditional promotional content
- Responsive layout across desktop and mobile

All interactions are handled with semantic HTML, modern CSS, and vanilla JavaScript.

---

## Key Features

### Filtering
- Category tabs with active state management
- Multi-select filters that work in combination
- Automatic disabling of filter options that would lead to empty results
- Clear and close actions for filter state
- Safeguards to prevent empty result screens

### Layout & Responsiveness
- Grid-based product layout
- Promo card integrated within the product grid
- Responsive behaviour across breakpoints
- Consistent spacing and image treatment across device sizes

### Interaction & State
- Centralised filter state management
- DOM updates driven by product data attributes
- No external libraries or frameworks

---

## Implementation Notes

Products are defined using data attributes for type, skin, and concern, allowing filtering logic to remain declarative and scalable.

Filter state is reapplied on every interaction to ensure predictable behaviour and avoid conflicting UI states.

---

## Technology

- HTML5
- CSS (Grid, Flexbox, media queries)
- Vanilla JavaScript

---

## Project Structure
/
├── index.html
├── style.css
├── script.js
└── README.md

---

## Purpose

This project was built to:
- Explore complex filtering behaviour commonly found in e-commerce products
- Translate design intent into structured, maintainable UI
- Handle UX edge cases that are often overlooked in static layouts

---

## Author

Charles Warburg