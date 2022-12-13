import { IconButton } from "@/components/Buttons/Button";
import { PlusSvg } from "@/components/svgs/Svgs";
import {
  NextAppointments,
  OwnAppointments,
} from "@/page-components/Appointments/Appointments";
import Sidebar from "@/page-components/Sidebar";

const Appointment = (props) => {
  const nextAppointments = [
    {
      id: "j9s1uy23e9mx1j",
      date: "22.11.2022",
      time: "09:30",
      issue: "Visite",
      patient: "Max Mustermann",
      location: "Station C1 - Raum 120",
    },
    {
      id: "px0328um0xqs",
      date: "12.12.2022",
      time: "11:30",
      issue: "EKG",
      patient: "Max Mustermann",
      location: "Station B1 - Raum 210",
    },
  ];

  const ownAppointments = [
    {
      id: "umd1ih1w8d9h18w",
      date: "11.01.2023",
      time: "15:00",
      issue: "Visite",
      patient: "Alex Mustermann",
      location: "Station A1 - Raum 330",
    },
    {
      id: "xm328um1w8sad",
      date: "02.02.2023",
      time: "11:00",
      issue: "MRT Thorax",
      patient: "Erika Musterfrau",
      location: "Station A1 - Raum 130",
    },
    {
      id: "maskldna98127sla",
      date: "09.02.2023",
      time: "13:45",
      issue: "EKG",
      patient: "Alex Mustermann",
      location: "Station B3 - Raum 220",
    },
  ];

  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="min-h-screen col-span-6 bg-bg-primary min-w-screen">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">Termine</p>
        </div>
        <div className="container overflow-hidden">
          <p className="py-4 mx-auto text-2xl font-semibold ">
            Nächste Termine:
          </p>
          <NextAppointments />
          <div className="flex justify-between">
            <p className="py-8 text-2xl font-semibold ">Eigene Termine:</p>
            <IconButton
              svgIcon={<PlusSvg />}
              content="Termin hinzufügen"
              className="flex px-4 py-1 my-auto border-2 rounded"
            />
          </div>

          <OwnAppointments />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
