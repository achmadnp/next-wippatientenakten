import { Input } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { PatientenVerwaltung } from "@/page-components/Patientenverwaltung";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const PatientIdx = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let data;

  const { data: userData, error: userError } = useSWR(
    `${baseURL}/s2/patienten/${props.pid.patientid}`,
    fetcher
  );

  const { data: stAufData, error: stAufError } = useSWR(
    `${baseURL}/s3/stationaererAufenthalte/?patientid=${props.pid.patientid}`,
    fetcher
  );

  const { data: terminData, error: terminError } = useSWR(
    `${baseURL}/s3/termine/`,
    fetcher
  );

  const patientData = [
    { fieldName: "Vollname", value: "Max Musterman" },
    { fieldName: "Email", value: "Max@musterman.com" },
    { fieldName: "Geschlecht", value: "Männlich" },
    { fieldName: "Geburtsdatum", value: "01.01.2015" },
    { fieldName: "Telefonnummer", value: "+49012345678" },
    { fieldName: "Rolle", value: "Assistenz" },
  ];

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />{" "}
      <div className="w-full min-h-screen px-3 pt-8 lg:px-4 bg-bg-primary">
        <div className="container">
          <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
            Patientdetail
          </h1>
          {userData && stAufData && (
            <PatientenVerwaltung
              isMain={true}
              patientData={userData}
              stationäreAufnahme={stAufData}
            />
          )}
        </div>
      </div>
    </WithSidebar>
  );
};

export default PatientIdx;

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
