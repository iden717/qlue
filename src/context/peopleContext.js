import { createContext, useReducer } from "react";

export const PeopleContext = createContext();
const initialState = {
  loading: true,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOADING_DONE":
      return { ...state, loading: false };
    case "IN_LOADING":
      return { ...state, loading: true };
    default:
      throw new Error();
  }
}
export default function PeopleContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PeopleContext.Provider value={[state, dispatch]}>
      {children}
    </PeopleContext.Provider>
  );
}
