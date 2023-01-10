import {
  CheckbokInput,
  FileInput,
  Input,
  RadioInput,
} from "@/components/Inputs/Forms";
import { DateConverter } from "@/utils/DateConverter";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from "date-fns/locale/de";

registerLocale("de", de);

const BehandlungsFormular = () => {
  const [data, setData] = useState({
    patient: "",
    arzt: "",
    datum: DateConverter(new Date()),
    uhrzeit: "",
    arztBrief: false,
    blutWerte: false,
    röntgenbilder: false,
    befunde: false,
    rechnungen: false,
    sonstiges: false,
  });

  const [date, setDate] = useState(new Date());
  const [impfungData, setImpfungData] = useState();
  const [medikationsPlan, setMedikationsPlan] = useState();
  const [termin, setTermin] = useState();
  const [documents, setDocuments] = useState([]);

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

  const handleSubmit = () => {
    console.log(data);
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

    setDate(new Date());
    setImpfungData(undefined);
    setMedikationsPlan(undefined);
    setTermin(undefined);
    setDocuments([]);
  };

  return (
    <div className="w-full min-h-screen col-span-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container">
        <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
          BehandlungsFormular für Ärzte
        </h1>

        <div className="grid grid-cols-1 gap-y-4">
          <Input
            name="patient"
            label={"Patient"}
            value={data.patient}
            handleChange={handleChange}
          />

          <Input
            name="arzt"
            label={"Arzt"}
            value={data.arzt}
            handleChange={handleChange}
          />

          <div className="flex gap-5">
            <div className="my-auto ">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Datum
              </label>

              <DatePicker
                dateFormat="dd.MM.yyyy"
                locale="de"
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
            <Input
              name="uhrzeit"
              label={"Uhrzeit"}
              type={"time"}
              value={data.uhrzeit}
              handleChange={handleChange}
            />
          </div>

          <div className="my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Wurde eine Impfung gemacht?
            </p>
            <button className="p-2 ml-5 border border-black rounded">
              Impfung hinzufügen
            </button>
          </div>

          <div className="my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Muss der Medikationsplan angepasst werden?
            </p>
            <button className="p-2 ml-5 border border-black rounded">
              Medikationsplan bearbeiten
            </button>
          </div>

          <div className="my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Welche Dokumente sind entstanden?
            </p>

            <CheckbokInput
              name={"arztBrief"}
              content={"Arztbrief"}
              handleCheck={handleChange}
            />
            {data.arztBrief && <FileInput />}

            <CheckbokInput
              name={"blutWerte"}
              content={"Blutwerte"}
              handleCheck={handleChange}
            />
            {data.blutWerte && <FileInput />}

            <CheckbokInput
              name={"röntgenbilder"}
              content={"Röntgenbilder"}
              handleCheck={handleChange}
            />
            {data.röntgenbilder && <FileInput />}

            <CheckbokInput
              name={"befunde"}
              content={"Befunde"}
              handleCheck={handleChange}
            />
            {data.befunde && <FileInput />}

            <CheckbokInput
              name={"rechnungen"}
              content={"Rechnungen"}
              handleCheck={handleChange}
            />
            {data.rechnungen && <FileInput />}

            <CheckbokInput
              name={"sonstiges"}
              content={"Sonstiges"}
              handleCheck={handleChange}
            />
            {data.sonstiges && <FileInput />}
          </div>

          <div className="my-auto">
            <p className="block mb-2 text-lg font-medium text-gray-900 ">
              Muss ein weiterer Termin eingetragen werden?
            </p>
            <button className="p-2 ml-5 border border-black rounded">
              Termin hinzufügen
            </button>
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
