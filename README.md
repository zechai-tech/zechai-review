# Zee Chai — Google Review Helper Page

A lightweight, high-performance static web application built for **Zee Chai** outlets across Kerala. It helps customers leave Google reviews quickly via QR codes placed at tables or counters.

---

## 🚀 Key Features

- **Zero Latency / Offline-Ready:** Pure static HTML, CSS, and Vanilla JavaScript. Zero backend, zero database, zero external API calls.
- **Multi-Outlet Support via URL Parameters:** 
  - Access via `?outlet=taliparamba` (e.g. `https://review.zechai.in?outlet=taliparamba`).
  - Automatically loads the outlet's name, Google review link, and manager WhatsApp contact.
  - Fallback outlet selector screen if no query parameter or an invalid outlet is provided.
- **Smart Sentiment-Based Flow:**
  - **All Positive Tags Selected:** Generates a natural review draft stitched from an extensive variation bank (zero mention of "AI"). Customers can edit, click "Try different words" 🔄, and one-tap **Copy & Open Google**.
  - **Any Negative / Critical Tag Selected:** Bypasses draft generation. Provides a blank note box and a direct one-tap **WhatsApp message to the outlet manager** so issues can be resolved privately, alongside the option to post publicly.
- **Resilient Clipboard API:** Seamlessly works on iOS Safari, Android Chrome, and in-app QR scanner browsers with fallback support.
- **Mobile-First Design:** Designed for 360–430px smartphone viewports with touch-friendly 48px+ targets, warm chai orange branding (`#E8650A`), cream accents (`#FFF8F0`), and rounded cards.
- **Strict Brand Integrity:** Chai cup decorative motifs only (no plates or snacks imagery).

---

## 📁 File Structure

```
zechai-review/
├── index.html        # Main markup, semantic sections, modal views & placeholders
├── style.css         # Mobile-first stylesheet with Zee Chai color palette
├── script.js         # Outlet routing, tag selection, sentence engine & clipboard actions
└── README.md         # Documentation & guide
```

---

## 📍 How to Add New Outlets

Open `script.js` and locate `const outlets`. Add new outlets using this structure:

> [!IMPORTANT]
> The Google review URL must open the review FORM directly. To get it:
> 1. Google search the outlet name (e.g., 'Zechai Taliparamba')
> 2. On the Google result, click 'Write a review' on the business card
> 3. When the review popup opens, copy the full URL from the address bar
> 4. That URL (usually contains `#lrd=` at the end) is what goes in `googleReviewUrl`

```javascript
const outlets = {
  "taliparamba": {
    id: "taliparamba",
    name: "Zechai Taliparamba",
    shortName: "Taliparamba",
    googleReviewUrl: "https://www.google.com/search?q=Zechai+Thaliparamba#lrd=0x3ba43f00568c4b99:0x23ede12e97b98f4d,3,,,,",
    whatsapp: "918086052565" // Format: Country code + number without +
  },
  "kannur": {
    id: "kannur",
    name: "Zechai Kannur",
    shortName: "Kannur",
    googleReviewUrl: "https://www.google.com/search?q=Zechai+Kannur#lrd=...,3,,,,",
    whatsapp: "919876543210"
  }
};
```

Once added, the outlet will automatically work with:
`https://review.zechai.in?outlet=kannur`
and also appear automatically in the fallback outlet selector screen.

---

## 🎨 Asset Replacement Guide

All placeholders are marked with explicit comments:

1. **Logo:**
   - In `index.html`, find `<!-- REPLACE: ZEE CHAI LOGO -->`.
   - Swap the inline SVG with `<img src="logo.png" alt="Zee Chai" class="brand-logo-img">`.
2. **Background / Hero Chai Cup Illustration:**
   - In `index.html`, find `<!-- REPLACE: CHAI CUP ILLUSTRATION -->`.
   - Swap the inline SVG with your custom PNG/SVG illustration.
3. **Google Review Link & WhatsApp:**
   - In `script.js`, find `// REPLACE: GOOGLE_REVIEW_URL` and `// REPLACE: WHATSAPP NUMBER`.

---

## 📱 QR Code Generation Guide

For each physical outlet, generate a QR code pointing to its URL:

| Outlet | QR Code Target URL |
|---|---|
| **Palakkad** | `https://review.zechai.in?outlet=palakkad` |
| **Taliparamba** | `https://review.zechai.in?outlet=taliparamba` |
| **Default / Fallback** | `https://review.zechai.in` |

---

## 🌐 Deployment to Vercel

1. Push this directory to your GitHub / GitLab repository.
2. In Vercel, click **Add New Project** → Import repository.
3. Keep default settings (Framework preset: `Other`, build command: empty, output directory: `./`).
4. Set custom domain to `review.zechai.in` in Vercel project settings.
