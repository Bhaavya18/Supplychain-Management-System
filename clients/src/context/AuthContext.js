import { createContext, useEffect, useReducer } from "react";
const INITIAL_STATE = {
  business: JSON.parse(localStorage.getItem("business")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        business: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        business: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        business: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        business: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("business", JSON.stringify(state.business));
  }, [state.business]);

  return (
    <AuthContext.Provider
      value={{
        business: state.business,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
