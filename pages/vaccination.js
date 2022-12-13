import { VaccDropdown } from "@/page-components/Documents/Impfstatus";
import Sidebar from "@/page-components/Sidebar";

const Vaccination = (props) => {
  const vacs = [
    {
      label: "Covid-19",
      status: [
        { label: "1.Impfung", vacType: "Comirnaty", date: "am 30.06.2021" },
        { label: "2.Impfung", vacType: "Comirnaty", date: "am 04.08.2021" },
        { label: "3.Impfung", vacType: "Comirnaty", date: "am 20.12.2021" },
      ],
    },
    { label: "Tetanus" },
    { label: "Diphtherie" },
  ];
  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="min-h-screen col-span-6 bg-bg-primary min-w-screen">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Impfstatus
          </p>
        </div>
        <div className="container overflow-hidden">
          <VaccDropdown vac={vacs[0]} />
          <VaccDropdown vac={vacs[1]} />
          <VaccDropdown vac={vacs[2]} />
          <button className="p-2 border-2 border-black rounded-md">
            Impfung hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vaccination;
