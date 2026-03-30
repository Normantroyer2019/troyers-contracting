# Troyer's Contracting — Metal Roofing Website

A professional, responsive business website for Troyer's Contracting, a metal roofing company.

## File Structure

```
troyers-contracting/
├── index.html          # Homepage
├── about.html          # About Us page
├── services.html       # Services detail page
├── gallery.html        # Filterable project gallery
├── faq.html            # FAQ with accordion
├── contact.html        # Contact page with form
├── estimate.html       # Free estimate request form
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Navigation, animations, forms, filters
├── images/             # Place your images here
└── README.md           # This file
```

## How to Customize

### 1. Replace Contact Information

Search for these placeholders across **all HTML files** and replace them:

| Placeholder | Replace With |
|---|---|
| `(555) 123-4567` | Your real phone number |
| `+15551234567` | Your phone in tel: format (digits only, with country code) |
| `info@troyerscontracting.com` | Your real email address |
| `123 Main Street, Your City, ST 12345` | Your real business address |

**Tip:** Use your code editor's "Find and Replace in Files" feature to update all instances at once.

### 2. Replace Images

All image placeholders are marked with colored gradient boxes and comments like:
```html
<!-- REPLACE: Add your project photo here -->
```

To replace a placeholder:
1. Save your image to the `images/` folder
2. Replace the `<div class="placeholder-img">` with an `<img>` tag:
   ```html
   <img src="images/your-photo.jpg" alt="Description of the photo" loading="lazy">
   ```

**Images you'll need:**
- **Hero background** (1920x1080px recommended) — Set in `css/styles.css` on `.hero-bg`:
  ```css
  .hero-bg {
    background-image: url('../images/hero-roof.jpg');
  }
  ```
- **Inner page hero** — Set in `css/styles.css` on `.page-hero`:
  ```css
  .page-hero {
    background-image: url('../images/page-hero.jpg');
  }
  ```
- **About section photo** (800x600px) — Team or company photo
- **Service photos** (800x600px each) — One per service (6 total)
- **Gallery photos** (800x600px each) — 8-12 project photos
- **Team photos** (400x400px each) — Square headshots for the About page

### 3. Replace Text Content

Search for `<!-- REPLACE:` comments throughout the HTML files. These mark all placeholder text that should be updated with your real content, including:
- Company story and history
- Years of experience and stats
- Team member names and roles
- Customer testimonials
- Service area locations
- Business hours
- Pricing information in FAQ

### 4. Add Your Logo

In the navigation, replace the text logo with your image:
```html
<a href="index.html" class="nav-logo">
  <img src="images/logo.png" alt="Troyer's Contracting Logo" width="40" height="40">
  <h1>Troyer's <span>Contracting</span></h1>
</a>
```

### 5. Embed Google Map

1. Go to Google Maps and find your business location
2. Click "Share" > "Embed a map"
3. Copy the iframe code
4. Replace the map placeholder div content in `index.html` and `contact.html`

### 6. Social Media Links

Search for `aria-label="Facebook"`, `aria-label="Instagram"`, and `aria-label="Google Business"` to find the social links in the footer. Replace the `href="#"` with your actual profile URLs.

### 7. Set Up Form Handling

The forms currently show an alert on submit. To make them actually send data, choose one of these options:

**Option A — Formspree (easiest, free tier available):**
1. Sign up at formspree.io
2. Replace `action="#"` with `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Remove the JavaScript form handler in `js/main.js`

**Option B — Netlify Forms (if hosting on Netlify):**
1. Add `netlify` attribute to your `<form>` tags
2. Netlify automatically handles submissions

**Option C — Custom backend:**
1. Update the form handler in `js/main.js` to send data via `fetch()` to your API endpoint

### 8. Favicon

Add a favicon by placing `favicon.ico` in the root folder and adding this to the `<head>` of each HTML file:
```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

## Hosting

This is a static website (HTML, CSS, JS only) — no server or build step required. You can host it on:

- **Netlify** — Drag and drop the folder to deploy
- **GitHub Pages** — Push to a repo and enable Pages
- **Any web host** — Upload via FTP/cPanel
- **Local preview** — Open `index.html` directly in your browser

## Color Scheme

| Color | Hex | Usage |
|---|---|---|
| Charcoal Gray | `#333333` | Primary dark / text |
| Steel Blue | `#4A7C9B` | Secondary / accents |
| Burnt Orange | `#D4652E` | CTA buttons / highlights |
| White | `#FFFFFF` | Text on dark backgrounds |
| Light Gray | `#F5F5F5` | Alternating section backgrounds |

To change colors, edit the CSS custom properties at the top of `css/styles.css`:
```css
:root {
  --charcoal: #333333;
  --steel-blue: #4A7C9B;
  --burnt-orange: #D4652E;
  ...
}
```

## Typography

- **Headings:** Montserrat (Google Fonts)
- **Body text:** Roboto (Google Fonts)

These are loaded from Google Fonts CDN in each HTML file's `<head>`.

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge. Fully responsive from mobile (320px) to desktop (1200px+).
