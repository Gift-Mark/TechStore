import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [result, setResult] = useState({
    url: null,
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setResult({ url, data, loading: false, error: null });
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setResult({ url, data: null, loading: false, error: err.message });
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  if (result.url !== url) {
    return { data: null, loading: true, error: null };
  }

  return { data: result.data, loading: result.loading, error: result.error };
}