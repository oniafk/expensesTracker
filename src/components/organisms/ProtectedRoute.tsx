import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContextEnhanced";
import { LoginTemplate } from "../templates/LoginTemplate";

/**
 * Protected Route Component
 * Automatically handles authentication checks and redirects
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showLoadingSpinner?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
  showLoadingSpinner = true,
}) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  // Show loading spinner while initializing auth
  if (isLoading && showLoadingSpinner) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Initializing...</LoadingText>
      </LoadingContainer>
    );
  }

  // Show login if not authenticated and auth is not loading
  if (!isLoading && !isAuthenticated) {
    console.log("🛡️ ProtectedRoute - Redirecting to login");
    return fallback ? <>{fallback}</> : <LoginTemplate />;
  }

  // Show protected content if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Fallback state (shouldn't normally reach here)
  return (
    <ErrorContainer>
      <h2>Authentication Error</h2>
      <p>
        Unable to verify authentication status. Please try refreshing the page.
      </p>
    </ErrorContainer>
  );
};

/**
 * Higher-order component version for class components or functional composition
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ProtectedRoute>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Styled components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.bg2};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colorSubtitle};
  font-size: ${({ theme }) => theme.fontlg};
  margin: 0;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;

  h2 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 16px;
  }

  p {
    color: ${({ theme }) => theme.colorSubtitle};
    max-width: 400px;
  }
`;
