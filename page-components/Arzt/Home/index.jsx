import { PatientTable, StationaryTable } from "./Patients";
import { Input } from "@/components/Inputs/Forms";
import { useState } from "react";

export const ArztHome = ({ patientData, stationaryData }) => {
  const [firstTab, setFirstTab] = useState(true);

  // const pages = [1, 2, 3, 4];

  return (
    <div className="min-w-full min-h-screen pt-4 bg-bg-primary">
      <div className="container">
        {/* <div className="flex flex-wrap px-2 py-6">
          <p className="my-auto text-xs whitespace-pre-wrap md:text-lg">
            Nach Patienten Suchen: &nbsp;
          </p>
          <div className="flex flex-nowrap">
            <Input />
            <div className="px-5 pt-1 my-auto">
              <button className="p-2 border rounded">Suche</button>
            </div>
          </div>
        </div> */}
        <div className="max-w-md p-2 mx-4">
          <ul className="text-sm font-medium text-center text-gray-500 border divide-x divide-gray-200 rounded-lg shadow sm:flex dark:text-gray-400">
            <li className="w-full">
              <button
                onClick={() => setFirstTab(true)}
                className={`inline-block w-full p-4 text-gray-900  rounded-l-lg hover:bg-gray-300 ${
                  firstTab === true ? "bg-gray-300" : "bg - gray - 100"
                }`}
                aria-current="page"
              >
                Heutige Patienten
              </button>
            </li>
            <li className="w-full">
              <button
                onClick={() => setFirstTab(false)}
                className={`inline-block w-full p-4 text-gray-900  rounded-r-lg hover:bg-gray-300 ${
                  firstTab === false ? "bg-gray-300" : "bg - gray - 100"
                }`}
                aria-current="page"
              >
                Stationäre Patienten
              </button>
            </li>
          </ul>
        </div>
        {firstTab && (
          <PatientTable
            patientData={patientData.filter((patient) => {
              return (
                new Date(patient.datum).getDate() == new Date().getDate() &&
                new Date(patient.datum).getTime() <
                  new Date().getTime() + 1 * 24 * 60 * 60 * 1000 &&
                new Date(patient.datum).getTime() > Date.now()
              );
            })}
          />
        )}
        {!firstTab && (
          <StationaryTable
            stationaryData={stationaryData.filter(
              (data) => new Date(data.entlassungszeitraum) > Date.now()
            )}
          />
        )}
        {/* <div className="flex ">
          <ul className="inline-flex mx-auto border-2 border-black divide-x divide-gray-300 rounded">
            {pages.map((page, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 hover:font-bold hover:text-gray-900 "
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};
