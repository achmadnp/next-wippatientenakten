export const NextAppointments = (props) => {
  const nextAppointments = [
    {
      id: "j9s1uy23e9mx1j",
      date: "22.11.2022",
      time: "09:30",
      issue: "Visite",
      patient: "Max Mustermann",
      location: "Station C1 - Raum 120",
    },
    {
      id: "px0328um0xqs",
      date: "12.12.2022",
      time: "11:30",
      issue: "EKG",
      patient: "Max Mustermann",
      location: "Station B1 - Raum 210",
    },
  ];

  return (
    <table className="min-w-full">
      <TableHead />
      <tbody>
        {nextAppointments.map((appointment) => (
          <tr key={appointment.id} className="border-b">
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              <div>
                <p>{appointment.date}</p>
                <p>{appointment.time}</p>
              </div>
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              {appointment.issue}
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              {appointment.patient}
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              {appointment.location}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const OwnAppointments = (props) => {
  const ownAppointments = [
    {
      id: "umd1ih1w8d9h18w",
      date: "11.01.2023",
      time: "15:00",
      issue: "Visite",
      patient: "Alex Mustermann",
      location: "Station A1 - Raum 330",
    },
    {
      id: "xm328um1w8sad",
      date: "02.02.2023",
      time: "11:00",
      issue: "MRT Thorax",
      patient: "Erika Musterfrau",
      location: "Station A1 - Raum 130",
    },
    {
      id: "maskldna98127sla",
      date: "09.02.2023",
      time: "13:45",
      issue: "EKG",
      patient: "Alex Mustermann",
      location: "Station B3 - Raum 220",
    },
  ];
  return (
    <table className="min-w-full">
      <TableHead />
      <tbody>
        {ownAppointments.map((appointment) => (
          <tr key={appointment.id} className="border-b">
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              <div>
                <p>{appointment.date}</p>
                <p>{appointment.time}</p>
              </div>
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              {appointment.issue}
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              {appointment.patient}
            </td>
            <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
              {appointment.location}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TableHead = () => {
  return (
    <thead className="bg-gray-300 border-b">
      <tr>
        <th
          scope="col"
          className="px-6 py-4 font-medium text-left text-gray-900 text-md"
        >
          Datum/Uhrzeit
        </th>
        <th
          scope="col"
          className="px-6 py-4 font-medium text-left text-gray-900 text-md"
        >
          Anliegen
        </th>
        <th
          scope="col"
          className="px-6 py-4 font-medium text-left text-gray-900 text-md"
        >
          Patient
        </th>
        <th
          scope="col"
          className="px-6 py-4 font-medium text-left text-gray-900 text-md"
        >
          Raum
        </th>
      </tr>
    </thead>
  );
};
