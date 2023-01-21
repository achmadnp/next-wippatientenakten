import { DateConverter } from "@/utils/DateConverter";

export const MedicationTable = ({ medikationsplane, role }) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          {medikationsplane.length === 0 && <div>Keine Einträge</div>}
          {medikationsplane.length > 0 && (
            <table className="min-w-full">
              <thead className="bg-gray-400 border-b">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Wirkstoff
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Medikamente
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Stärke
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Von
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Bis
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Hinweise
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-medium text-left text-gray-900 whitespace-nowrap text-md"
                  >
                    Grund
                  </th>
                  {role === "arzt" && (
                    <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
                      Aktion
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {medikationsplane.map((medikationsplan, i) => (
                  <tr key={i}>
                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      <p>{medikationsplan.mwirkstoff}</p>
                    </td>
                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {medikationsplan.mname}
                    </td>
                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {medikationsplan.staerke}
                    </td>
                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {DateConverter(new Date(medikationsplan.von))}
                    </td>
                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {DateConverter(new Date(medikationsplan.bis))}
                    </td>

                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {medikationsplan.hinweise}
                    </td>
                    <td className="px-2 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {medikationsplan.grund}
                    </td>
                    {role === "arzt" && (
                      <td className="px-6 py-4 font-light text-blue-600 underline text-md whitespace-nowrap">
                        Löschen
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
