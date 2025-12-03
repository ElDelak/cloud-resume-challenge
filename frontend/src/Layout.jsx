import { useEffect } from "react";
import "./components/Header";
import Header from "comps/Header";
import ResumePage from "./components/pages/ResumePage";
import { Outlet, useLocation } from "react-router-dom";
import "css/default.css";

function Layout() {
  const location = useLocation();
  const path = location.pathname;
  const isHomepage = location.pathname === "/";

  let pageName = "";
  useEffect(() => {
    if (path === "/") {
      pageName = "home";
    } else if (path === "/resume") {
      pageName = "resume";
    } else if (path === "/projects") {
      pageName = "projects";
    } else if (/^\/projects\/[^/]+$/.test(path)) {
      // Matches /projects/:handle
      pageName = "project";
    } else if (/^\/blog\/\d{4}-\d{2}-\d{2}\/[^/]+$/.test(path)) {
      // Matches /blog/YYYY-MM-DD/:handle
      pageName = "blog_post";
    }
    document.body.setAttribute("location", pageName);
    return () => {
      document.body.removeAttribute("location");
    };
  }, [location]);

  return (
    <>
      <Header></Header>
      <div className="content_wrap">
        <div className="content">
          <article className={isHomepage ? 'tailwind-scope' : ''}>
            <Outlet />
          </article>
        </div>
      </div>
    </>
  );
}

export default Layout;
