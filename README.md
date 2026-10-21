# Deutsche Autos – German cars landing page (React + Vite)

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Effects and where they live
- Smooth scrolling, parallax, cinematic scroll, zoom in/out, fade: `src/App.jsx` (one requestAnimationFrame loop)
- Aurora, rotation (spinning rims), orbit, glass: `src/styles.css`
- 3D object carousel: `src/components/Carousel.jsx`
- 3D tilt: `src/components/Tilt.jsx`
- Fade in/out on scroll: `src/components/Reveal.jsx`

## Change the cars
Replace the images in `public/cars/` (keep the names) or edit `src/data.js`.
Transparent PNGs work best: change the extensions in `src/data.js`.
