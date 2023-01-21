import { DateConverter } from "@/utils/DateConverter";
import { fetcher } from "lib/fetcher";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

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
                  Datum
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Anliegen
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
                  Behandlung
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Ort
                </th>
              </tr>
            </thead>
            <tbody>
              {tblData &&
                tblData.map((data, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {DateConverter(new Date(data.datum))}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.anliegen}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.aName}, {data.aVorname}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.behandlung}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      <RaumDetail raumId={data.raum} />
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

export const RaumDetail = ({ raumId }) => {
  const { data: khidData, error: khidError } = useSWR(
    `${baseURL}/s3/raume/${raumId}`,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    khidData ? `${baseURL}/s4/krankenhauser/${khidData.krankenhaus}` : null,
    fetcher
  );

  return (
    <div>
      {!khData && <div>Loading...</div>}
      {khData && (
        <p>
          {khData.name}, Raum: {khidData.raumnummer}
        </p>
      )}
    </div>
  );
};
