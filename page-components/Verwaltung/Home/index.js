import { Input } from "@/components/Inputs/Forms";
import { DateConverter } from "@/utils/DateConverter";
import { Combobox } from "@headlessui/react";
import { fetcher } from "lib/fetcher";
import { useState } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

export const VerwaltungHome = () => {
  const { data: patientData, error: patientError } = useSWR(
    `${baseURL}/s2/patienten`,
    fetcher
  );

  const { data: arztData, error: arztError } = useSWR(
    `${baseURL}/s4/arzte`,
    fetcher
  );

  const { data: assistData, error: assistError } = useSWR(
    `${baseURL}/s4/assistenten`,
    fetcher
  );

  const { data: verwaltungData, error: verwaltungError } = useSWR(
    `${baseURL}/s1//verwaltungsmitarbeiter`,
    fetcher
  );

  let mitarbeiter;
  let filteredPatient;
  let filteredMitarbeiter;

  const [patientQuery, setPatientQuery] = useState("");

  const [mitarQuery, setMitarQuery] = useState("");

  const [showData, setData] = useState();

  const [selectedPatient, setSelectedPatient] = useState("");

  const [selectedMA, setSelectedMA] = useState("");

  if (patientData) {
    patientData.map(
      (patient) => (patient["vollname"] = `${patient.name} ${patient.vorname}`)
    );

    filteredPatient =
      patientQuery === ""
        ? patientData
        : patientData.filter((data) => {
            return data.vollname
              .toLowerCase()
              .includes(patientQuery.toLowerCase());
          });
  }

  if (arztData && assistData && verwaltungData) {
    mitarbeiter = arztData.concat(assistData, verwaltungData);

    mitarbeiter.map(
      (mitarbeiter) =>
        (mitarbeiter["vollname"] = `${mitarbeiter.name} ${mitarbeiter.vorname}`)
    );

    filteredMitarbeiter =
      mitarQuery === ""
        ? mitarbeiter
        : mitarbeiter.filter((data) =>
            data.vollname.toLowerCase().includes(mitarQuery.toLowerCase())
          );
  }

  return (
    <div className="w-full min-h-screen col-span-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container">
        <div className="px-2 pt-8">
          <p className="font-semibold underline">Mitarbeiterverwaltung</p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap px-2 ">
            <p className="my-auto">Nach Mitarbeiter Suchen: &nbsp;</p>
            <div className="flex flex-nowrap">
              <Combobox
                value={selectedMA}
                onChange={(e) => {
                  setSelectedMA(e.vollname);
                  setSelectedPatient("");
                  setData(e);
                }}
              >
                <div className="relative mt-1">
                  <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                    <Combobox.Input
                      className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                      height="60px"
                      onChange={(event) => setMitarQuery(event.target.value)}
                    />
                    <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredMitarbeiter?.length === 0 &&
                      mitarQuery !== "" ? (
                        <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                          Kein Mitarbeiter gefunden.
                        </div>
                      ) : (
                        filteredMitarbeiter?.map((person) => (
                          <Combobox.Option
                            className="p-1 hover:bg-gray-200"
                            key={person.id}
                            value={person}
                          >
                            {person.vollname}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </div>
                </div>
              </Combobox>
            </div>
          </div>
          <div className="px-1 mt-5 lg:mt-0">
            <button className="p-1 border border-black rounded-lg shadow md:px-2">
              Neuen Patienten anlegen
            </button>
          </div>
        </div>
        <div className="px-2 pt-4">
          <p className="font-semibold underline">Patientenverwaltung</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-wrap px-2">
            <p className="my-auto">Nach Patienten Suchen: &nbsp;</p>
            <div className="flex flex-nowrap">
              <Combobox
                value={selectedPatient}
                onChange={(e) => {
                  setSelectedPatient(e.vollname);
                  setSelectedMA("");
                  setData(e);
                }}
              >
                <div className="relative mt-1">
                  <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                    <Combobox.Input
                      className="z-0 w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                      height="60px"
                      onChange={(event) => setPatientQuery(event.target.value)}
                    />
                    <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPatient?.length === 0 && patientQuery !== "" ? (
                        <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                          Kein Patient gefunden.
                        </div>
                      ) : (
                        filteredPatient?.map((person) => (
                          <Combobox.Option
                            aria-setsize={2}
                            className="p-1 hover:bg-gray-200"
                            key={person.id}
                            value={person}
                          >
                            {person.vollname}
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

        {showData && (
          <div className="p-2 mt-4 space-y-4 border-2 border-black rounded">
            <div className="flex justify-start gap-8">
              <div className="grid w-full grid-cols-2 lg:grid-cols-3">
                <div className="pt-2">
                  <p className="overflow-hidden font-bold text-ellipsis text-md">
                    user id:
                  </p>
                  <p className="overflow-hidden font-normal text-ellipsis text-md">
                    {showData.id}
                  </p>
                  <p className="overflow-hidden font-bold text-ellipsis text-md">
                    username:
                  </p>
                  <p className="overflow-hidden font-normal text-ellipsis text-md">
                    {showData.username}
                  </p>
                  <p className="overflow-hidden font-bold text-ellipsis text-md">
                    vollname:
                  </p>
                  <p className="overflow-hidden font-normal text-ellipsis text-md">
                    {showData.vollname}
                  </p>
                  <p className="overflow-hidden font-bold text-ellipsis text-md">
                    email:
                  </p>
                  <p className="overflow-hidden font-normal text-ellipsis text-md">
                    {showData.email}
                  </p>
                  <p className="overflow-hidden font-bold text-ellipsis text-md">
                    geburtsdatum:
                  </p>
                  <p className="overflow-hidden font-normal text-ellipsis text-md">
                    {DateConverter(new Date(showData.geburtsdatum))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
