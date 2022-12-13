/* eslint-disable @next/next/no-html-link-for-pages */
export const Medicationplan = (props) => {
  return (
    <div className="my-16">
      <p className="mb-4 text-lg font-bold underline">Medikationsplan</p>
      <div className="px-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Wirkstoff
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Stärke
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Anzahl
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Einheit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Hinweise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        Ramipiril
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        10mg
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        1
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        Stück
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        Blutdruck-Senkung
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        Ramipiril
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        10mg
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        1
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        Stück
                      </td>
                      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                        Blutdruck-Senkung
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-2 space-x-2">
                  <a
                    href="/medication"
                    className="inline-block px-6 py-2.5 rounded bg-gray-300 border-orange-400 border text-orange-600 font-medium text-md  transition duration-150 ease-in-out"
                  >
                    See More..
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
