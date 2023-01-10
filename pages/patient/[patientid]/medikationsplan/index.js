import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { MedicationTable } from "@/page-components/Medication/Medication";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

export const Medikationsplan = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  const pid = props.pid;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: mplanData, error: mplanError } = useSWR(
    `${baseURL}/s2/medikationsplane`,
    fetcher
  );

  if (mplanError) return <div>Failed to Fetch data</div>;
  if (!mplanData) return <div>Loading...</div>;

  const addNewMedikation = () => {
    Router.push(`${Router.asPath}/new`);
  };

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container">
          {/* breadcrumb */}
          <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
            Medikationsplan
          </h1>
          {userRole === "arzt" && (
            <button
              onClick={addNewMedikation}
              className="p-2 mb-2 border border-black rounded-lg shadow"
            >
              Medikament hinzufügen
            </button>
          )}

          <MedicationTable
            medikationsplane={mplanData.filter(
              (medikation) => medikation.patientId === pid
            )}
          />
        </div>
      </div>
    </WithSidebar>
  );
};

export default Medikationsplan;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const pid = await context.params.patientid;

  return {
    props: {
      session,
      pid,
    },
  };
}
