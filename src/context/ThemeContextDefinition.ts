import { createContext } from "react";
import type { IThemeContext } from "../types/theme.types";
import { Light } from "../styles/themes";

/**
 * Theme Context - provides theme state and functions throughout the app
 * Using a default value that matches our interface instead of null
 */
export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
  themeStyle: Light,
});
