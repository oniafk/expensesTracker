import React from "react";
import styled from "styled-components";
import { useTheme } from "../../hooks/useTheme";

/**
 * Styled button component with full theme typing support
 * Notice how TypeScript now provides autocomplete for theme properties
 */
const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.colorToggle};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontmd};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

/**
 * Theme Toggle Component
 * Demonstrates how to use the typed theme context
 */
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ToggleButton onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </ToggleButton>
  );
};
