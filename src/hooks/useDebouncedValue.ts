import { useState, useEffect } from 'react';

export const useDebouncedValue = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    if (value === '') {
      setDebounced(value);
      return;
    }

    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
