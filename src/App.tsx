import { MyRoutes } from "./index";
import React from "react";
import { ThemeProvider } from "styled-components";
import { ThemeContextProvider } from "./context/ThemeContext";
import { useTheme } from "./hooks/useTheme";

/**
 * App Content Component - separated to use theme context
 * This pattern is necessary because we need to consume the ThemeContext
 * from within a component that's wrapped by the ThemeContextProvider
 */
const AppContent: React.FC = () => {
  // Use our custom hook to access theme data with full type safety
  const { themeStyle } = useTheme();

  return (
    <ThemeProvider theme={themeStyle}>
      <MyRoutes />
    </ThemeProvider>
  );
};

/**
 * Main App Component
 * Provides theme context to the entire application
 */
function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
