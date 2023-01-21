import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { BesucheTbl } from "@/page-components/Documents/Besuche";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const Besuche = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: pData, error: pError } = useSWR(
    `${baseURL}/s3/termine/?patientid=${props.pid.patientid}`,
    fetcher
  );

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Vergangene Besuche bei medizinischen Einrichtungen
          </p>
        </div>
        {!pData && <div>Loading...</div>}
        {pData && (
          <BesucheTbl
            tblData={pData.filter((data) => {
              return new Date(data.datum).getTime() < Date.now();
            })}
          />
        )}
      </div>
    </WithSidebar>
  );
};

export default Besuche;

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
