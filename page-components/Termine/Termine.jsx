import { DateConverter, TimeConverter } from "@/utils/DateConverter";
import { getRaumKrankenhaus } from "lib/data/krankenhaus/krankenhaus";

export const NaechsteTermine = ({ termine, role }) => {
  let allKH = [];
  let nextTermine = termine.filter((t) => {
    return new Date(t.datum) - Date.now() > 0;
  });

  nextTermine?.map((termin, i) => {
    const khData = getRaumKrankenhaus({ raumId: termin.raum });

    if (khData) {
      allKH.push(khData?.name);
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          {nextTermine.length <= 0 && (
            <div className="text-lg">Keine Einträge</div>
          )}
          {nextTermine.length > 0 && (
            <table className="min-w-full">
              <TableHead />
              <tbody>
                {nextTermine?.map((termin, i) => (
                  <tr key={termin.id} className="border-b">
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      <div>
                        <p>{DateConverter(new Date(termin.datum))}</p>
                        <p>{TimeConverter(new Date(termin.datum))}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {termin.anliegen}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {termin.aName}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {termin.pName}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {allKH[i]}, Raum {termin.raumnummer}
                    </td>
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

export const AlleTermine = ({ termine, role }) => {
  let allKH = [];

  termine?.map((termin, i) => {
    const khData = getRaumKrankenhaus({ raumId: termin.raum });

    if (khData) {
      allKH.push(khData?.name);
    }
  });

  const handleDelete = ({ termine }) => {};

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <TableHead actionbtn={role === "arzt"} />
            <tbody>
              {termine.map((termin, i) => (
                <tr key={i} className="border-b">
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    <div>
                      <p>{DateConverter(new Date(termin.datum))}</p>
                      <p>{TimeConverter(new Date(termin.datum))}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {termin.anliegen}
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {termin.aName}
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {termin.pName}
                  </td>

                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {allKH[i]} Raum {termin.raumnummer}
                  </td>
                  {role === "arzt" && (
                    <td className="px-6 py-4 font-light text-blue-600 underline text-md whitespace-nowrap">
                      <button>Löschen</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TableHead = ({ role, actionbtn }) => {
  return (
    <thead className="min-w-full bg-gray-300 border-b">
      <tr>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Datum/Uhrzeit
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Anliegen
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Arzt
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Patient
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Raum
        </th>
        {actionbtn && (
          <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
            Aktion
          </th>
        )}
      </tr>
    </thead>
  );
};
