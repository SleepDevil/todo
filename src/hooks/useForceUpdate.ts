import { useReducer } from "react";

function useForceUpdate() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
}

export { useForceUpdate };
