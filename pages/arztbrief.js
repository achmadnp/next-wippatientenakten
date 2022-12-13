import { ArztbriefTbl } from "@/page-components/Documents/Arztbrief";
import Sidebar from "@/page-components/Sidebar";

const Arztbrief = (props) => {
  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="min-h-screen col-span-6 bg-bg-primary min-w-screen">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Arztbriefe
          </p>
        </div>
        <div className="container overflow-hidden">
          <ArztbriefTbl />

          <button className="p-2 border-2 border-black rounded-md">
            Impfung hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Arztbrief;
