export const MedicationTable = (props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-400 border-b">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Wirkstoff
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Handelsname
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Stärke
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Form
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Morgen
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Mittag
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Abend
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Nacht
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Einheit
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Hinweise
          </th>
          <th
            scope="col"
            className="px-6 py-4 font-medium text-left text-gray-900 text-md"
          >
            Grund
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            <p>Acetylsalicylsäure</p>
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            ASS AL 100 TAH
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            100mg
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            Tabl
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            0
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            1
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            0
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            0
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            Stück
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
            Blutverdünnung
          </td>
          <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap"></td>
        </tr>
      </tbody>
    </table>
  );
};
