import React, { useMemo, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "../../utils/SideBarData";
import "./Drawer.css";

function Drawer() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();

  const showSidebar = () => setSidebar(!sidebar);
  const iconContextValue = useMemo(() => ({ color: "#fff" }), []);

  return (
    <IconContext.Provider value={iconContextValue}>
      <div className="navbar">
        <button className="menu-bars" onClick={showSidebar}>
          <FaIcons.FaBars />
        </button>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <div onClick={showSidebar} className="navbar-content">
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <button className="menu-bars menu-bar-close">
                <AiIcons.AiOutlineClose />
              </button>
            </li>
            {SidebarData.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={`${item.cName} ${isActive ? "active" : ""}`}
                  style={{ marginTop: index === 7 ? "50px" : "0" }}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </IconContext.Provider>
  );
}

export default Drawer;
