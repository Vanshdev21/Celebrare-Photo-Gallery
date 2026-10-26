import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Heart, Search, X } from "lucide-react";
import useFetchPhotos from "./hooks/useFetchPhotos.js";
import {
  favoritesReducer,
  getInitialFavorites,
  FAVORITES_STORAGE_KEY,
} from "./hooks/useFavoritesReducer.js";
import PhotoCard from "./components/PhotoCard.jsx";
import Header from "./components/Header.jsx";
import LoadingState from "./components/LoadingState.jsx";
import ErrorState from "./components/ErrorState.jsx";
import Footer from "./components/Footer.jsx";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites,
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleFavorite = useCallback((photo) => {
    dispatch({ type: "TOGGLE", photo });
  }, []);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((photo) => photo.id)),
    [favorites],
  );

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return photos.filter((photo) => {
      const matchesAuthor = photo.author
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesFavorite = !showFavoritesOnly || favoriteIds.has(photo.id);
      return matchesAuthor && matchesFavorite;
    });
  }, [photos, searchTerm, showFavoritesOnly, favoriteIds]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-9 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Discover
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Find your next favourite.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Browse photographs from the community. Search by author and save the
            ones you love.
          </p>
        </div>

        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Search photos by author</span>
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by author name…"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <button
            type="button"
            onClick={() => setShowFavoritesOnly((current) => !current)}
            aria-pressed={showFavoritesOnly}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              showFavoritesOnly
                ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <Heart
              size={17}
              fill={showFavoritesOnly ? "currentColor" : "none"}
            />
            Favourites
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${showFavoritesOnly ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              {favorites.length}
            </span>
          </button>
        </div>

        {!loading && !error && (
          <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
            <p>
              {showFavoritesOnly ? "Your favourites" : "All photos"}{" "}
              <span className="mx-1">·</span> {filteredPhotos.length}{" "}
              {filteredPhotos.length === 1 ? "photo" : "photos"}
            </p>
            {(searchTerm || showFavoritesOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setShowFavoritesOnly(false);
                }}
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favoriteIds.has(photo.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              {showFavoritesOnly ? <Heart size={21} /> : <Search size={21} />}
            </div>
            <h3 className="mt-4 font-semibold text-slate-800">
              No photos found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {showFavoritesOnly
                ? "You haven't saved any matching favourites yet."
                : "Try searching with a different author name."}
            </p>
          </div>
        )}
      </section>
      <Footer></Footer>
    </main>
  );
}
