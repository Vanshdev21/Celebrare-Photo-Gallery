# Celebrare Photo Gallery

A responsive photo gallery built for the Celebrare Frontend React Internship pre-screening assignment.

## Requirements covered

- React + Vite project, styled with Tailwind CSS only (no UI component library)
- Fetches 30 photos from `https://picsum.photos/v2/list?limit=30`
- Loading and error states
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
- Live author-name filtering without additional API requests
- Favourites managed with `useReducer` and persisted to `localStorage`
- `useFetchPhotos` custom hook returning `{ photos, loading, error }`
- `useCallback` for the search handler and favourite toggle handler
- `useMemo` for the filtered list and favourite ID lookup

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

To check a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    PhotoCard.jsx
  hooks/
    useFetchPhotos.js
    useFavoritesReducer.js
  Gallery.jsx
  index.css
  main.jsx
```

## Notes for your recording

Be prepared to explain the custom fetch hook, reducer actions (`TOGGLE`), localStorage persistence, `useCallback`, and `useMemo` in your own words. Test the app in the browser and record your own screen walkthrough before submitting. AI assistance is permitted by the assignment, but you should understand the code you submit.

## Submission checklist

1. Run the app and check loading, search, favourite toggling, and refresh persistence.
2. Run `npm run build` and resolve any errors.
3. Push the project to a **public** GitHub repository.
4. Record a 5-minute screen walkthrough and upload it to Google Drive or YouTube as unlisted.
5. Submit both links using the Google Form provided by Celebrare, within 24 hours of receiving the assignment.
