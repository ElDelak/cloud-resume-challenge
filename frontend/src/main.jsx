import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "css/style.css";
import Layout from "./Layout.jsx";
import ResumePage from "./components/pages/ResumePage.jsx";

createRoot(document.querySelector("main")).render(
  <BrowserRouter>
    <Layout />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ResumePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
