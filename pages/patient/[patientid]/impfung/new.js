import { Input } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import useSWR from "swr";
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from "@headlessui/react";
import { fetcher, postReq } from "lib/fetcher";
import Router from "next/router";
import { Unauthorized } from "@/page-components/Error/Unauthorized";

registerLocale("de", de);
const baseURL = "https://wippatientenakte.azure-api.net";

const NewImpfung = (props) => {
  const [impfDatum, setImpfDatum] = useState(new Date());

  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: patientData, error: patientError } = useSWR(
    `${baseURL}/s2/patienten`,
    fetcher
  );

  const { data: arztData, error: arztError } = useSWR(
    `${baseURL}/s4/arzte`,
    fetcher
  );

  const { data: impfstoffData, error: impfstoffError } = useSWR(
    `${baseURL}/s2/impfstoffe`,
    fetcher
  );

  let filteredPatient;
  let filteredImpfstoff;
  let filteredArzt;

  const [patientQuery, setPatientQuery] = useState("");

  const [arztQuery, setArztQuery] = useState("");

  const [selectedPatient, setSelectedPatient] = useState("");

  const [selectedArzt, setSelectedArzt] = useState("");

  const [impfstoffQuery, setImpfstoffQuery] = useState("");

  const [selectedImpfstoff, setSelectedImpfstoff] = useState("");

  const [anzahl, setAnzahl] = useState(1);

  if (arztData && patientData && impfstoffData) {
    patientData.map(
      (patient) => (patient["vollname"] = `${patient.name} ${patient.vorname}`)
    );

    arztData.map((arzt) => (arzt["vollname"] = `${arzt.name} ${arzt.vorname}`));

    filteredArzt =
      arztQuery === ""
        ? arztData
        : arztData.filter((data) => {
            return data.vollname
              .toLowerCase()
              .includes(arztQuery.toLowerCase());
          });

    filteredPatient =
      patientQuery === ""
        ? patientData
        : patientData.filter((data) => {
            return data.vollname
              .toLowerCase()
              .includes(patientQuery.toLowerCase());
          });

    filteredImpfstoff =
      impfstoffQuery === ""
        ? impfstoffData
        : impfstoffData.filter((data) => {
            return (
              data.bezeichnung
                .toLowerCase()
                .includes(impfstoffQuery.toLowerCase()) ||
              data.wirkstoff
                .toLowerCase()
                .includes(impfstoffQuery.toLowerCase())
            );
          });
  }

  if (userRole !== "arzt" && userRole !== "assistent") {
    return <Unauthorized />;
  }

  const handleBestaetigen = async () => {
    try {
      const post = await postReq({
        url: `${baseURL}/s2/impfungen`,
        body: {
          patientId: selectedPatient.pid,
          arzt: selectedArzt.aid,
          impfstoffId: selectedImpfstoff.iid,
          datum: impfDatum,
          anzahl: anzahl,
        },
      });
      console.log(`post ${post}`);
      if (post) {
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Impfung hinzufügen
          </p>
        </div>
        <div className="container px-6 space-y-2 overflow-hidden">
          <div className="flex flex-wrap justify-between">
            <div className="w-full">
              <p className="my-auto text-lg font-medium text-gray-900 ">
                Patient: &nbsp;
              </p>
              <div className="flex w-full flex-nowrap">
                <Combobox
                  value={selectedPatient ? `${selectedPatient?.name}` : ""}
                  onChange={(e) => {
                    setSelectedPatient({ pid: e.id, name: e.vollname });
                  }}
                >
                  <div className="relative w-full max-w-lg mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                        height="60px"
                        onChange={(event) =>
                          setPatientQuery(event.target.value)
                        }
                      />
                      <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPatient?.length === 0 &&
                        patientQuery !== "" ? (
                          <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                            Kein Patient gefunden.
                          </div>
                        ) : (
                          filteredPatient?.map((person) => (
                            <Combobox.Option
                              className="p-2 font-semibold hover:bg-gray-200"
                              key={person.id}
                              value={person}
                            >
                              <div>{person.vollname}</div>
                              <div className="font-thin">ID: {person.id}</div>
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

          <div className="flex flex-wrap justify-between">
            <div className="w-full">
              <p className="my-auto text-lg font-medium text-gray-900 ">
                Arzt: &nbsp;
              </p>
              <div className="flex w-full flex-nowrap">
                <Combobox
                  value={selectedArzt ? `${selectedArzt?.name}` : ""}
                  onChange={(e) => {
                    setSelectedArzt({ aid: e.id, name: e.vollname });
                  }}
                >
                  <div className="relative w-full max-w-lg mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                        height="60px"
                        onChange={(event) => setArztQuery(event.target.value)}
                      />
                      <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredArzt?.length === 0 && arztQuery !== "" ? (
                          <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                            Kein Arzt gefunden.
                          </div>
                        ) : (
                          filteredArzt?.map((person) => (
                            <Combobox.Option
                              className="p-2 font-semibold hover:bg-gray-200"
                              key={person.id}
                              value={person}
                            >
                              <div>{person.vollname}</div>
                              <div className="font-thin">ID: {person.id}</div>
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

          <div className="flex flex-wrap justify-between">
            <div className="w-full">
              <p className="my-auto text-lg font-medium text-gray-900 ">
                Impfstoff: &nbsp;
              </p>
              <div className="flex w-full flex-nowrap">
                <Combobox
                  value={
                    selectedImpfstoff
                      ? `${selectedImpfstoff?.bezeichnung} ${selectedImpfstoff.wirkstoff}`
                      : ""
                  }
                  onChange={(e) => {
                    setSelectedImpfstoff({
                      iid: e.id,
                      bezeichnung: e.bezeichnung,
                      wirkstoff: e.wirkstoff,
                    });
                  }}
                >
                  <div className="relative w-full max-w-lg mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                        height="60px"
                        onChange={(event) =>
                          setImpfstoffQuery(event.target.value)
                        }
                      />
                      <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredImpfstoff?.length === 0 &&
                        impfstoffQuery !== "" ? (
                          <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                            Kein Impfstoff gefunden.
                          </div>
                        ) : (
                          filteredImpfstoff?.map((impfstoffData) => (
                            <Combobox.Option
                              className="p-2 font-semibold hover:bg-gray-200"
                              key={impfstoffData.id}
                              value={impfstoffData}
                            >
                              <div>{impfstoffData.bezeichnung}</div>
                              <div>{impfstoffData.wirkstoff}</div>
                              <div className="font-thin">
                                ID: {impfstoffData.id}
                              </div>
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

          <Input
            type="number"
            label="Anzahl Impfung"
            placeholder="1"
            value={anzahl}
            handleChange={(e) => setAnzahl(e.target.value)}
          />
          <div className="my-auto">
            <label className="block mb-2 text-lg font-medium text-gray-900 ">
              Datum
            </label>

            <DatePicker
              selected={impfDatum}
              dateFormat="dd.MM.yyyy"
              locale="de"
              onChange={(date) => setImpfDatum(date)}
              className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
            ></DatePicker>
          </div>

          <div className="mt-5">
            <button
              onClick={handleBestaetigen}
              className="p-2 border-2 border-black rounded-md"
            >
              Bestätigen
            </button>
          </div>
        </div>
      </div>
    </WithSidebar>
  );
};

export default NewImpfung;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
