import React from "react";
import { NavLink } from "react-router-dom";
import "css/pages/resume.css";
import resumeData from "data/resumeData.js";
import ResumeHeader from "comps/resume/ResumeHeader";
import ResumeSection from "comps/resume/ResumeSection";

export default function ResumePage() {
  return (
    <>
      <ResumeHeader person={resumeData.person}></ResumeHeader>
      <ResumeSection
        title="Education"
        handle="education"
        section={resumeData.sections.education}
      />
      <ResumeSection
        title="Experience"
        handle="experience"
        section={resumeData.sections.experience}
      />
      <ResumeSection
        title="Skills & Interests"
        handle="skills"
        section={resumeData.sections.skills}
      />
      <div className="disclaimer">
        This is an example résumé for instructional content and is not intended
        to be accurate.
      </div>
    </>
  );
}
