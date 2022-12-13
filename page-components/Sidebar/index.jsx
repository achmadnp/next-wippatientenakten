import { Avatar } from "@/components/Images/Image";
import { useState } from "react";

const Sidebar = (props) => {
  const [expand, setExpand] = useState(false);
  const expandClass = expand ? "display" : "hidden";
  const contentClass = `${expandClass} px-4  mx-8`;
  const menus = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Termine",
      href: "/appointment",
    },
    {
      label: "Medikationsplan",
      href: "/medication",
    },
  ];

  const documents = [
    {
      id: 0,
      label: "Impfungen",
      href: "/vaccination",
    },
    { id: 1, label: "Arztbrief", href: "/arztbrief" },
    { id: 2, label: "Stammdaten", href: "/stammdaten" },
    { id: 3, label: "Notfalldaten", href: "/" },
  ];
  return (
    <aside aria-label="Sidebar">
      <div className="px-1 bg-white shadow-r-xl">
        <ul className="relative">
          <li className="relative">
            <div className="flex">
              <Avatar
                imgSrc={`https://mdbcdn.b-cdn.net/img/new/avatars/2.webp`}
              />
              <div className="pt-2">
                <p className="text-lg font-semibold">Max musterman</p>
                <p className="text-sm font-thin text-gray-500">
                  max@musterman.com
                </p>
              </div>
            </div>
          </li>
          {menus.map((menu) => (
            <li key={menu.label} className="relative">
              <a
                className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100"
                href={menu.href}
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                {menu.label}
              </a>
            </li>
          ))}
          <li className="">
            <div
              className="relative cursor-pointer text-md md:text-xl"
              onClick={() => setExpand(!expand)}
            >
              <div className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100">
                Dokumente
              </div>
              <button
                aria-label="question-expander"
                className="absolute top-0 right-0 p-4 focus:outline-none"
              >
                {expand ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="orange"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="cyan"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {documents.map((doc) => (
              <div key={doc.id} className={`${contentClass} hover:bg-gray-100`}>
                <a
                  className="flex items-center h-12 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap "
                  href={doc.href}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  {doc.label}
                </a>
              </div>
            ))}
          </li>
          <li className="">
            <a
              className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm font-semibold text-red-600 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-red-200"
              href="#!"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Abmelden
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
