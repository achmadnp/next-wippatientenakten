import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { VaccDropdown } from "@/page-components/Documents/Impfstatus";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const Impfung = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  const pid = props.pid;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let filteredData = [];
  let groupedData = [];

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const { data: impfData, error: impfError } = useSWR(
    `${baseURL}/s2/impfungen/`,
    fetcher
  );

  if (impfError) return <div>Failed to Fetch data</div>;
  if (!impfData) return <div>Loading...</div>;
  if (impfData) {
    groupedData = groupBy(
      impfData.filter((data) => data.patientId === pid),
      "ibezeichnung"
    );

    filteredData = Object.keys(groupedData).map((key) => [
      key,
      groupedData[key],
    ]);
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <div className="w-full min-h-screen px-6 bg-bg-primary">
        <div className="container flex ">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Impfstatus
          </p>
        </div>
        <div className="container overflow-hidden">
          {impfError && <div>Failed to Fetch data</div>}
          {!impfData && <div>wird geladen..</div>}
          {filteredData.length == 0 && <div>Keine Impfdaten gefunden</div>}
          {filteredData &&
            filteredData.map((data, i) => {
              return <VaccDropdown key={i} vac={data} />;
            })}
          {userRole === "arzt" && (
            <div>
              <button
                onClick={() => {
                  Router.push(`${Router.asPath}/new`);
                }}
                className="p-2 border-2 border-black rounded-md"
              >
                Impfung hinzufügen
              </button>
            </div>
          )}
        </div>
      </div>
    </WithSidebar>
  );
};

export default Impfung;

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
