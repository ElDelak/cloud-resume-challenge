import { useState } from "react";
import "./components/Header";
import Header from "comps/Header";
import ResumePage from "./components/pages/ResumePage";
import { Outlet } from "react-router-dom";

function Layout() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <div className="content_wrap">
        <div className="content">
          <article>
            <Outlet></Outlet>
          </article>
        </div>
      </div>
    </>
  );
}

export default Layout;
