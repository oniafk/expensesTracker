import React from "react";
import { Home, Login } from "../index";

/**
 * Route Configuration Types
 */
export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  protected: boolean;
  title?: string;
  description?: string;
  requiresRole?: string[];
}

/**
 * Application Route Configuration
 * Centralized route definitions for easy management
 */
export const routeConfig: RouteConfig[] = [
  {
    path: "/",
    component: () => null, // Will be handled by RootRedirect
    protected: false,
    title: "Home",
    description: "Application home page",
  },
  {
    path: "/login",
    component: Login,
    protected: false,
    title: "Login",
    description: "User authentication page",
  },
  {
    path: "/home",
    component: Home,
    protected: true,
    title: "Dashboard",
    description: "Main application dashboard",
  },
  {
    path: "/dashboard",
    component: Home,
    protected: true,
    title: "Dashboard",
    description: "User dashboard",
  },
  {
    path: "/asd", // Legacy route
    component: Home,
    protected: true,
    title: "Legacy Page",
    description: "Legacy route for backwards compatibility",
  },
];

/**
 * Route Groups for Role-Based Access Control (Future Enhancement)
 */
export const routeGroups = {
  public: routeConfig.filter((route) => !route.protected),
  protected: routeConfig.filter((route) => route.protected),
  admin: routeConfig.filter((route) => route.requiresRole?.includes("admin")),
} as const;

/**
 * Route Helper Functions
 */
export const getRouteByPath = (path: string) =>
  routeConfig.find((route) => route.path === path);

export const getProtectedRoutes = () =>
  routeConfig.filter((route) => route.protected);

export const getPublicRoutes = () =>
  routeConfig.filter((route) => !route.protected);

/**
 * Navigation Helper (for use with router navigation)
 */
export const navigationPaths = {
  home: "/home",
  login: "/login",
  dashboard: "/dashboard",
  root: "/",
} as const;

export type NavigationPath =
  (typeof navigationPaths)[keyof typeof navigationPaths];
