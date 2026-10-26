function ErrorState({ message }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center"
    >
      <p className="font-semibold text-rose-800">Unable to load gallery</p>
      <p className="mt-2 text-sm text-rose-700">{message}</p>
      <p className="mt-1 text-xs text-rose-600">
        Refresh the page to try again.
      </p>
    </div>
  );
}

export default ErrorState;
