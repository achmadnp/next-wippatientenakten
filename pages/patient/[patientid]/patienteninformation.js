import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { UserDocTbl } from "@/page-components/Documents/PatientInformation";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const PatientInfo = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  const { data: uDocs, error: uError } = useSWR(
    `${baseURL}/s3/dokumente?patientid=${props.pid.patientid}`,
    fetcher
  );

  let blutwerte;
  let roentgen;
  let befunde;
  let rechnung;
  let sonstiges;

  if (uDocs) {
    blutwerte = uDocs.filter((data) => {
      return data.bezeichnung.includes("blutwerte");
    });

    roentgen = uDocs.filter((data) => {
      return data.bezeichnung.includes("roentgen");
    });

    befunde = uDocs.filter((data) => {
      return data.bezeichnung.includes("befunde");
    });

    rechnung = uDocs.filter((data) => {
      return data.bezeichnung.includes("rechnung");
    });

    sonstiges = uDocs.filter((data) => {
      return data.bezeichnung.includes("sonstiges");
    });
  }

  const tableData = [
    {
      praxis: "praxis1",
      part: "körperteil1",
      datum: "01.01.2000",
    },
    {
      praxis: "praxis2",
      part: "körperteil2",
      datum: "01.01.2000",
    },
    {
      praxis: "praxis3",
      part: "körperteil3",
      datum: "01.01.2000",
    },
  ];
  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <div className="w-full min-h-screen px-2 pt-2 bg-bg-primary">
        <div className="container flex">
          <p className="py-4 mx-auto text-xl font-bold underline md:text-2xl lg:text-4xl">
            Patientendokumenten
          </p>
        </div>
        <div className="container max-w-4xl px-3 pt-8 overflow-hidden lg:px-4">
          {!uDocs && <div>Loading...</div>}
          {uDocs && (
            <div>
              <Dropdown headline="Blutwerte">
                <div>
                  <UserDocTbl tblData={blutwerte} />
                </div>
              </Dropdown>
              <Dropdown headline="Röntgenbilder">
                <div>
                  <UserDocTbl tblData={roentgen} />
                </div>
              </Dropdown>
              <Dropdown headline="Befunde">
                <div>
                  <UserDocTbl tblData={befunde} />
                </div>
              </Dropdown>
              <Dropdown headline="Kostenaufklärung/Rechnungen">
                <div>
                  <UserDocTbl tblData={rechnung} />
                </div>
              </Dropdown>
              <Dropdown headline="Sonstiges">
                <div>
                  <UserDocTbl tblData={sonstiges} />
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </WithSidebar>
  );
};

export default PatientInfo;

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
