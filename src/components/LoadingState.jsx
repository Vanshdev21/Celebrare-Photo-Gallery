function LoadingState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white">
      <span
        className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
        role="status"
        aria-label="Loading photos"
      />
      <p className="text-sm text-slate-600">Loading photos…</p>
    </div>
  );
}

export default LoadingState;
