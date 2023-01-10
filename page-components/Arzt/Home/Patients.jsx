import { DateConverter, TimeConverter } from "@/utils/DateConverter";

export const PatientTable = (props) => {
  const patientData = props.patientData;

  return (
    <div className="my-4">
      <div className="px-2">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Uhrzeit
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Raum
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Anliegen
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.map((data, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-2 py-4 overflow-hidden text-sm font-medium text-gray-900">
                          {TimeConverter(new Date(data.datum))}
                        </td>
                        <td className="px-2 py-4 text-sm font-normal text-gray-900 ">
                          <a className="text-blue-500 underline cursor-pointer">
                            {data.pVorname} {data.pName}
                          </a>
                        </td>
                        <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {data.raumnummer}
                        </td>
                        <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {data.anliegen}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StationaryTable = (props) => {
  const stationaryData = props.stationaryData;
  return (
    <div className="my-4">
      <div className="px-2">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Anwesend seit
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Raum
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Grund
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stationaryData.map((data, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-2 py-4 text-sm font-medium text-gray-900">
                          {DateConverter(new Date(data.aufnahmezeitpunkt))}
                        </td>
                        <td className="px-2 py-4 text-sm font-normal text-gray-900">
                          <a className="text-blue-500 underline cursor-pointer">
                            {data.pVorname} {data.pName}
                          </a>
                        </td>
                        <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {data.raumNummer}
                        </td>
                        <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {data.hinweise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
