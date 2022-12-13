// Activities/ Termine
// Medikation

export const Schedule = (props) => {
  const schedule = [
    {
      issue: "Blutanalyse + EKG",
      DateTime: "22.11.2022 09:30Uhr",
      commisioned: "Dr. Müller",
      room: "Station C1 - Raum 000",
    },
    {
      issue: "MRT Thorax",
      DateTime: "02.04.2023 09:30Uhr",
      commisioned: "Dr. Müller",
      room: "Station A1 - Raum 322",
    },
  ];

  return (
    <div className="mt-16">
      <p className="mb-4 text-lg font-bold underline">Kommende Termine</p>
      {/* Card */}
      <div className="flex gap-8">
        {schedule.map((schedule) => (
          <a
            key={schedule}
            href="#"
            className="block max-w-md p-6 bg-green-200 border rounded-lg hover:bg-green-100"
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
              {schedule.issue}
            </h5>
            <div className="grid grid-cols-2">
              <p className="font-semibold text-gray-900 text-md">
                Datum / Uhrzeit:
              </p>
              <p className="font-normal text-gray-700">{schedule.DateTime}</p>
              <p className="font-semibold text-gray-900 text-md">Raum:</p>
              <p className="font-normal text-gray-700">{schedule.room}</p>
              <p className="font-semibold text-gray-900 text-md">Arzt:</p>
              <p className="font-normal text-gray-700">
                {schedule.commisioned}
              </p>
            </div>
          </a>
        ))}

        {/* Arzt Sicht */}
        <a
          href="#"
          className="max-w-lg p-6 bg-green-200 border rounded-lg hover:bg-gray-100"
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            MRT Thorax
          </h5>
          <div className="grid grid-cols-2">
            <p className="font-semibold text-gray-900 text-md">
              Datum / Uhrzeit:
            </p>
            <p className="font-normal text-gray-700">
              &nbsp; 22.04.2023 09:30Uhr
            </p>
            <p className="font-semibold text-gray-900 text-md">Raum:</p>
            <p className="font-normal text-gray-700">
              &nbsp; Station A1 - Raum 000
            </p>
            <p className="font-semibold text-gray-900 text-md">Patient:</p>
            <p className="font-normal text-gray-700">&nbsp; Max Musterman</p>
          </div>
        </a>
      </div>
    </div>
  );
};
