import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login, Home } from "../index";
import { ProtectedRoute } from "../components/organisms/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

/**
 * Enhanced App Routes with modern authentication patterns
 * Uses the new Zustand-based authentication system
 */
export function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Legacy route support */}
        <Route
          path="/asd"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Root redirect logic */}
        <Route path="/" element={<RootRedirect />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * Public Route Component
 * Redirects authenticated users away from public pages like login
 */
interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/home",
}) => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Wait for auth to initialize
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  // Redirect authenticated users away from public routes
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

/**
 * Smart Root Redirect
 * Sends users to appropriate page based on auth status
 */
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Wait for auth to initialize before redirecting
  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  // Redirect based on authentication status
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
};

/**
 * Legacy export for backwards compatibility
 * @deprecated Use AppRoutes instead
 */
export const MyRoutes = AppRoutes;
