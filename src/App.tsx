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
        {/* Desktop Sidebar */}
        <DesktopSidebarWrapper>
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            isMobile={false}
          />
        </DesktopSidebarWrapper>

        {/* Mobile Menu */}
        <MobileMenuWrapper>
          <MobileMenu />
        </MobileMenuWrapper>

        {/* Main Content */}
        <MainContent $sidebarOpen={isSidebarOpen}>
          <AppRoutes />
        </MainContent>
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

interface MainContentProps {
  $sidebarOpen: boolean;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal};

  @media ${Breakpoints.tablet} {
    grid-template-columns: auto 1fr;
  }
`;

const DesktopSidebarWrapper = styled.aside`
  display: none;

  @media ${Breakpoints.tablet} {
    display: block;
    grid-column: 1;
  }
`;

const MobileMenuWrapper = styled.aside`
  display: block;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;

  @media ${Breakpoints.tablet} {
    display: none;
  }
`;

const MainContent = styled.main<MainContentProps>`
  grid-column: 1;
  width: 100%;
  padding: 60px 20px 20px 20px; /* Top padding for mobile menu */

  @media ${Breakpoints.tablet} {
    grid-column: 2;
    padding: 20px;
    margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? "250px" : "65px")};
    transition: margin-left 0.3s ease;
  }
`;

export default App;
