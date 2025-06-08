import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Home } from "../index";
import type { JSX } from "react";

export function MyRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/asd" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
