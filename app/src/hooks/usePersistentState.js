import { useState } from "react";

export function userPersistentState(storageKey, stateObject) {
  let storedData = localStorage.getItem(storageKey) || JSON.stringify(stateObject);

  const initialData = JSON.parse(storedData);
  const [state, setState] = useState(initialData);

  if (!state) {
    setState(stateObject);
  }

  const setAndPersistState = (newState) => {
    setState(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  return [state, setAndPersistState];
}
