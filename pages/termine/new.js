import { Input, TextAreaInput } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import useSWR from "swr";

registerLocale("de", de);
const baseURL = "https://wippatientenakte.azure-api.net/";

import "react-datepicker/dist/react-datepicker.css";
import { fetcher, postReq } from "lib/fetcher";
import { Combobox } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { LoadingToast } from "@/page-components/Toast/Toast";

const NewTermine = (props) => {
  const [terminDate, setTerminDate] = useState(new Date());

  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: arztData, error: arztError } = useSWR(
    `${baseURL}/s4/arzte`,
    fetcher
  );

  const { data: patientData, error: patientError } = useSWR(
    `${baseURL}/s2/patienten`,
    fetcher
  );

  const { data: raumData, error: raumError } = useSWR(
    `${baseURL}/s3/raume`,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    `${baseURL}/s4/krankenhauser`,
    fetcher
  );

  let filteredPatient;
  let filteredRaum;
  let filteredArzt;

  const [patientQuery, setPatientQuery] = useState("");

  const [arztQuery, setArztQuery] = useState("");

  const [selectedPatient, setSelectedPatient] = useState("");

  const [khQuery, setKhQuery] = useState("");

  const [selectedKH, setSelectedKH] = useState("");

  const [selectedArzt, setSelectedArzt] = useState("");

  const [behandlung, setBehandlung] = useState("");
  const [anliegen, setAnliegen] = useState("");

  if (arztData && patientData && raumData && khData) {
    patientData.map(
      (patient) => (patient["vollname"] = `${patient.name} ${patient.vorname}`)
    );

    arztData.map((arzt) => (arzt["vollname"] = `${arzt.name} ${arzt.vorname}`));

    raumData.map((raum) => {
      return (raum["khName"] = khData.filter(
        (kh) => kh.id === raum.krankenhaus
      )[0]?.name);
    });

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

    filteredRaum =
      khQuery === ""
        ? raumData
        : raumData.filter((raum) =>
            raum.khName.toLowerCase().includes(khQuery.toLowerCase())
          );
  }

  const reset = () => {
    setPatientQuery("");
    setArztQuery(""), setSelectedPatient("");
    setKhQuery("");
    setSelectedKH("");
    setSelectedArzt("");
    setBehandlung("");
    setAnliegen("");
  };

  const handleBestaetigen = async () => {
    toast((t) => <LoadingToast text="Termin wird erstellt..." />);
    try {
      const post = await postReq({
        url: `${baseURL}/s3/termine`,
        body: {
          patientId: selectedPatient.pid,
          arztId: selectedArzt.aid,
          raum: selectedKH.rid,
          datum: terminDate.toISOString(),
          behandlung: behandlung,
          anliegen: anliegen,
        },
      });
      toast.remove();
      toast.success(`ein Termin wurde erfolgreich erstellt`, {
        style: {
          border: "1px solid green",
          padding: "16px",
          color: "#09ff00",
        },
      });
      reset();
    } catch (error) {
      toast.remove();
      toast.error(`Fehlerhaft, Termin konnte nicht erstellt werden`, {
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
      <div className="w-full min-h-screen px-3 lg:px-4 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-xl font-bold underline md:text-2xl lg:text-4xl">
            Termin hinzufügen
          </p>
        </div>
        <div className="container min-h-full overflow-hidden">
          <div className="max-w-lg">
            <div className="my-auto">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Datum und Uhrzeit
              </label>

              <DatePicker
                selected={terminDate}
                dateFormat="dd.MM.yyyy HH:mm"
                locale="de"
                timeInputLabel="de"
                timeFormat="HH:mm"
                minDate={new Date()}
                showDisabledMonthNavigation
                showYearDropdown
                showMonthDropdown
                useShortMonthInDropdown
                timeIntervals={1}
                showTimeSelect={true}
                onChange={(date) => setTerminDate(date)}
                className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
              ></DatePicker>
            </div>

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

            {/* textarea */}

            <Input
              label="Behandlung"
              value={behandlung}
              handleChange={(e) => setBehandlung(e.target.value)}
            />

            <TextAreaInput
              value={anliegen}
              handleChange={(e) => setAnliegen(e.target.value)}
              type="text"
              label="Anliegen"
            />

            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <p className="my-auto text-lg font-medium text-gray-900 ">
                  Raum: &nbsp;
                </p>
                <div className="flex w-full flex-nowrap">
                  <Combobox
                    value={
                      selectedKH
                        ? `${selectedKH?.kh}, Raum: ${selectedKH?.no}`
                        : ""
                    }
                    onChange={(e) => {
                      setSelectedKH({
                        rid: e.id,
                        kh: e.khName,
                        no: e.raumnummer,
                      });
                    }}
                  >
                    <div className="relative w-full max-w-lg mt-1">
                      <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                        <Combobox.Input
                          className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                          height="60px"
                          onChange={(event) => setKhQuery(event.target.value)}
                        />
                        <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredRaum?.length === 0 && khQuery !== "" ? (
                            <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                              Kein Raum gefunden.
                            </div>
                          ) : (
                            filteredRaum?.map((raum) => (
                              <Combobox.Option
                                className="p-2 font-semibold hover:bg-gray-200"
                                key={raum.id}
                                value={raum}
                              >
                                <div className="font-semibold">
                                  {raum.khName}, Raumnummer: {raum.raumnummer}
                                </div>
                                <div className="font-thin">
                                  RaumID: {raum.id}
                                </div>
                                <div className="font-thin">
                                  KrankenhausId: {raum.krankenhaus}
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

export default NewTermine;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
