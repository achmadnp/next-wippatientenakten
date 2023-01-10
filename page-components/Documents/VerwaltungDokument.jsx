import Router from "next/router";
import { Children } from "react";

export const VerwaltungDokument = ({ pid }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <DokumentCard pid={pid} onClickRef={"impfung"}>
        Impfungen
      </DokumentCard>
      <DokumentCard pid={pid} onClickRef={"arztbriefe"}>
        Arztbriefe
      </DokumentCard>
      <DokumentCard pid={pid} onClickRef={"medikationsplan"}>
        Medikationsplan
      </DokumentCard>
      <DokumentCard pid={pid} onClickRef={"daten/stammdaten"}>
        Stammdaten
      </DokumentCard>
      <DokumentCard pid={pid} onClickRef={"daten/gesundheitsdaten"}>
        Gesundheitsdaten
      </DokumentCard>
    </div>
  );
};

const DokumentCard = ({ children, pid, onClickRef }) => {
  return (
    <div
      onClick={() => {
        Router.push(`${Router.asPath}/${pid}/${onClickRef}`);
      }}
      className="flex p-2 px-1 mx-6 my-1 space-x-3 border border-black rounded-lg cursor-pointer group hover:bg-slate-300"
    >
      <div className="p-0 mx-auto my-auto md:p-1 lg:p-3 ">
        <p className="text-sm lg:text-lg group-hover:underline group-hover:font-semibold">
          {children}
        </p>
      </div>
    </div>
  );
};
