import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ThemeContextProvider } from "./context/ThemeContext";
import { useTheme } from "./hooks/useTheme";
import { AppRoutes } from "./routes/AppRoutes";
import { Sidebar, Breakpoints, MobileMenu } from "./index";
/**
 * App Content Component - separated to use theme context
 * This pattern is necessary because we need to consume the ThemeContext
 * from within a component that's wrapped by the ThemeContextProvider
 */
const AppContent: React.FC = () => {
  // Use our custom hook to access theme data with full type safety
  const { themeStyle } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={themeStyle}>
      <Container>
        <aside className="Container__sidebar">
          <Sidebar />
        </aside>
        <aside className="Container__mobile-menu">
          <MobileMenu />
        </aside>
        <Containerbody>
          <AppRoutes />
        </Containerbody>
      </Container>
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .Container__sidebar {
    display: none;
  }
  .Container__mobile-menu {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Breakpoints.tablet} {
    grid-template-columns: 65px 1fr;
    .Container__sidebar {
      display: initial;
    }
    .Container__mobile-menu {
      display: none;
    }
  }
`;

const Containerbody = styled.div`
  width: 100%;
  @media ${Breakpoints.tablet} {
    grid-column: 2;
  }
`;

export default App;
