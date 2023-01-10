import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { BesucheTbl } from "@/page-components/Documents/Besuche";
import { getSidebarMenus } from "@/utils/SidebarMenus";

const Besuche = (props) => {
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
    },
  };

  const tableData = [
    {
      ort: "Frankfurt",
      fachbereich: "fb1",
      arzt: "Hr. Dr. M. Mustermann",
      behandlung: "Behandlung1",
      datum: "01.01.2000 00:00",
    },
    {
      ort: "Frankfurt",
      fachbereich: "fb1",
      arzt: "Hr. Dr. M. Mustermann",
      behandlung: "Behandlung1",
      datum: "01.01.2000 00:00",
    },
    {
      ort: "Frankfurt",
      fachbereich: "fb1",
      arzt: "Hr. Dr. M. Mustermann",
      behandlung: "Behandlung1",
      datum: "01.01.2000 00:00",
    },
    {
      ort: "Frankfurt",
      fachbereich: "fb1",
      arzt: "Hr. Dr. M. Mustermann",
      behandlung: "Behandlung1",
      datum: "01.01.2000 00:00",
    },
  ];

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userData.role })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Vergangene Besuche bei medizinischen Einrichtungen
          </p>
        </div>
        <BesucheTbl tblData={tableData} />
      </div>
    </WithSidebar>
  );
};

export default Besuche;
