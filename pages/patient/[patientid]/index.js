import { Input } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { PatientenVerwaltung } from "@/page-components/Patientenverwaltung";
import { getSidebarMenus } from "@/utils/SidebarMenus";

const PatientIdx = (props) => {
  const userData = {
    role: "verwaltung",
    data: {
      personData: [
        { fieldName: "Vollname", value: "Max Musterman" },
        { fieldName: "Email", value: "Max@musterman.com" },
        { fieldName: "Geschlecht", value: "Männlich" },
        { fieldName: "Geburtsdatum", value: "01.01.2015" },
        { fieldName: "Telefonnummer", value: "+49012345678" },
        { fieldName: "Krankenkasse", value: "AOK" },
      ],
      termine: [
        {
          anliegen: "Blutanalyse + EKG",
          zeit: "22.11.2022 09:30Uhr",
          arzt: "Dr. Müller",
          raum: "Station C1 - Raum 000",
        },
        {
          anliegen: "Blutanalyse + EKG",
          zeit: "22.11.2022 09:30Uhr",
          arzt: "Dr. Müller",
          raum: "Station C1 - Raum 000",
        },
        {
          anliegen: "Blutanalyse + EKG",
          zeit: "22.11.2022 09:30Uhr",
          arzt: "Dr. Müller",
          raum: "Station C1 - Raum 000",
        },
      ],
      medikationsplan: [
        {
          wirkstoff: "Ramipiril",
          stärke: "10mg",
          anzahl: "1",
          einheit: "Stück",
          hinweise: "Blutdruck-Senkung",
        },
        {
          wirkstoff: "Ramipiril",
          stärke: "10mg",
          anzahl: "1",
          einheit: "Stück",
          hinweise: "Blutdruck-Senkung",
        },
      ],

      stationäreAufnahme: [
        {
          standort: "Frankfurt Raum: Station C1 - 103",
          zeit: "tagesstationäre Aufnahme am 23.06.2022",
        },
        {
          standort: "Frankfurt Raum: Station C1 - 103",
          zeit: "tagesstationäre Aufnahme am 23.06.2022",
        },
      ],
    },
  };

  const patientData = [
    { fieldName: "Vollname", value: "Max Musterman" },
    { fieldName: "Email", value: "Max@musterman.com" },
    { fieldName: "Geschlecht", value: "Männlich" },
    { fieldName: "Geburtsdatum", value: "01.01.2015" },
    { fieldName: "Telefonnummer", value: "+49012345678" },
    { fieldName: "Rolle", value: "Assistenz" },
  ];

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userData.role })} />{" "}
      <div className="w-full min-h-screen bg-bg-primary">
        <div className="container">
          <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
            Patientenverwaltung
          </h1>
          {patientData && (
            <PatientenVerwaltung
              patientData={userData.data.personData}
              stationäreAufnahme={userData.data.stationäreAufnahme}
            />
          )}
        </div>
      </div>
    </WithSidebar>
  );
};

export default PatientIdx;
