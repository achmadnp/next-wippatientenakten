import { DateConverter } from "@/utils/DateConverter";
import { useState } from "react";

export const VaccDropdown = ({ vac }) => {
  const [expand, setExpand] = useState(false);
  const expandClass = expand ? "display" : "hidden";
  const contentClass = `${expandClass} p-4 mx-8`;

  return (
    <div className="my-2 border border-gray-300 rounded shadow group">
      <div
        className="relative p-4 font-medium text-md md:text-xl"
        onClick={() => setExpand(!expand)}
      >
        <div className="w-2/3 text-gray-800 duration-300 group-hover:text-blue-300">
          {vac.ibezeichnung}
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
              stroke="black"
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
      <div className={contentClass}>
        <div className="grid grid-cols-3">
          <p>{vac.anzahl}.Impfung</p>
          <p>{vac.iwirkstoff}</p>
          <p>{DateConverter(new Date(vac.datum))}</p>
        </div>
      </div>

      {/* {vac.status &&
        vac.status.map((doc) => (
          <div key={doc.label} className={contentClass}>
            <div className="grid grid-cols-3">
              <p>{doc.label}</p>
              <p>{doc.vacType}</p>
              <p>{doc.date}</p>
            </div>
          </div>
        ))}
      {!vac.status && (
        <div className={contentClass}>
          <p>Keine Einträge</p>
        </div>
      )} */}
    </div>
  );
};
