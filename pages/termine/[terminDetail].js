import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { PersonalInfo } from "@/page-components/Home/PersonalInfo";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { getRaumKrankenhaus } from "lib/data/krankenhaus/krankenhaus";
import useSWR from "swr";
import { DateConverter, TimeConverter } from "@/utils/DateConverter";
import Router from "next/router";

const baseURL = "https://wippatientenakte.azure-api.net/";

const TerminDetail = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  const ctxInfo = props.context.terminDetail.split("&");

  const pid = ctxInfo[0];
  const aid = ctxInfo[1];
  const datum = ctxInfo[2].replace(":", "%3A");

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  //   Data: arzt, datum, behandlung, raum, anliegen

  let data;
  let khr;
  const { data: pData, error: pError } = useSWR(
    `${baseURL}/s2/patienten/${pid}`,
    fetcher
  );

  const { data: aData, error: aError } = useSWR(
    `${baseURL}/s4/arzte/${aid}`,
    fetcher
  );

  const { data: tData, error: tError } = useSWR(
    `${baseURL}/s3/termine/${pid}/${aid}/${datum}`,
    fetcher
  );

  const { data: khidData, error: khidError } = useSWR(
    tData ? `${baseURL}/s3/raume/${tData.raum}` : null,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    khidData ? `${baseURL}/s4/krankenhauser/${khidData.krankenhaus}` : null,
    fetcher
  );

  if (pData && aData && khData) {
    data = {
      patient: {
        name: `${pData.name}, ${pData.vorname}`,
        id: pData.id,
        geburtsdatum: DateConverter(new Date(pData.geburtsdatum)),
        geschlecht: pData.geschlecht,
      },
      arzt: {
        name: `${aData.name}, ${aData.vorname}`,
        email: aData.email,
      },
      termin: {
        datum: `${DateConverter(new Date(tData.datum))}, ${TimeConverter(
          new Date(tData.datum)
        )}`,
        anliegen: tData.anliegen,
        behandlung: tData.behandlung,
        ort: `${khData.name}, Raum: ${khidData.raumnummer}`,
        adresse: `${khData.adresse}`,
      },
    };
  }

  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />

      <div className="w-full min-h-screen px-2 lg:px-3 bg-bg-primary">
        <div className="container space-y-5">
          <div className="flex my-4">
            <p className="mx-auto text-3xl font-bold">Terminübersicht</p>
          </div>
          <div className="p-2 space-y-4 border-2 border-black rounded">
            <div className="flex">
              <p className="mx-auto text-2xl font-bold">Patienteninformation</p>
            </div>

            <div className="grid w-full grid-cols-1 lg:grid-cols-2">
              <div className="py-4 mx-auto">
                <div>
                  <p className="text-xl font-semibold">Name</p>
                  <p className="font-thin text-md">{data.patient.name}</p>
                </div>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">ID</p>
                <p className="mx-auto font-thin text-md">{data.patient.id}</p>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Geburtsdatum</p>
                <p className="mx-auto font-thin text-md">
                  {data.patient.geburtsdatum}
                </p>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Geschlecht</p>
                <p className="mx-auto font-thin text-md">
                  {data.patient.geschlecht}
                </p>
              </div>
            </div>
            <div className="flex">
              <p className="mx-auto text-2xl font-bold">Arztinformation</p>
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-2">
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Name</p>
                <p className="mx-auto font-thin text-md">{data.arzt.name}</p>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Email</p>
                <p className="mx-auto font-thin text-md">{data.arzt.email}</p>
              </div>
            </div>

            <div className="flex">
              <p className="mx-auto text-2xl font-bold">Termininformation</p>
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-2">
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Datum</p>
                <p className="mx-auto font-thin text-md">{data.termin.datum}</p>
              </div>

              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Anliegen</p>
                <p className="mx-auto font-thin text-md">
                  {data.termin.anliegen}
                </p>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Behandlung</p>
                <p className="mx-auto font-thin text-md">
                  {data.termin.behandlung}
                </p>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Ort</p>
                <p className="mx-auto font-thin text-md">{data.termin.ort}</p>
              </div>
              <div className="py-4 mx-auto">
                <p className="mx-auto text-xl font-semibold">Adresse</p>
                <p className="mx-auto font-thin text-md">
                  {data.termin.adresse}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithSidebar>
  );
};

export default TerminDetail;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const ctx = context.params;

  return {
    props: {
      session,
      context: ctx,
    },
  };
}
