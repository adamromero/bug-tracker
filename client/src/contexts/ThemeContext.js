import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
   darkMode: false,
};

const themeReducer = (state, action) => {
   switch (action.type) {
      case "TOGGLE_THEME":
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
