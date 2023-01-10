export const BesucheTbl = ({ tblData }) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Ort
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Fachbereich
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Behandelnder Arzt
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Durchgeführte Untersuchung/Behandlung
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Datum/Uhrzeit
                </th>
              </tr>
            </thead>
            <tbody>
              {tblData &&
                tblData.map((data, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.ort}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.fachbereich}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.arzt}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.behandlung}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.datum}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
