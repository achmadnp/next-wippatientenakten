import { Input } from "@/components/Inputs/Forms";
import { StationaryTable } from "@/page-components/Arzt/Home/Patients";

export const AssistenzHome = ({ stationaryData }) => {
  const pages = [1, 2, 3, 4];

  return (
    <div className="w-full min-h-screen pt-4 bg-bg-primary">
      <div className="container">
        <div className="flex flex-wrap justify-between">
          <div className="px-2 pt-4 ">
            <button className="p-2 border border-black rounded-lg shadow">
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
