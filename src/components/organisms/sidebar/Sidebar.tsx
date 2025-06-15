import { memo, useCallback } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { v, LinksArray, SecondarylinksArray } from "../../../index";
import { useTheme } from "../../../hooks/useTheme";
import { AuthButton } from "../../atoms/AuthButton";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

export const Sidebar = memo<SidebarProps>(
  ({ isOpen = false, onToggle, isMobile = false }) => {
    const { theme, setTheme } = useTheme();
    const location = useLocation();

    const handleThemeToggle = useCallback(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    }, [theme, setTheme]);

    const handleLinkClick = useCallback(() => {
      // Close mobile menu when link is clicked
      if (isMobile && onToggle) {
        onToggle();
      }
    }, [isMobile, onToggle]);

    return (
      <Container $isOpen={isOpen} $isMobile={isMobile}>
        {/* Logo Section */}
        <LogoSection>
          <LogoWrapper $isOpen={isOpen} onClick={onToggle}>
            <img src={v.logo} alt="Expenses Tracker Logo" />
          </LogoWrapper>
          <AppTitle $isOpen={isOpen}>Expenses</AppTitle>
        </LogoSection>

        {/* Navigation Links */}
        <NavigationSection>
          <NavList>
            {LinksArray.map(({ icon, label, to }) => (
              <NavItem key={label}>
                <StyledNavLink
                  to={to}
                  onClick={handleLinkClick}
                  $isActive={location.pathname === to}
                  $isOpen={isOpen}
                >
                  <NavIcon>{icon}</NavIcon>
                  <NavLabel $isOpen={isOpen}>{label}</NavLabel>
                </StyledNavLink>
              </NavItem>
            ))}
          </NavList>

          <Divider />

          {/* Secondary Links */}
          <SecondaryNavList>
            {SecondarylinksArray.map(({ icon, label, to }) => (
              <NavItem key={label}>
                <StyledNavLink
                  to={to}
                  onClick={handleLinkClick}
                  $isActive={location.pathname === to}
                  $isOpen={isOpen}
                >
                  <NavIcon>{icon}</NavIcon>
                  <NavLabel $isOpen={isOpen}>{label}</NavLabel>
                </StyledNavLink>
              </NavItem>
            ))}
          </SecondaryNavList>
        </NavigationSection>

        {/* Theme Toggle & Auth Section */}
        <FooterSection $isOpen={isOpen}>
          <ThemeToggleSection $isOpen={isOpen}>
            <ThemeToggleButton
              onClick={handleThemeToggle}
              $isOpen={isOpen}
              aria-label="Toggle theme"
            >
              <ThemeIcon $isOpen={isOpen}>
                {theme === "light" ? "🌚" : "🌞"}
              </ThemeIcon>
              <ThemeLabel $isOpen={isOpen}>
                {theme === "light" ? "Dark" : "Light"}
              </ThemeLabel>
            </ThemeToggleButton>
          </ThemeToggleSection>

          <AuthSection $isOpen={isOpen}>
            <AuthButton compact={!isOpen} />
          </AuthSection>
        </FooterSection>
      </Container>
    );
  }
);

Sidebar.displayName = "Sidebar";

// Styled Components
interface ContainerProps {
  $isOpen: boolean;
  $isMobile: boolean;
}

const Container = styled.div<ContainerProps>`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  width: ${({ $isOpen, $isMobile }) => {
    if ($isMobile) return $isOpen ? "280px" : "0";
    return $isOpen ? "250px" : "65px";
  }};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  transition: all 0.3s ease;
  border-right: 1px solid ${({ theme }) => theme.bg4};
  display: flex;
  flex-direction: column;
  transform: ${({ $isMobile, $isOpen }) =>
    $isMobile && !$isOpen ? "translateX(-100%)" : "translateX(0)"};
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.bg4};
`;

interface LogoWrapperProps {
  $isOpen: boolean;
}

const LogoWrapper = styled.div<LogoWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "scale(0.8)" : "scale(1)")}
    rotate(${({ theme }) => theme.logorotate || "0deg"});

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

interface AppTitleProps {
  $isOpen: boolean;
}

const AppTitle = styled.h2<AppTitleProps>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  margin: 10px 0 0 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  transition: opacity 0.3s ease;
`;

const NavigationSection = styled.nav`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SecondaryNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

interface StyledNavLinkProps {
  $isActive: boolean;
  $isOpen: boolean;
}

const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${({ theme, $isActive }) => ($isActive ? theme.bg5 : theme.text)};
  text-decoration: none;
  border-radius: 8px;
  margin: 0 10px;
  transition: all 0.3s ease;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? `${theme.primary}20` : "transparent"};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? `${theme.primary}30` : theme.bg4};
    color: ${({ theme }) => theme.primary};
  }
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  min-width: 24px;
`;

interface NavLabelProps {
  $isOpen: boolean;
}

const NavLabel = styled.span<NavLabelProps>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.3s ease;
`;

const Divider = styled.div`
  height: 1px;
  width: calc(100% - 40px);
  background: ${({ theme }) => theme.bg4};
  margin: 20px auto;
`;

interface FooterSectionProps {
  $isOpen: boolean;
}

const FooterSection = styled.div<FooterSectionProps>`
  padding: ${({ $isOpen }) => ($isOpen ? "20px" : "20px 5px")};

  border-top: 1px solid ${({ theme }) => theme.bg4};
  display: flex;
  flex-direction: ${({ $isOpen }) => ($isOpen ? "column" : "column")};
  align-items: ${({ $isOpen }) => ($isOpen ? "stretch" : "center")};
  gap: ${({ $isOpen }) => ($isOpen ? "15px" : "10px")};
`;

interface ThemeToggleSectionProps {
  $isOpen: boolean;
}

const ThemeToggleSection = styled.div<ThemeToggleSectionProps>`
  margin-bottom: ${({ $isOpen }) => ($isOpen ? "15px" : "0")};
`;

interface ThemeToggleButtonProps {
  $isOpen: boolean;
}

const ThemeToggleButton = styled.button<ThemeToggleButtonProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")};
  width: ${({ $isOpen }) => ($isOpen ? "100%" : "40px")};
  height: ${({ $isOpen }) => ($isOpen ? "auto" : "40px")};
  padding: ${({ $isOpen }) => ($isOpen ? "10px" : "8px")};
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bg2};
  }
`;

const ThemeIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 16px;
  margin-right: ${({ $isOpen }) => ($isOpen ? "8px" : "0")};
`;

interface ThemeLabelProps {
  $isOpen: boolean;
}

const ThemeLabel = styled.span<ThemeLabelProps>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  font-size: 14px;
`;

interface AuthSectionProps {
  $isOpen: boolean;
}

const AuthSection = styled.div<AuthSectionProps>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isOpen }) => ($isOpen ? "stretch" : "center")};
`;
