import { Input } from "@/components/Inputs/Forms";
import { StationaryTable } from "@/page-components/Arzt/Home/Patients";
import Router from "next/router";

export const AssistenzHome = ({ stationaryData }) => {
  return (
    <div className="w-full min-h-screen pt-4 bg-bg-primary">
      <div className="container">
        <div className="flex flex-wrap justify-between">
          <div className="px-2 pt-4 ">
            <button
              onClick={() => {
                Router.push(`/patient/new`);
              }}
              className="p-2 border border-black rounded-lg shadow"
            >
              Neuen Patienten anlegen
            </button>
          </div>
        </div>
        <StationaryTable
          stationaryData={stationaryData.filter((data) => {
            return new Date(data.entlassungszeitraum) > Date.now();
          })}
        />
        {/* <div className="flex ">
          <ul className="inline-flex mx-auto border-2 border-black divide-x divide-gray-300 rounded">
            {pages.map((page, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 hover:text-gray-700 "
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
