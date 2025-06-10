import React, { useState } from "react";
import type {
  IThemeContext,
  ThemeMode,
  ThemeContextProviderProps,
} from "../types/theme.types";
import { Light, Dark } from "../styles/themes";
import { ThemeContext } from "./ThemeContextDefinition";

/**
 * Theme Context Provider Component
 * Manages theme state and provides it to child components
 *
 * @param children - React components that need access to theme
 */
export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  // State to track current theme mode
  const [theme, setTheme] = useState<ThemeMode>("light");

  // Determine which theme object to use based on current mode
  const themeStyle = theme === "light" ? Light : Dark;

  // Context value object that will be provided to consumers
  const contextValue: IThemeContext = {
    theme,
    setTheme,
    themeStyle,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
