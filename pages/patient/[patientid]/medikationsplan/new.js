import { Input, TextAreaInput } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { Combobox } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, postReq } from "lib/fetcher";
import Router from "next/router";
import { toast } from "react-hot-toast";
import { LoadingToast } from "@/page-components/Toast/Toast";
const baseURL = "https://wippatientenakte.azure-api.net";

const AddNewMedikation = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session && userRole !== "arzt") {
      Router.push(`/signin`);
    }
  }, [session, userRole]);

  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const { data: medData, error: medError } = useSWR(
    `${baseURL}/s2/medikamente`,
    fetcher
  );

  const [medQuery, setMedQuery] = useState("");

  const [selectedMed, setSelectedMed] = useState("");

  const [staerke, setStaerke] = useState("");

  const [hinweise, setHinweise] = useState("");

  const [grund, setGrund] = useState("");

  let filteredMed;
  if (medData) {
    filteredMed =
      medQuery === ""
        ? medData
        : medData.filter(
            (med) =>
              med.name.toLowerCase().includes(medQuery.toLowerCase()) ||
              med.wirkstoff.toLowerCase().includes(medQuery.toLowerCase())
          );
  }

  const reset = () => {
    setMedQuery("");
    setStaerke("");
    setSelectedMed("");
    setHinweise("");
    setGrund("");
  };

  const handleBestaetigen = async () => {
    toast((t) => <LoadingToast text="Medikament wird hinzugefügt..." />);
    try {
      const post = await postReq({
        url: `${baseURL}/s2/medikationsplane`,
        body: {
          patientId: props.pid.patientid,
          medikamentId: selectedMed.mid,
          von: startDate.toISOString(),
          bis: finishDate.toISOString(),
          staerke: staerke,
          hinweise: hinweise,
          grund: grund,
          arzt: session.id,
        },
      });
      toast.remove();
      toast.success(`ein Medikament wurde erfolgreich erstellt`, {
        style: {
          border: "1px solid green",
          padding: "16px",
          color: "#09ff00",
        },
      });
      reset();
    } catch (error) {
      toast.remove();
      toast.error(`Fehlerhaft`, {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "#ff0000",
        },
      });
    }
  };

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <div className="w-full min-h-screen col-span-6 p-1 px-3 md:px-4 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Medikament hinzufügen
          </p>
        </div>
        <div className="container overflow-hidden">
          <div className="flex flex-wrap justify-between">
            <div className="w-full px-6">
              <p className="my-auto text-lg font-medium text-gray-900 ">
                Medikament: &nbsp;
              </p>
              <div className="flex w-full flex-nowrap">
                <Combobox
                  value={
                    selectedMed
                      ? `${selectedMed?.name}, ${selectedMed.wirkstoff}`
                      : ""
                  }
                  onChange={(e) => {
                    setSelectedMed({
                      mid: e.id,
                      name: e.name,
                      wirkstoff: e.wirkstoff,
                    });
                  }}
                >
                  <div className="relative w-full max-w-lg mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                        height="60px"
                        onChange={(event) => setMedQuery(event.target.value)}
                      />
                      <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredMed?.length === 0 && medQuery !== "" ? (
                          <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                            Kein Medikament gefunden.
                          </div>
                        ) : (
                          filteredMed?.map((med) => (
                            <Combobox.Option
                              className="p-2 font-semibold hover:bg-gray-200"
                              key={med.id}
                              value={med}
                            >
                              <div className="font-semibold">{med.name}</div>
                              <div className="font-semibold">
                                {med.wirkstoff}
                              </div>
                              <div className="font-thin">ID: {med.id}</div>
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </div>
                  </div>
                </Combobox>
              </div>
            </div>
          </div>
          <div className="px-6 mt-2 space-y-3">
            <Input
              label="Stärke"
              placeholder="2 Stück täglich"
              value={staerke}
              handleChange={(e) => setStaerke(e.target.value)}
            />
            <div className="my-auto">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Von
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
              ></DatePicker>
            </div>
            <div className="my-auto">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Bis
              </label>

              <DatePicker
                selected={finishDate}
                onChange={(date) => setFinishDate(date)}
                className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
              ></DatePicker>
            </div>
            <div className="max-w-2xl">
              <TextAreaInput
                value={hinweise}
                handleChange={(e) => setHinweise(e.target.value)}
                label={"Hinweise"}
              />
            </div>
            <div className="max-w-2xl">
              <TextAreaInput
                value={grund}
                handleChange={(e) => setGrund(e.target.value)}
                label={"Grund"}
              />
            </div>
            <div>
              <button
                onClick={handleBestaetigen}
                className="p-2 mt-10 border border-black rounded"
              >
                Bestätigen
              </button>
            </div>
          </div>

          {/* seite: 11 */}
        </div>
      </div>
    </WithSidebar>
  );
};

export default AddNewMedikation;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const pid = context.params;

  return {
    props: {
      session,
      pid,
    },
  };
}
