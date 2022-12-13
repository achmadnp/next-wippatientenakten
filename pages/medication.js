import { MedicationTable } from "@/page-components/Medication/Medication";
import Sidebar from "@/page-components/Sidebar";

const Medication = (props) => {
  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="min-h-screen col-span-6 bg-bg-primary min-w-screen">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Medikationsplan
          </p>
        </div>
        <div className="container overflow-hidden">
          <MedicationTable />
        </div>
      </div>
    </div>
  );
};

export default Medication;
