import { DateConverter } from "@/utils/DateConverter";

export const ArztbriefTbl = ({ docs }) => {
  return (
    <div className="my-16">
      <div className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 overflow-hidden sm:px-2 lg:px-8">
          {docs?.length > 0 ? (
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
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
                    Datum
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 text-sm font-medium text-left text-gray-900"
                  >
                    Dokument / Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {doc.dokumentName}
                    </td>
                    <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {DateConverter(new Date(doc.datum))}
                    </td>
                    <td className="px-2 py-4 text-sm text-blue-600 underline cursor-pointer whitespace-nowrap">
                      <a download={doc.dokumentLink}>Dokument</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex">
              <div className="mx-auto text-xl font-semibold">
                Keine Einträge
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
