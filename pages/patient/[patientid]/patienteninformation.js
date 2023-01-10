import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { UserDocTbl } from "@/page-components/Documents/PatientInformation";
import { getSidebarMenus } from "@/utils/SidebarMenus";

const PatientInfo = (props) => {
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
      praxis: "praxis1",
      part: "körperteil1",
      datum: "01.01.2000",
    },
    {
      praxis: "praxis2",
      part: "körperteil2",
      datum: "01.01.2000",
    },
    {
      praxis: "praxis3",
      part: "körperteil3",
      datum: "01.01.2000",
    },
  ];
  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userData.role })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-xl font-bold underline md:text-2xl lg:text-4xl">
            Patienteninformationen
          </p>
        </div>
        <div className="container overflow-hidden">
          <Dropdown headline="Blutwerte">
            <div>
              <UserDocTbl tblData={tableData} />
            </div>
          </Dropdown>
          <Dropdown headline="Röntgenbilder">
            <div>
              <UserDocTbl tblData={tableData} />
            </div>
          </Dropdown>
          <Dropdown headline="Befunde">
            <div>
              <UserDocTbl tblData={tableData} />
            </div>
          </Dropdown>
          <Dropdown headline="Kostenaufklärung/Rechnungen">
            <div>
              <UserDocTbl tblData={tableData} />
            </div>
          </Dropdown>
          <Dropdown headline="Sonstiges">
            <div>
              <UserDocTbl tblData={tableData} />
            </div>
          </Dropdown>
        </div>
      </div>
    </WithSidebar>
  );
};

export default PatientInfo;
