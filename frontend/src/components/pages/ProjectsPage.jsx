import React from "react";
import { NavLink } from "react-router-dom";
import "css/pages/home.css";
import projectsData from "data/projectsData";
import ProjectItem from "comps/ProjectItem";

export default function ProjectsPage() {
  return (
    <>
      <h1 className="fancy">Khaled Mabrouk's Projects</h1>
      <div class="projects">
        {projectsData.map((project) => (
          <ProjectItem key={project.handle} project={project} />
        ))}
      </div>
    </>
  );
}
