import Selector, { Avatar } from "../Avatar/Avatar";

/* eslint-disable @next/next/no-img-element */
export const Navbar = (props) => {
  return (
    <nav className="bg-bg-primary border-c-secondary px-2 sm:px-4 py-2.5 rounded-b dark:bg-bg-primary-dark">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          {/* imglogo */}
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-textColor-dark">
            NAME
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <Selector />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 border border-c-secondary rounded-lg bg-bg-primary md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-bg-primary-dark  dark:border-secondary-dark">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-textColor md:p-0  dark:bg-bg-primary-dark"
                aria-current="page"
              >
                <p className="text-textColor dark:text-textColor-dark">
                  NAVMenu1
                </p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-textColor bg-bg-primary rounded md:bg-transparent md:text-textColor md:p-0 dark:text-textColor-dark dark:bg-bg-primary-dark"
                aria-current="page"
              >
                <p className="text-textColor dark:text-textColor-dark">
                  NAVMenu2
                </p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-textColor bg-bg-primary rounded md:bg-transparent md:text-textColor md:p-0 dark:text-textColor-dark dark:bg-bg-primary-dark"
                aria-current="page"
              >
                <p className="text-textColor dark:text-textColor-dark">
                  NAVMenu3
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
