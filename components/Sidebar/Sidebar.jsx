import { Fragment, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import Router from "next/router";

export const Sidebar = ({ menus, submenus }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen bg-slate-700 p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <ArrowLeftIcon
        className={`bg-white h-8 w-8 text-c-secondary text-3xl rounded-full absolute -right-2
        top-9 border-2 border-black cursor-pointer duration-300 ${
          !open && "rotate-180"
        }`}
        onClick={(e) => {
          setOpen(!open);
        }}
      />
      {/* Headline here */}
      <div className="inline-flex">
        <BuildingOfficeIcon
          className={`bg-green-500 block h-9 w-8 text-4xl rounded float-left mr-2 duration-500 ${
            open && "scale-125 "
          }`}
        />
        <h1
          className={`text-white origin-left tracking-wider font-medium text-2xl ${
            !open && "scale-0 duration-300"
          }`}
        >
          EPApp
        </h1>
      </div>

      <ul className="pt-2">
        {menus?.map((menu, i) => (
          <Fragment key={i}>
            <li
              key={menu.title}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 ${
                menu.title === "Abmelden" && "text-red-500 mt-10"
              }`}
              onClick={() => {
                menu.submenus && setSubmenuOpen(!submenuOpen);
              }}
            >
              <span
                onClick={() => {
                  setOpen(!open);
                }}
                className={`block float-left w-5 h-5 text-2xl`}
              >
                {menu.icon}
              </span>
              {menu.title === "Abmelden" ? (
                <span
                  onClick={signOut}
                  className={`text-base  font-medium flex-1 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              ) : (
                <span
                  onClick={() => {
                    if (menu.title !== "Dokumente") {
                      Router.push(`${menu.ref}`);
                    }
                  }}
                  className={`text-base  font-medium flex-1 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              )}

              {menu.submenus && open && (
                <ChevronDownIcon
                  className={`h-5 w-5 duration-300 ${
                    submenuOpen && "rotate-180 duration-300"
                  }`}
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                />
              )}

              {/* for dropdown menu */}
            </li>
            {menu.submenus && submenuOpen && open && (
              <ul>
                {menu.submenus?.map((submenu, i) => (
                  <li
                    key={submenu.title}
                    onClick={() => {
                      Router.push(`${submenu.ref}`);
                    }}
                    className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5`}
                  >
                    {submenu.title}
                  </li>
                ))}
              </ul>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
