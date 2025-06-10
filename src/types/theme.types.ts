/**
 * Theme interface defining all available theme properties
 * This ensures type safety across your entire application
 */
export interface ITheme {
  // Layout and basic colors
  body: string;
  text: string;
  bodyRgba: string;
  textRgba: string;

  // UI Elements
  carouselColor: string;
  navHeight: string;
  whiteBg: string;
  primary: string;

  // Background variations
  bg: string;
  bgAlpha: string;
  bg2: string;
  bg3: string;
  bg4: string;
  bg5: string;
  bgtotal: string;
  bgtgderecha: string;

  // Typography
  fontxs: string;
  fontsm: string;
  fontmd: string;
  font16px: string;
  fontlg: string;
  fontxl: string;
  fontxxl: string;
  fontxxxl: string;
  fontButton: string;

  // Interactive elements
  colorToggle: string;
  translateToggle: string;
  colorSubtitle: string;

  // Animations and transforms
  logorotate: string;
  slideroffset: string;
  sizeoficon: string;
}

/**
 * Theme mode type - restricts to only valid theme names
 */
export type ThemeMode = "light" | "dark";

/**
 * Theme context value interface
 * Defines what the context provides to consuming components
 */
export interface IThemeContext {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeStyle: ITheme;
}

/**
 * Props for theme context provider
 */
export interface ThemeContextProviderProps {
  children: React.ReactNode;
}
