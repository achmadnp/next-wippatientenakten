import { DateConverter } from "@/utils/DateConverter";
import { VerwaltungDokument } from "../Documents/VerwaltungDokument";
import { PersonalInfo } from "../Home/PersonalInfo";
import { Termine } from "../Home/Termine";
import { getRaumKrankenhaus } from "lib/data/krankenhaus/krankenhaus";

export const PatientenVerwaltung = ({
  patientData,
  stationäreAufnahme,
  letzteBesuche,
}) => {
  console.log(letzteBesuche);
  const PatientInfo = [
    {
      fieldName: "Vorname",
      value: `${patientData.vorname}`,
    },
    {
      fieldName: "Nachname",
      value: ` ${patientData.name}`,
    },
    { fieldName: "Email", value: patientData.email },
    { fieldName: "Geschlecht", value: patientData.geschlecht },
    {
      fieldName: "Geburtsdatum",
      value: DateConverter(new Date(patientData.geburtsdatum)),
    },
    { fieldName: "Telefonnummer", value: patientData.telefonnummer },
  ];
  return (
    <>
      <PersonalInfo data={PatientInfo} />
      <div className="mx-2 font-medium text-blue-600 underline cursor-pointer text-md">
        <a>Patienteninformationen</a>
      </div>
      <div className="mt-5">
        <p className="mt-4 text-lg font-bold underline">Stationäre Aufnahme</p>
        <div className="flex flex-col lg:gap-x-4 lg:flex-row">
          {stationäreAufnahme?.length > 0 &&
            stationäreAufnahme.map((data, index) => {
              let kh;

              kh = getRaumKrankenhaus({ raumId: data.raumId });

              if (kh) {
                return (
                  <div
                    className="max-w-lg p-4 my-4 space-y-1 bg-gray-300 border rounded"
                    key={index}
                  >
                    <p>{kh.name}</p>
                    <p>
                      stationäre Aufname am{" "}
                      {DateConverter(new Date(data.aufnahmezeitpunkt))}
                    </p>
                  </div>
                );
              }
            })}

          {stationäreAufnahme?.length <= 0 && (
            <div className="max-w-lg p-4 my-4">Keine Einträge</div>
          )}
        </div>
      </div>
      <div className="mt-6 md:mt-10">
        <p className="mt-4 text-lg font-bold underline">Letzte Besuche</p>
        {letzteBesuche?.length > 0 && (
          <div className="flex flex-wrap gap-2 md:gap-4">
            {letzteBesuche.map((besuch, i) => {
              let kh;

              kh = getRaumKrankenhaus({ raumId: besuch.raum });
              if (kh) {
                return (
                  <div
                    key={i}
                    className="block max-w-md p-6 bg-green-200 border rounded-lg hover:bg-green-100"
                  >
                    <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-md lg:text-xl ">
                      {besuch.anliegen}
                    </h5>
                    <div className="grid grid-cols-2">
                      <p className="text-sm font-semibold text-gray-900 lg:text-md">
                        Datum / Uhrzeit:
                      </p>
                      <p className="text-sm font-normal text-gray-700 lg:text-md">
                        {DateConverter(new Date(besuch.datum))}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 lg:text-md">
                        Raum:
                      </p>
                      <p className="text-sm font-normal text-gray-700 lg:text-md">
                        {kh.name}, Raum: {besuch.raumnummer}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 lg:text-md">
                        Arzt:
                      </p>
                      <p className="font-normal text-gray-700">
                        {besuch.aVorname} {besuch.aName}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      <div className="mt-4 text-lg font-bold underline">Dokumente</div>
      <VerwaltungDokument pid={patientData.id} />
    </>
  );
};
