import {
  CheckbokInput,
  FileInput,
  Input,
  RadioInput,
} from "@/components/Inputs/Forms";
import { DateConverter } from "@/utils/DateConverter";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from "date-fns/locale/de";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import Router from "next/router";
import { docUpload, fetcher } from "lib/fetcher";
import { Combobox } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { LoadingToast } from "@/page-components/Toast/Toast";

registerLocale("de", de);
const baseURL = "https://wippatientenakte.azure-api.net/";

const BehandlungsFormular = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  // useEffect(() => {
  //   if (!session) {
  //     Router.push(`/signin`);
  //   }
  // }, [session]);

  const [data, setData] = useState({
    datum: DateConverter(new Date()),
    uhrzeit: "",
  });

  const { data: pData, error: pError } = useSWR(
    `${baseURL}/s2/patienten`,
    fetcher
  );

  const { data: arztData, error: arztError } = useSWR(
    `${baseURL}/s4/arzte/`,
    fetcher
  );

  const [date, setDate] = useState(new Date());

  let filteredPatient;
  let filteredArzt;

  const [patientQuery, setPatientQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const [arztQuery, setArztQuery] = useState("");
  const [selectedArzt, setSelectedArzt] = useState("");

  if (pData && arztData) {
    pData.map(
      (patient) => (patient["vollname"] = `${patient.name} ${patient.vorname}`)
    );

    arztData.map((arzt) => (arzt["vollname"] = `${arzt.name} ${arzt.vorname}`));

    filteredPatient =
      patientQuery === ""
        ? pData
        : pData.filter((data) => {
            return data.vollname
              .toLowerCase()
              .includes(patientQuery.toLowerCase());
          });

    filteredArzt =
      arztQuery === ""
        ? arztData
        : arztData.filter((data) => {
            return data.vollname
              .toLowerCase()
              .includes(arztQuery.toLowerCase());
          });
  }
  const handleFile = (e) => {
    const doctype = e.target.name;
    if (doctype === "arztbrief") {
      setArztbrief(e.target.value[0]);
    } else if (doctype === "blutwerte") {
      setBlutwerte(e.target.value[0]);
    } else if (doctype === "roentgen") {
      setRoentgen(e.target.value[0]);
    } else if (doctype === "befunde") {
      setBefunde(e.target.value[0]);
    } else if (doctype === "rechnung") {
      setRechnung(e.target.value[0]);
    } else if (doctype === "sonstiges") {
      setSonstiges(e.target.value[0]);
    }
  };

  const handleChange = (e) => {
    let value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    toast((t) => <LoadingToast text="Dokumenten wird gespeichert..." />);
    if (!selectedPatient?.pid) {
      toast.remove();
      toast.error(`Fehlerhaft: bitte selektieren Sie einen Patient`, {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "#ff0000",
        },
      });
      return;
    }

    if (data.arztBrief) {
      try {
        const fileUpload = await docUpload({
          url: `${baseURL}s3/dokumente/?patient=${selectedPatient.pid}&bezeichnung=arztbrief`,
          body: {
            File: arztbrief,
          },
        });
      } catch (error) {}
    }
    if (data.blutWerte) {
      try {
        const fileUpload = await docUpload({
          url: `${baseURL}s3/dokumente/?patient=${selectedPatient.pid}&bezeichnung=blutwerte`,
          body: {
            File: blutwerte,
          },
        });
      } catch (error) {}
    }
    if (data.röntgenbilder) {
      try {
        const fileUpload = await docUpload({
          url: `${baseURL}s3/dokumente/?patient=${selectedPatient.pid}&bezeichnung=roentgenbilder`,
          body: {
            File: roentgen,
          },
        });
      } catch (error) {}
    }
    if (data.befunde) {
      try {
        const fileUpload = await docUpload({
          url: `${baseURL}s3/dokumente/?patient=${selectedPatient.pid}&bezeichnung=befunde`,
          body: {
            File: befunde,
          },
        });
      } catch (error) {}
    }
    if (data.rechnungen) {
      try {
        const fileUpload = await docUpload({
          url: `${baseURL}s3/dokumente/?patient=${selectedPatient.pid}&bezeichnung=rechnungen`,
          body: {
            File: rechnung,
          },
        });
      } catch (error) {}
    }
    if (data.sonstiges) {
      try {
        const fileUpload = await docUpload({
          url: `${baseURL}s3/dokumente/?patient=${selectedPatient.pid}&bezeichnung=sonstiges`,
          body: {
            File: sonstiges,
          },
        });
      } catch (error) {}
    }

    setTimeout(() => {
      toast((t) => (
        <LoadingToast text="Sie werden in Kürze weitergeleitet..." />
      ));
    }, 500);

    setTimeout(() => {
      Router.push(`/`);
    }, 1500);
  };

  const handleClear = () => {
    setData({
      patienten: "",
      arzt: "",
      datum: "",
      uhrzeit: "",
      arztBrief: false,
      blutWerte: false,
      röntgenbilder: false,
      befunde: false,
      rechnungen: false,
      sonstiges: false,
    });
  };

  return (
    <div className="w-full min-h-screen col-span-4 px-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container">
        <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
          Behandlungsformular für Ärzte
        </h1>

        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full">
              <p className="my-auto text-lg font-medium text-gray-900 ">
                Patient: &nbsp;
              </p>
              <div className="flex w-full flex-nowrap">
                <Combobox
                  value={selectedPatient ? `${selectedPatient?.name}` : ""}
                  onChange={(e) => {
                    setSelectedPatient({ pid: e.id, name: e.vollname });
                  }}
                >
                  <div className="relative w-full max-w-lg mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                        height="60px"
                        onChange={(event) =>
                          setPatientQuery(event.target.value)
                        }
                      />
                      <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPatient?.length === 0 &&
                        patientQuery !== "" ? (
                          <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                            Kein Patient gefunden.
                          </div>
                        ) : (
                          filteredPatient?.map((person) => (
                            <Combobox.Option
                              className="p-2 font-semibold hover:bg-gray-200"
                              key={person.id}
                              value={person}
                            >
                              <div>{person.vollname}</div>
                              <div className="font-thin">ID: {person.id}</div>
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </div>
                  </div>
                </Combobox>
              </div>
            </div>
          </div>

          <Input
            name="arzt"
            label={"Arzt"}
            disabled
            value={arztData && arztData.id}
            handleChange={handleChange}
          />

          <div className="flex gap-5">
            <div className="my-auto ">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Datum & Uhrzeit
              </label>

              <DatePicker
                dateFormat="dd.MM.yyyy HH:MM"
                locale="de"
                timeInputLabel="de"
                timeFormat="HH:mm"
                maxDate={new Date()}
                timeIntervals={1}
                showTimeSelect={true}
                selected={date}
                onChange={(date) => {
                  const e = {
                    target: { name: "datum", value: DateConverter(date) },
                  };
                  setDate(date);
                  handleChange(e);
                }}
                className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
              ></DatePicker>
            </div>
          </div>

          <div className="py-4 my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Wurde eine Impfung gemacht?
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/patient/${selectedPatient.pid}/impfung/new`}
              className="p-2 ml-5 border border-black rounded"
            >
              Impfung hinzufügen
            </a>
          </div>

          <div className="py-4 my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Muss der Medikationsplan angepasst werden?
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/patient/${selectedPatient.pid}/medikationsplan/new`}
              className="p-2 ml-5 border border-black rounded cursor-pointer"
            >
              Medikationsplan bearbeiten
            </a>
          </div>

          <div className="py-4 my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Muss der patient stationär aufgenommen werden?
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/aufenthalt`}
              className="p-2 ml-5 border border-black rounded"
            >
              Termin hinzufügen
            </a>
          </div>

          <div className="py-4 my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Muss ein weiterer Termin eingetragen werden?
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/termine/new`}
              className="p-2 ml-5 border border-black rounded"
            >
              Termin hinzufügen
            </a>
          </div>
        </div>

        <div className="flex p-4 mt-8 gap-x-8">
          <button
            onClick={handleClear}
            className={`px-3 py-2 rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
          >
            Verwerfen
          </button>
          <button
            onClick={handleSubmit}
            className={`px-3 py-2  rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default BehandlungsFormular;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
