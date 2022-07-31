import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
   darkMode: JSON.parse(localStorage.getItem("darkMode"))
      ? JSON.parse(localStorage.getItem("darkMode"))
      : false,
};

const themeReducer = (state, action) => {
   switch (action.type) {
      case "TOGGLE_THEME":
         localStorage.setItem("darkMode", !state.darkMode);
         console.log("darkMode: ", !state.darkMode);
         return {
            ...state,
            darkMode: !state.darkMode,
         };
      default:
         return state;
   }
};

export const ThemeProvider = ({ children }) => {
   const [state, dispatch] = useReducer(themeReducer, initialState);
   return (
      <ThemeContext.Provider value={{ state, dispatch }}>
         {children}
      </ThemeContext.Provider>
   );
};
