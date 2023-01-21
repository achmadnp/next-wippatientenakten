import {
  ArrowLeftOnRectangleIcon,
  ClockIcon,
  DocumentIcon,
  DocumentMinusIcon,
  HomeIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

export const getSidebarMenus = ({ role, id }) => {
  switch (role) {
    case "patient":
      return [
        { title: "Home", icon: <HomeIcon />, ref: "/" },
        { title: "Termine", icon: <ClockIcon />, ref: "/termine" },
        {
          title: "Medikationsplan",
          icon: <UserIcon />,
          ref: `/patient/${id}/medikationsplan`,
        },
        {
          title: "Dokumente",
          icon: <DocumentIcon />,
          submenus: [
            { title: "Stammdaten", ref: `/patient/${id}/daten/stammdaten` },
            { title: "Impfungen", ref: `/patient/${id}/impfung` },
            { title: "Arztbrief", ref: `/patient/${id}/arztbriefe` },
          ],
        },
        { title: "Abmelden", icon: <ArrowLeftOnRectangleIcon /> },
      ];

    case "arzt":
      return [
        { title: "Home", icon: <HomeIcon />, ref: "/" },
        {
          title: "Patientenverwaltung",
          icon: <UsersIcon />,
          ref: "/patient",
        },
        {
          title: "Behandlungsformular",
          icon: <DocumentIcon />,
          ref: "/form/arzt",
        },
        { title: "Termine", icon: <ClockIcon />, ref: "/termine" },
        { title: "Abmelden", icon: <ArrowLeftOnRectangleIcon /> },
      ];

    case "assistent":
      return [
        { title: "Home", icon: <HomeIcon />, ref: "/" },
        {
          title: "Patientenverwaltung",
          icon: <UsersIcon />,
          ref: "/patient",
        },
        {
          title: "Assistenzformular",
          icon: <DocumentIcon />,
          ref: "/form/assistent",
        },
        {
          title: "Stationärer Aufenthalt",
          icon: <MapPinIcon />,
          ref: "/aufenthalt",
        },
        { title: "Termine", icon: <ClockIcon />, ref: "/termine" },
        { title: "Abmelden", icon: <ArrowLeftOnRectangleIcon /> },
      ];

    case "verwaltung":
      return [
        { title: "Home", icon: <HomeIcon />, ref: "/" },
        {
          title: "Patienten- und Mitarbeiterverwaltung",
          icon: <UsersIcon />,
          ref: "/verwalten",
        },
        {
          title: "Löschanträge",
          icon: <DocumentMinusIcon />,
          ref: "/loeschen",
        },
        { title: "Abmelden", icon: <ArrowLeftOnRectangleIcon /> },
      ];

    default:
      break;
  }
};
