"use client";
import React, { createContext, useState } from "react";
import Lista from "./components/listav0";

export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <h1>Home</h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      </button>

      <Lista />
    </ThemeContext.Provider>
  );
};

export default App;
