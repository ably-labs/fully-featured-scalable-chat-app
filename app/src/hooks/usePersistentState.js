import { useState, useEffect } from "react";

export function userPersistentState(storageKey, stateObject) {
  let storedData = localStorage.getItem(storageKey) || JSON.stringify(stateObject);

  const initialData = JSON.parse(storedData);
  const [state, setState] = useState(initialData);

  if (!state) {
    setState(stateObject);
  }

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
