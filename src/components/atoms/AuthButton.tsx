import React from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { v } from "../../styles/variables";

interface AuthButtonProps {
  compact?: boolean;
}

/**
 * AuthButton component with compact mode support
 * When compact=true, shows only the user avatar in collapsed sidebar
 */
export const AuthButton: React.FC<AuthButtonProps> = ({ compact = false }) => {
  const {
    isAuthenticated,
    isLoading,
    error,
    userDisplayName,
    userAvatar,
    signInWithGoogle,
    signOut,
    clearError,
  } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is already handled by the store
      console.log("Sign in cancelled or failed", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error is already handled by the store
      console.log("Sign out failed", error);
    }
  };

  if (isLoading) {
    return (
      <LoadingButton disabled>
        <LoadingSpinner />
        Loading...
      </LoadingButton>
    );
  }

  if (isAuthenticated) {
    // Compact mode: show only avatar
    if (compact) {
      return (
        <CompactUserContainer
          onClick={handleSignOut}
          title={`${userDisplayName} - Click to sign out`}
        >
          {userAvatar ? (
            <UserAvatar src={userAvatar} alt="User avatar" />
          ) : (
            <DefaultAvatar>{userDisplayName?.charAt(0) || "U"}</DefaultAvatar>
          )}
        </CompactUserContainer>
      );
    }

    // Full mode: show avatar + user info
    return (
      <UserContainer>
        {userAvatar ? (
          <UserAvatar src={userAvatar} alt="User avatar" />
        ) : (
          <DefaultAvatar>{userDisplayName?.charAt(0) || "U"}</DefaultAvatar>
        )}
        <UserInfo>
          <UserName>Hello, {userDisplayName}</UserName>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </UserInfo>
      </UserContainer>
    );
  }

  return (
    <Container>
      {error && (
        <ErrorMessage onClick={clearError}>
          {error} (Click to dismiss)
        </ErrorMessage>
      )}
      <SignInButton onClick={handleSignIn}>
        <v.iconogoogle />
        Sign in with Google
      </SignInButton>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontmd};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingButton = styled(SignInButton)`
  cursor: not-allowed;
  opacity: 0.7;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
`;

const CompactUserContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bg2};
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontmd};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontmd};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const SignOutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colorSubtitle};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontsm};
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffe6e6;
  color: #d00;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontsm};
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #ffd6d6;
  }
`;
