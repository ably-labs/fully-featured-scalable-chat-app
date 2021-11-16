import { useState } from "react";

export function userPersistentState(storageKey: string, stateObject: any) {
  let storedData = localStorage.getItem(storageKey) || JSON.stringify(stateObject);

  const initialData = JSON.parse(storedData);
  const [state, setState] = useState(initialData);

  if (!state) {
    setState(stateObject);
  }

  const setAndPersistState = (newState: any) => {
    setState(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  return [state, setAndPersistState];
}
