import { useState, useEffect } from "react";

export function useLocalStorage(initialValue, key) {
  const [data, setData] = useState(function () {
    const localStorageValue = JSON.parse(localStorage.getItem(key));
    return localStorageValue ? localStorageValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}
