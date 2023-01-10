import { Input, TextAreaInput } from "@/components/Inputs/Forms";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useSWR from "swr";
import { Combobox } from "@headlessui/react";
import { fetcher, postReq } from "lib/fetcher";
const baseURL = "https://wippatientenakte.azure-api.net";

export const AufenthaltComponentPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const { data: patientData, error: patientError } = useSWR(
    `${baseURL}/s2/patienten`,
    fetcher
  );

  const { data: raumData, error: raumError } = useSWR(
    `${baseURL}/s3/raume`,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    `${baseURL}/s4/krankenhauser`,
    fetcher
  );

  const [patientQuery, setPatientQuery] = useState("");

  const [khQuery, setKhQuery] = useState("");

  const [selectedPatient, setSelectedPatient] = useState("");

  const [selectedKH, setSelectedKH] = useState("");

  const [hinweise, setHinweise] = useState("");

  let filteredPatient;
  let filteredRaum;

  if (patientData && khData && raumData) {
    patientData.map(
      (patient) => (patient["vollname"] = `${patient.name} ${patient.vorname}`)
    );

    raumData.map((raum) => {
      return (raum["khName"] = khData.filter(
        (kh) => kh.id === raum.krankenhaus
      )[0]?.name);
    });

    filteredPatient =
      patientQuery === ""
        ? patientData
        : patientData.filter((data) => {
            return data.vollname
              .toLowerCase()
              .includes(patientQuery.toLowerCase());
          });

    filteredRaum =
      khQuery === ""
        ? raumData
        : raumData.filter((raum) =>
            raum.khName.toLowerCase().includes(khQuery.toLowerCase())
          );
  }

  const handleBestaetigen = async () => {
    try {
      const post = await postReq({
        url: `${baseURL}/s3/stationaererAufenthalte`,
        body: {
          patientId: selectedPatient.pid,
          raumId: selectedKH.rid,
          aufnahmezeitpunkt: startDate,
          entlassungszeitraum: finishDate,
          hinweise: hinweise,
        },
      });

      console.log(`post ${post}`);
      if (post) {
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <div className="w-full min-h-screen col-span-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container px-4">
        <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
          Stationärer Aufenthalt - Patient hinzufügen
        </h1>
        <div className="space-y-2">
          <div className="flex flex-wrap justify-between">
            <div className="w-full px-6">
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
          <div className="flex flex-wrap justify-between">
            <div className="w-full px-6">
              <p className="my-auto text-lg font-medium text-gray-900 ">
                Raum: &nbsp;
              </p>
              <div className="flex w-full flex-nowrap">
                <Combobox
                  value={
                    selectedKH
                      ? `${selectedKH?.kh}, Raum: ${selectedKH?.no}`
                      : ""
                  }
                  onChange={(e) => {
                    setSelectedKH({
                      rid: e.id,
                      kh: e.khName,
                      no: e.raumnummer,
                    });
                  }}
                >
                  <div className="relative w-full max-w-lg mt-1">
                    <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                      <Combobox.Input
                        className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                        height="60px"
                        onChange={(event) => setKhQuery(event.target.value)}
                      />
                      <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredRaum?.length === 0 && khQuery !== "" ? (
                          <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                            Kein Query gefunden.
                          </div>
                        ) : (
                          filteredRaum?.map((raum) => (
                            <Combobox.Option
                              className="p-2 hover:bg-gray-200"
                              key={raum.id}
                              value={raum}
                            >
                              <div className="font-semibold">
                                {raum.khName}, Raumnummer: {raum.raumnummer}
                              </div>
                              <div className="font-thin">RaumID: {raum.id}</div>
                              <div className="font-thin">
                                KrankenhausId: {raum.krankenhaus}
                              </div>
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
          <div className="px-6 space-y-2">
            <div className="my-auto">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Tag der Aufnahme
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
              ></DatePicker>
            </div>

            <div className="my-auto ">
              <label className="block mb-2 text-lg font-medium text-gray-900 ">
                Tag der Entlassung
              </label>

              <DatePicker
                selected={finishDate}
                onChange={(date) => setFinishDate(date)}
                className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
              ></DatePicker>
            </div>

            <div className="max-w-2xl">
              <TextAreaInput
                handleChange={(e) => setHinweise(e.target.value)}
                label={"Hinweise"}
              />
            </div>

            <div>
              {" "}
              <button
                onClick={handleBestaetigen}
                className="p-2 mt-10 border border-black rounded"
              >
                Bestätigen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
