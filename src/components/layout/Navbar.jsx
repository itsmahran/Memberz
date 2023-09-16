import React from "react";
import Constants from "../../utils/constants";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";

const Navbar = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="">
      <div className="sm:hidden h-16 flex justify-center content-center items-center relative">
        <button
          onClick={() => {
            alert("clcked");
          }}
          href="#"
          className="absolute left-0"
        >
          <IconContext.Provider
            value={{ size: "1.25em", className: "global-class-name" }}
          >
            <div>
              <FaBars />
            </div>
          </IconContext.Provider>
        </button>
        <span className="text-2xl -m-4">Memberz</span>
      </div>
      <ul className="h-16 gap-5 justify-end content-center flex-wrap hidden sm:flex  border-b-1 border-b-gray-200 px-6">
        {Constants.NavMenu.map((menu) => (
          <li key={menu.label}>
            <Link className="text-sm" to={menu.link}>
              {menu.label}
            </Link>
          </li>
        ))}
        <li>
          <button className="text-sm" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
