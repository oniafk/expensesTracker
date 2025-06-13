import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Home } from "../index";
import { ProtectedRoute } from "../components/organisms/ProtectedRoute";
import type { JSX } from "react";

/**
 * Simple Routes Component (Legacy)
 * @deprecated Use AppRoutes from ./AppRoutes.tsx for new features
 */
export function SimpleRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asd"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
