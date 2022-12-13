import { createPopper } from "@popperjs/core";
import { useState, createRef, useEffect } from "react";

export const Avatar = ({ imgSrc, component }) => {
  const [dropdownPopover, setDropdownPopover] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();

  const openPopover = () => {
    createPopper(btnDropdownRef.current, dropdownPopover.current, {
      placement: "bottom-start",
    });
    setDropdownPopover(true);
  };

  const closePopover = () => {
    setDropdownPopover(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 sm:w-6/12 md:w-4/12">
          <div className="relative inline-flex w-full align-middle">
            {/* component */}
            <button
              className={
                "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopover ? openPopover() : closePopover();
              }}
            >
              COMPONENT
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopover ? "block " : "hidden ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent "
                }
                onClick={(e) => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent "
                }
                onClick={(e) => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent "
                }
                onClick={(e) => e.preventDefault()}
              >
                Action
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Selector = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={` w-full p-2 flex items-center justify-between rounded cursor-pointer`}
      >
        <button
          type="button"
          className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user Menu</span>
          <img className="w-8 h-8 rounded-full" src="" alt=""></img>
        </button>
      </div>
      <ul
        className={`bg-bg-primary-dark w-max absolute rounded overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-textColor dark:text-textColor-dark">
            USERNAME
          </span>
          <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-300">
            USER EMAIL
          </span>
        </div>
      </ul>
    </div>
  );
};

export default Selector;
