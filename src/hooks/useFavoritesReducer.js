export const FAVORITES_STORAGE_KEY = "celebrare-photo-gallery-favorites";

function readStoredFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const alreadyFavorite = state.some((photo) => photo.id === action.photo.id);
      return alreadyFavorite
        ? state.filter((photo) => photo.id !== action.photo.id)
        : [...state, action.photo];
    }
    case "LOAD":
      return action.photos;
    default:
      return state;
  }
}

export function getInitialFavorites() {
  return readStoredFavorites();
}