import { useState } from "react";

export const Dropdown = ({ headline, children }) => {
  const [expand, setExpand] = useState(false);
  const expandClass = expand ? "display" : "hidden";
  const contentClass = `${expandClass} p-4  mx-8`;

  return (
    <div className="my-2 border border-gray-500 rounded shadow group">
      <div
        className="relative p-4 font-medium text-md md:text-xl"
        onClick={() => setExpand(!expand)}
      >
        <div className="w-5/6 text-gray-800 duration-300 group-hover:text-blue-600">
          {headline}
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
      <div className={contentClass}>{children}</div>
    </div>
  );
};
