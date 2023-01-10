import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { AufenthaltComponentPage } from "@/page-components/Assistenz/Aufenthalt/Index";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Aufenthalt = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole })} />
      <AufenthaltComponentPage />
    </WithSidebar>
  );
};

export default Aufenthalt;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
