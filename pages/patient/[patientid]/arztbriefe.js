import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { ArztbriefTbl } from "@/page-components/Documents/Arztbrief";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const Arztbrief = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: abData, error: abError } = useSWR(
    `${baseURL}/s3/dokumente/?patientid=${props?.pid.patientid}`,
    fetcher
  );

  let arztBrief;

  if (abError) <div>fehler</div>;
  if (!abData) <div>Loading...</div>;

  if (abData) {
    arztBrief = abData.filter((data) => {
      return data.bezeichnung.includes("arztbrief");
    });
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Arztbriefe
          </p>
        </div>
        <div className="container overflow-hidden">
          <ArztbriefTbl docs={arztBrief} />
        </div>
      </div>
    </WithSidebar>
  );
};

export default Arztbrief;

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
