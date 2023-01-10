import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const Gesundheitsdaten = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  const pid = props.pid;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: stammData, error: stammError } = useSWR(
    `${baseURL}/s2/patienten/${pid}`,
    fetcher
  );

  const { data: gData, error: gError } = useSWR(
    `${baseURL}/s2/gesundheitsdaten/?patient=${pid}`,
    fetcher
  );

  let data;

  if (!stammData) return <div>Loading</div>;

  if (stammData && gData) {
    data = [
      {
        fieldName: "Vollname",
        value: `${stammData.vorname} ${stammData.name}`,
      },
      { fieldName: "Gewicht", value: gData[0]?.gewichtKG },
      { fieldName: "Größe", value: gData[0]?.groeßeCM },
      { fieldName: "Vorerkrankungen", value: gData[0]?.vorerkrankungen },
      { fieldName: "Allergien", value: gData[0]?.allergien },
    ];
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <div className="w-full min-h-screen col-span-4 px-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
        <div className="container">
          <div className="p-2 space-y-4 border-2 rounded">
            <p className="text-lg font-bold">Persönliche Daten</p>
            <div className="flex justify-start gap-8">
              <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                {data &&
                  data.map((field) => (
                    <div key={field.fieldName} className="pt-2">
                      <p className="overflow-hidden font-bold text-ellipsis text-md">
                        {field.fieldName}
                      </p>
                      <p className="overflow-hidden font-normal text-ellipsis text-md">
                        {field.value}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithSidebar>
  );
};

export default Gesundheitsdaten;

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
