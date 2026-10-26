import { useEffect, useState } from "react";

const PHOTOS_URL = "https://picsum.photos/v2/list?limit=30";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(PHOTOS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Could not load photos (HTTP ${response.status}).`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("We couldn’t load the photos. Check your connection and try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}