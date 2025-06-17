/**
 * User Profile Component - Demo of User Personalization System
 * Shows how to use the new user data management hooks
 */

import React from "react";
import styled from "styled-components";
import { useCurrentUser } from "../../context/UserContext";
import { useUpdateUser, useCreateAccount } from "../../hooks/useUserData";
import { useTheme } from "../../hooks/useTheme";
import {
  useUserCurrency,
  useUserCountry,
  useTotalBalance,
} from "../../store/UserStore";
import { Theme, type Currency, type Country } from "../../types/database.types";
import type { ThemeMode } from "../../types/theme.types";

export const UserProfileDemo: React.FC = () => {
  const { user, isLoading } = useCurrentUser();
  const currency = useUserCurrency();
  const country = useUserCountry();
  const totalBalance = useTotalBalance();
  const { theme: currentThemeMode, setTheme: setThemeMode } = useTheme();

  const updateUserMutation = useUpdateUser();
  const createAccountMutation = useCreateAccount();

  // Convert database theme to display theme
  const getCurrentDatabaseTheme = (): Theme => {
    if (!user) return Theme.LIGHT;
    return user.theme;
  };

  // Convert ThemeMode to database theme for saving
  const databaseThemeToThemeMode = (dbTheme: Theme): ThemeMode => {
    switch (dbTheme) {
      case Theme.LIGHT:
        return "light";
      case Theme.DARK:
        return "dark";
      case Theme.SYSTEM:
        // For system theme, determine actual theme based on system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      default:
        return "light";
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    // Update user preferences in database
    if (user) {
      updateUserMutation.mutate({
        userId: user.id,
        updates: { theme: newTheme },
      });
    }

    // Update local theme context (except for system theme)
    if (newTheme !== Theme.SYSTEM) {
      const themeMode = databaseThemeToThemeMode(newTheme);
      setThemeMode(themeMode);
    } else {
      // For system theme, set based on system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setThemeMode(systemTheme);
    }
  };

  const toggleTheme = () => {
    const currentDbTheme = getCurrentDatabaseTheme();
    const newTheme = currentDbTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    handleThemeChange(newTheme);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    if (user) {
      updateUserMutation.mutate({
        userId: user.id,
        updates: { currency: newCurrency },
      });
    }
  };

  const handleCountryChange = (newCountry: Country) => {
    if (user) {
      updateUserMutation.mutate({
        userId: user.id,
        updates: { country: newCountry },
      });
    }
  };

  const handleCreateAccount = () => {
    if (user) {
      createAccountMutation.mutate({
        description: "New Account",
        balance: 100,
        idUser: user.id,
        icon: "💳",
      });
    }
  };

  if (isLoading) {
    return <LoadingContainer>Loading user profile...</LoadingContainer>;
  }

  if (!user) {
    return <ErrorContainer>No user found. Please log in.</ErrorContainer>;
  }

  return (
    <Container>
      <ProfileHeader>
        <UserAvatar src={user.picture} alt={user.name} />
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
      </ProfileHeader>

      <PreferencesSection>
        <SectionTitle>Personalization Preferences</SectionTitle>

        <PreferenceGroup>
          <Label>Theme</Label>
          <ThemeButtons>
            <ThemeButton
              $active={getCurrentDatabaseTheme() === Theme.LIGHT}
              onClick={() => handleThemeChange(Theme.LIGHT)}
            >
              Light
            </ThemeButton>
            <ThemeButton
              $active={getCurrentDatabaseTheme() === Theme.DARK}
              onClick={() => handleThemeChange(Theme.DARK)}
            >
              Dark
            </ThemeButton>
            <ThemeButton
              $active={getCurrentDatabaseTheme() === Theme.SYSTEM}
              onClick={() => handleThemeChange(Theme.SYSTEM)}
            >
              System
            </ThemeButton>
          </ThemeButtons>
          <CurrentTheme>Current: {currentThemeMode}</CurrentTheme>
        </PreferenceGroup>

        <PreferenceGroup>
          <Label>Currency</Label>
          <Select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
          >
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </Select>
        </PreferenceGroup>

        <PreferenceGroup>
          <Label>Country</Label>
          <Select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value as Country)}
          >
            <option value="Australia">Australia</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="Other">Other</option>
          </Select>
        </PreferenceGroup>
      </PreferencesSection>

      <AccountsSection>
        <SectionTitle>Account Summary</SectionTitle>
        <TotalBalance>
          Total Balance: {totalBalance.toFixed(2)} {currency}
        </TotalBalance>

        <ActionButton onClick={handleCreateAccount}>
          {createAccountMutation.isPending
            ? "Creating..."
            : "Create New Account"}
        </ActionButton>
      </AccountsSection>

      <ActionsSection>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionButton onClick={toggleTheme}>Toggle Theme</ActionButton>
      </ActionsSection>

      {(updateUserMutation.isPending || createAccountMutation.isPending) && (
        <LoadingOverlay>Updating...</LoadingOverlay>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: ${({ theme }) => theme.primary};
  border-radius: 10px;
  color: white;
`;

const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div``;

const UserName = styled.h2`
  margin: 0 0 5px 0;
  font-size: 1.5rem;
`;

const UserEmail = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const PreferencesSection = styled.div`
  margin-bottom: 30px;
`;

const AccountsSection = styled.div`
  margin-bottom: 30px;
`;

const ActionsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.primary};
`;

const PreferenceGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ThemeButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
`;

const ThemeButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ $active, theme }) =>
    $active ? theme.primary : "transparent"};
  color: ${({ $active, theme }) => ($active ? "white" : theme.primary)};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const CurrentTheme = styled.small`
  color: ${({ theme }) => theme.colorSubtitle};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.bg4};
  border-radius: 5px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TotalBalance = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 15px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-right: 10px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colorSubtitle};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #ff4444;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.1rem;
  border-radius: 10px;
`;
