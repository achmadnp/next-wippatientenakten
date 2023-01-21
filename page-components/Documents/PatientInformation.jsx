import { DateConverter } from "@/utils/DateConverter";

export const UserDocTbl = ({ tblData }) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <tbody>
              {tblData &&
                tblData.map((data, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {DateConverter(new Date(data.datum))}
                    </td>
                    <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.dokumentName}
                    </td>
                    <td className="px-2 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {data.contentType}
                    </td>
                    <td className="px-2 py-4 text-sm text-blue-600 underline cursor-pointer whitespace-nowrap">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/docView/${data.id}`}
                      >
                        Download
                      </a>
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
