import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "@nextui-org/react";
import Constants from "../../utils/constants";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { setNavState } from "../../app/appSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPageId } = useSelector((state) => state.app.navState);

  const handleLinkClick = (pageId, navigateTo) => {
    dispatch(
      setNavState({ currentPageId: pageId, activeMainComponent: "list" })
    );
    navigate(navigateTo);
  };

  return (
    <IconContext.Provider value={{ size: "1.25em", className: "self-center" }}>
      <aside className="w-screen sm:w-1/6 fixed min-h-screen sm:block z-50 border-r-1 border-r-gray-100 bg-gray-50">
        <div className="w-full flex h-16 px-6 items-center border-b-1 border-b-gray-200">
          <span className="text-2xl font-bold">
            Member<span className="text-orange-500">Z</span>
          </span>
        </div>
        <ul className="w-full px-3 mt-5 grid grid-cols-1 sidebar-nav">
          {Constants.NavMenu.map((menu) => (
            <li key={menu.label}>
              <Link
                href="#"
                className={`nav-link text-gray-500 ${
                  currentPageId == menu.pageId ? "active" : ""
                }`}
                onClick={() => {
                  handleLinkClick(menu.pageId, menu.link);
                }}
              >
                {<menu.icon />}
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </IconContext.Provider>
  );
};

export default Sidebar;
