import React from "react";
import Constants from "../../utils/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-6 bg-slate-300">
      <ul className="flex h-16 gap-5 justify-end content-center flex-wrap">
        {Constants.NavMenu.map((menu) => (
          <li key={menu.label} >
            <Link to={menu.link}>{menu.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
