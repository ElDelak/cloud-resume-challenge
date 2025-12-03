import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Layout from "./Layout.jsx";

import ResumePage from "pages/ResumePage";
import HomePage from "pages/HomePage.jsx";
import ProjectsPage from "pages/ProjectsPage.jsx";
import ProjectPage from "pages/ProjectPage.jsx";
import PostPage from "pages/PostPage.jsx";

createRoot(document.querySelector("main")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:handle" element={<ProjectPage />} />
        <Route path="/blog/:date/:handle" element={<PostPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
