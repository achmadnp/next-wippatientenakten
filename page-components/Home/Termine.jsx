import { DateConverter } from "@/utils/DateConverter";
import { getRaumKrankenhaus } from "lib/data/krankenhaus/krankenhaus";
import Router from "next/router";
import { useState } from "react";

export const Termine = ({ title = "Kommende Termine", termine }) => {
  let allKH = [];

  termine.map((termin, i) => {
    const khData = getRaumKrankenhaus({ raumId: termin.raum });

    if (khData) {
      allKH.push(khData?.name);
    }
  });

  return (
    <div className="mt-6 md:mt-10">
      <p className="mb-4 text-lg font-bold underline">{title}</p>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {termine.length === 0 && (
          <span className="">Keine kommende Termine</span>
        )}
        {termine.map((termin, i) => (
          <button
            key={i}
            onClick={() => {
              Router.push({
                pathname: `/termine/${termin.patientId}&${termin.arztId}&${termin.datum}`,
              });
            }}
            className="block max-w-md p-6 bg-green-200 border rounded-lg hover:bg-green-100"
          >
            <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-md lg:text-xl ">
              {termin.anliegen}
            </h5>
            <div className="grid grid-cols-2">
              <p className="text-sm font-semibold text-gray-900 lg:text-md">
                Datum / Uhrzeit:
              </p>
              <p className="text-sm font-normal text-gray-700 lg:text-md">
                {DateConverter(new Date(termin.datum))}
              </p>
              <p className="text-sm font-semibold text-gray-900 lg:text-md">
                Raum:
              </p>
              <p className="text-sm font-normal text-gray-700 lg:text-md">
                {allKH[i]}, Raum: {termin.raumnummer}
              </p>
              <p className="text-sm font-semibold text-gray-900 lg:text-md">
                Arzt:
              </p>
              <p className="font-normal text-gray-700">
                {termin.aVorname} {termin.aName}
              </p>
            </div>
          </button>
        ))}

        {/* Arzt Sicht */}
        {/* <a
          href="#"
          className="max-w-lg p-6 bg-green-200 border rounded-lg hover:bg-gray-100"
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            MRT Thorax
          </h5>
          <div className="grid grid-cols-2">
            <p className="font-semibold text-gray-900 text-md">
              Datum / Uhrzeit:
            </p>
            <p className="font-normal text-gray-700">
              &nbsp; 22.04.2023 09:30Uhr
            </p>
            <p className="font-semibold text-gray-900 text-md">Raum:</p>
            <p className="font-normal text-gray-700">
              &nbsp; Station A1 - Raum 000
            </p>
            <p className="font-semibold text-gray-900 text-md">Patient:</p>
            <p className="font-normal text-gray-700">&nbsp; Max Musterman</p>
          </div>
        </a> */}
      </div>
    </div>
  );
};
