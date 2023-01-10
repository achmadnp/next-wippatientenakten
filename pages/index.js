import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { Home } from "@/page-components/Home";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { getUserIndexData } from "lib/data/user/user";

import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export default function Index(props) {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let data;

  data = getUserIndexData({ role: session?.userRole, id: session?.id });

  if (!data) return <div>Loading</div>;

  if (!session) return <div>No-Ses</div>;

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <Home role={userRole} data={data} />
    </WithSidebar>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
