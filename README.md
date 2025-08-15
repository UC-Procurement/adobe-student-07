# UC Adobe for Students - Vanilla HTML/CSS/JS Version

A vanilla HTML, CSS, and JavaScript implementation of the UC Adobe for Students website.

## Files Structure

```
vanilla/
├── index.html          # Main homepage
├── contact.html        # Contact page
├── faq.html           # FAQ page with accordion
├── compare.html       # Plans comparison page
├── styles.css         # All CSS styles
├── script.js          # All JavaScript functionality
└── README.md          # This file
```

## Features

### Responsive Design
- Mobile-first approach
- Responsive navigation with hamburger menu
- Grid layouts that adapt to screen size
- Touch-friendly interactive elements

### Accessibility
- Skip navigation link
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly markup
- High contrast mode support
- Reduced motion support

### Interactive Elements
- Mobile navigation menu with smooth animations
- FAQ accordion functionality
- Form validation with error messages
- Loading states for buttons
- Smooth scrolling for anchor links

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS Grid and Flexbox
- ES6+ JavaScript features
- Progressive enhancement approach

## Key Components

### Navigation
- Sticky header with UC branding
- Responsive navigation menu
- Active page highlighting
- Mobile hamburger menu with accessibility features

### Forms
- Contact form with validation
- Real-time error messaging
- Success notifications
- Form field focus states

### Interactive FAQ
- Accordion-style FAQ section
- Keyboard accessible
- Only one item open at a time
- Smooth expand/collapse animations

### Comparison Table
- Responsive pricing table
- Feature comparison grid
- Mobile-optimized layout
- Clear visual hierarchy

## CSS Features

### UC Design System
- UC Berkeley color palette (Blue, Gold, Light Blue)
- Consistent spacing and typography
- Semantic color tokens
- Responsive breakpoints

### Modern CSS
- CSS Grid for complex layouts
- Flexbox for component alignment
- CSS Custom Properties (variables)
- Smooth transitions and animations
- Focus-visible for better accessibility

### Performance
- Optimized CSS structure
- Efficient selectors
- Minimal dependencies
- Fast loading animations

## JavaScript Features

### Mobile Menu
- Smooth toggle animations
- Escape key to close
- Focus management
- Click outside to close
- ARIA state management

### Form Handling
- Client-side validation
- Email format checking
- Error state management
- Success messaging
- Form reset on success

### FAQ Accordion
- Single item open behavior
- Smooth height transitions
- Keyboard navigation
- ARIA expanded states

### Navigation
- Active page detection
- Smooth scroll for anchors
- Loading button states

## Setup Instructions

1. Place all files in the same directory
2. Ensure the UC logo image is available at `assets/uc-logo.png`
3. Open `index.html` in a web browser
4. No build process or dependencies required

## Customization

### Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
    --uc-blue: #003262;
    --uc-gold: #FDB515;
    --uc-light-blue: #00A5E5;
    --uc-gray: #8A8B8C;
}
```

### Content
- Edit HTML files directly to update content
- FAQ items can be added/removed in `faq.html`
- Form fields can be modified in `contact.html`
- Comparison table can be updated in `compare.html`

### Styling
- All styles are in `styles.css`
- Uses CSS Grid and Flexbox for layouts
- Mobile-first responsive design
- BEM-like class naming convention

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Notes

- No external dependencies except Google Fonts
- Optimized CSS with efficient selectors
- Minimal JavaScript for better performance
- Images should be optimized for web use

## Differences from React Version

- No component architecture
- Vanilla DOM manipulation
- Static content (no dynamic data)
- Traditional form handling
- CSS-only animations where possible
- Manual state management for interactive elements