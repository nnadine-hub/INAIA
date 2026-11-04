INAIA — Home page
=================

Run it
  Double-click index.html, or open the folder in VS Code and use "Live Server".

Files
  index.html              page structure
  css/style.css           all styling (brand colors are at the top in :root)
  js/data.js              collection names, text, specs and plate positions  <- edit content here
  js/main.js              animations and interactions
  assets/logo.svg         INAIA logo (from Figma)
  js/icons.js             the plate / cup / vase icons used in the intro
  assets/products/*.webp  product photos with transparent backgrounds
  assets/lifestyle/*.webp lifestyle photos (left side of the collection pages)

Add a product photo
  1. Put a transparent .webp in assets/products/ (e.g. new-plate.webp)
  2. In js/data.js add it to a collection's photos: ['new-plate']
  3. To show it on the home page, add a line to PLATES

Font
  Larken loads from your Adobe Fonts kit (kki5hgi). Add your website domain to the
  kit in Adobe Fonts or it won't show. Until then the page uses Fraunces as a fallback.

Intro header
  Three icons side by side: cups, plates, vases, one product in each. Hovering turns the plate slowly (cups and vases stay still).
  - Which products appear in each icon:  INTRO in js/data.js
  - Time before the home page opens:  INTRO_TIME in js/data.js
  - Icon shapes:  js/icons.js (exported from Figma)

Lifestyle photos
  Put the photo in assets/lifestyle/ and add its name to LIFESTYLE_PHOTOS in js/data.js.
  A random one is shown each time a collection opens.
