import React from "react";
import { Link } from "react-router-dom";
import Constants from "../../utils/constants";

const Sidebar = () => {
  return (
    <aside className="w-1/6 bg-slate-400 fixed h-screen">
      <div className="w-full flex h-16 bg-slate-600 px-3 items-center">
        <span className="text-2xl font-bold text-white">Memberz</span>
      </div>
      <ul className="w-full pt-3 px-3">
        {Constants.NavMenu.map((menu) => (
          <li className=" " key={menu.label}>
            <Link
              className="p-3 bg-slate-300 mt-3 rounded-lg w-full block"
              to={menu.link}
            >
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
