import React from "react";
import { NavLink } from "react-router-dom";
import "css/pages/home.css";
import me from "images/me.jpeg";

export default function HomePage() {
  return (
    <>
      <div className="profile_photo">
        <img src={me} alt="A photo of me" className="profile-photo" />
      </div>
    </>
  );
}
