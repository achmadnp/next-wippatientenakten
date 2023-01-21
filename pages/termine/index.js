import { IconButton } from "@/components/Buttons/Button";
import { Input } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { PlusSvg } from "@/components/svgs/Svgs";
import {
  AlleTermine,
  NaechsteTermine,
} from "@/page-components/Termine/Termine";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { Combobox } from "@headlessui/react";
import { getPatientTermin, getUserTerminData } from "lib/data/termine/termin";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";

const Appointment = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let data;
  const [arztQuery, setArztQuery] = useState("");
  const [selectedArzt, setSelectedArzt] = useState("");
  let filteredArzt;
  let filteredTermine;

  data = getUserTerminData({ role: session?.userRole, id: session?.id });
  const pages = [1, 2, 3, 4];

  if (!data) return <div>Loading</div>;

  if ((userRole === "assistent" || userRole === "verwaltung") && data) {
    data.arztData.map(
      (arzt) => (arzt["vollname"] = `${arzt.name} ${arzt.name}`)
    );

    filteredArzt =
      arztQuery === ""
        ? data.arztData
        : data.arztData.filter((arzt) =>
            arzt.vollname.toLowerCase().includes(arztQuery.toLowerCase())
          );

    if (selectedArzt) {
      filteredTermine = data.terminData.filter(
        (termine) => termine.arztId === selectedArzt.aid
      );
    }
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <div className="w-full min-h-screen px-2 lg:px-3 bg-bg-primary">
        {(userRole === "patient" || userRole === "arzt") && (
          <div className="container">
            <p className="py-4 mx-auto text-4xl font-bold underline ">
              Termine
            </p>

            <p className="py-4 mx-auto text-2xl font-semibold ">
              Nächste Termine:
            </p>
            <NaechsteTermine termine={data} />
            <div className="flex justify-between">
              <p className="py-8 text-2xl font-semibold ">Alle Termine:</p>
              {userRole === "arzt" && (
                <IconButton
                  onClick={(e) => {
                    Router.push(`${Router.asPath}/new`);
                  }}
                  svgIcon={<PlusSvg />}
                  content="Termin hinzufügen"
                  className="flex px-4 py-1 my-auto border-2 rounded"
                />
              )}
            </div>

            <AlleTermine termine={data} role={userRole} />
          </div>
        )}

        {(userRole === "assistent" || userRole === "verwaltung") && (
          <div className="container">
            <p className="py-4 mx-auto text-4xl font-bold underline ">
              Termine
            </p>

            {(userRole === "assistent" || userRole === "verwaltung") && (
              <div className="flex flex-wrap justify-between">
                <div className="w-full px-6">
                  <p className="my-auto text-lg font-medium text-gray-900 ">
                    Arzt Suchen: &nbsp;
                  </p>
                  <div className="flex w-full flex-nowrap">
                    <Combobox
                      value={selectedArzt ? `${selectedArzt?.name}` : ""}
                      onChange={(e) => {
                        setSelectedArzt({
                          aid: e.id,
                          name: e.vollname,
                        });
                      }}
                    >
                      <div className="relative w-full max-w-lg mt-1">
                        <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                          <Combobox.Input
                            className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                            height="60px"
                            onChange={(event) =>
                              setArztQuery(event.target.value)
                            }
                          />
                          <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredArzt?.length === 0 && arztQuery !== "" ? (
                              <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                                Kein Arzt gefunden.
                              </div>
                            ) : (
                              filteredArzt?.map((arzt) => (
                                <Combobox.Option
                                  className="p-2 font-semibold hover:bg-gray-200"
                                  key={arzt.id}
                                  value={arzt}
                                >
                                  <div className="font-semibold">
                                    {arzt.vollname}
                                  </div>
                                  <div className="font-thin">ID: {arzt.id}</div>
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
            )}

            {selectedArzt && (
              <div>
                <p className="py-4 mx-auto text-2xl font-semibold ">
                  Nächste Termine:
                </p>
                <NaechsteTermine termine={filteredTermine} />
                <div className="flex justify-between">
                  <p className="py-8 text-2xl font-semibold ">Alle Termine:</p>
                  {userRole === "arzt" && (
                    <IconButton
                      onClick={(e) => {
                        Router.push(`${Router.asPath}/new`);
                      }}
                      svgIcon={<PlusSvg />}
                      content="Termin hinzufügen"
                      className="flex px-4 py-1 my-auto border-2 rounded"
                    />
                  )}
                </div>
                <AlleTermine termine={filteredTermine} role={userRole} />
              </div>
            )}
          </div>
        )}

        {/* <div className="flex mt-8">
          <ul className="inline-flex mx-auto border-2 border-black divide-x divide-gray-300 rounded">
            {pages.map((page, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 hover:font-bold hover:text-gray-900 "
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </WithSidebar>
  );
};

export default Appointment;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
