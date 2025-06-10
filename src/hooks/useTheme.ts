import { useContext } from "react";
import type { IThemeContext } from "../types/theme.types";
import { ThemeContext } from "../context/ThemeContextDefinition";

/**
 * Custom hook to use theme context
 * This provides a clean way to access theme data in components
 * and includes error checking
 */
export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
};
