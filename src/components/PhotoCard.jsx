import { Heart } from "lucide-react";

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(photo)}
          aria-label={isFavorite ? `Remove ${photo.author} photo from favourites` : `Add ${photo.author} photo to favourites`}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isFavorite
              ? "bg-rose-50 text-rose-600"
              : "bg-white/95 text-slate-600 hover:bg-white hover:text-rose-600"
          }`}
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} strokeWidth={2} />
        </button>
      </div>
      <div className="px-4 py-3.5">
        <p className="truncate text-sm font-semibold text-slate-800">{photo.author}</p>
        <p className="mt-1 text-xs text-slate-500">Photo #{photo.id}</p>
      </div>
    </article>
  );
}