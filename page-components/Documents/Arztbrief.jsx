export const ArztbriefTbl = (props) => {
  return (
    <div className="my-16">
      <div className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 overflow-hidden sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
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
                  Datum
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                >
                  Dokument / Download
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                  Hr. Dr M. Mustermann
                </td>
                <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                  01.01.2020
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 underline cursor-pointer whitespace-nowrap">
                  <a>BeispielPDF</a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                  Hr. Dr A. Mustermann
                </td>
                <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                  21.11.2019
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 underline cursor-pointer whitespace-nowrap">
                  <a>BeispielPDF</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
