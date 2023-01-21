import { Input } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { Unauthorized } from "@/page-components/Error/Unauthorized";
import { PatientenVerwaltung } from "@/page-components/Patientenverwaltung";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { Combobox } from "@headlessui/react";
import { getPatientverwaltung } from "lib/data/user/user";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const PatientenVerwaltungMain = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let data;
  data = getPatientverwaltung();

  if (data) {
    data.patienten.map(
      (patient) => (patient["vollname"] = `${patient.name} ${patient.vorname}`)
    );
  }

  const [patientQuery, setPatientQuery] = useState("");

  const [patientData, setPatientData] = useState();

  const [selectedPatient, setSelectedPatient] = useState(
    data?.patienten[0]?.vollname || ""
  );

  if (userRole === "patient") {
    return <Unauthorized />;
  }

  const filteredPeople =
    patientQuery === ""
      ? data?.patienten
      : data?.patienten.filter((person) => {
          return person.vollname
            .toLowerCase()
            .includes(patientQuery.toLowerCase());
        });

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <div className="w-full min-h-screen px-3 pt-8 lg:px-4 bg-bg-primary">
        <div className="container px-6">
          <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
            Patientenverwaltung
          </h1>
          <div className="flex flex-wrap justify-between mb-4">
            <div className="flex flex-wrap px-2">
              <div className="top-24">
                <Combobox
                  value={selectedPatient}
                  onChange={(e) => {
                    setSelectedPatient(e.vollname);
                    setPatientData(e);
                  }}
                >
                  <Combobox.Label>Patient Suchen:</Combobox.Label>
                  <div className="relative mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                        height="60px"
                        onChange={(event) =>
                          setPatientQuery(event.target.value)
                        }
                      />
                      <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople?.length === 0 && patientQuery !== "" ? (
                          <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                            Kein Patient gefunden.
                          </div>
                        ) : (
                          filteredPeople?.map((person) => (
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
            <div className="px-2 mt-8 lg:mt-0">
              <button
                onClick={() => {
                  Router.push(`${Router.asPath}/new`);
                }}
                className="p-2 border border-black rounded-lg shadow"
              >
                Neuen Patienten anlegen
              </button>
            </div>
          </div>
          {patientData && (
            <PatientenVerwaltung
              patientData={patientData}
              stationäreAufnahme={data.stationaere.filter((data) => {
                return data.patientId === patientData.id;
              })}
              letzteBesuche={data.termine.filter((data) => {
                return (
                  data.patientId === patientData.id &&
                  new Date(data.datum) - Date.now() < 0
                );
              })}
            />
          )}
        </div>
      </div>
    </WithSidebar>
  );
};

export default PatientenVerwaltungMain;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
