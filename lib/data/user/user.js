/* eslint-disable react-hooks/rules-of-hooks */
import { DateConverter } from "@/utils/DateConverter";
import { fetcher } from "lib/fetcher";
import useSWR from "swr";

const baseURL = "https://wippatientenakte.azure-api.net/";

export const getUserIndexData = ({ role, id }) => {
  switch (role) {
    case "patient":
      return getPatientIdx({ id });
    case "arzt":
      return getArztIdx({ id });
    case "assistent":
      return getAssistentIdx({ id });
    case "verwaltung":
      return getVerwaltungIdx({ id });

    default:
      return { error: "Invalid assigned role" };
  }
};

export const getPatientIdx = ({ id }) => {
  let data;
  const { data: userData, error: userError } = useSWR(
    `${baseURL}/s2/patienten/${id}`,
    fetcher
  );

  const { data: terminData, error: terminError } = useSWR(
    `${baseURL}/s3/termine?patientId=${id}`,
    fetcher
  );

  const { data: medikationData, error: medikationError } = useSWR(
    `${baseURL}/s2/medikationsplane?patientId=${id}`,
    fetcher
  );

  const { data: kKasseData, error: kkError } = useSWR(
    userData ? `${baseURL}/s2/krankenkassen/${userData?.krankenkasse}` : null,
    fetcher
  );

  if (userData && terminData && medikationData) {
    if (kKasseData) {
      data = {
        userData: [
          {
            fieldName: "Vollname",
            value: `${userData.vorname} ${userData.name}`,
          },
          { fieldName: "Email", value: userData.email },
          { fieldName: "Geschlecht", value: userData.geschlecht },
          {
            fieldName: "Geburtsdatum",
            value: DateConverter(new Date(userData.geburtsdatum)),
          },
          { fieldName: "Telefonnummer", value: userData.telefonnummer },
          { fieldName: "Krankenkasse", value: kKasseData?.name || "" },
        ],
        termine: terminData,
        medikationsplan: medikationData,
      };
    }

    return data;
  }
};

export const getArztIdx = ({ id }) => {
  let data;

  const { data: userData, error: userError } = useSWR(
    `${baseURL}/s4/arzte/${id}`,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    userData ? `${baseURL}/s4/krankenhauser/${userData.krankenhaus}` : null,
    fetcher
  );

  const { data: fbData, error: fbError } = useSWR(
    userData ? `${baseURL}/s4/fachbereiche/${userData?.fachbereich}` : null,
    fetcher
  );

  const { data: hPatienten, error: hPatientenErr } = useSWR(
    `${baseURL}/s3/termine/?arztId=${id}&`,
    fetcher
  );

  const { data: stPatienten, error: stPatientenErr } = useSWR(
    `${baseURL}/s3/stationaererAufenthalte`,
    fetcher
  );

  if (userData && hPatienten && stPatienten) {
    if (khData && fbData) {
      data = {
        userData: [
          {
            fieldName: "Vollname",
            value: `${userData.vorname} ${userData.name}`,
          },
          { fieldName: "Email", value: userData.email },
          { fieldName: "Geschlecht", value: userData.geschlecht },
          {
            fieldName: "Geburtsdatum",
            value: DateConverter(new Date(userData.geburtsdatum)),
          },
          { fieldName: "Krankenhaus", value: khData.name },
          { fieldName: "Fachbereich", value: fbData.bezeichnung },
        ],
        patientData: hPatienten,
        stationaryData: stPatienten,
      };
    }

    return data;
  }
};

export const getAssistentIdx = ({ id }) => {
  let data;

  // get krankenhaus
  const { data: userData, error: userError } = useSWR(
    `${baseURL}/s4/assistenten/${id}`,
    fetcher
  );

  //    get alle patientenName filter: raumID von krankenhaus
  const { data: stPatienten, error: stPatientenErr } = useSWR(
    `${baseURL}/s3/stationaererAufenthalte`,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    userData ? `${baseURL}/s4/krankenhauser/${userData.krankenhaus}` : null,
    fetcher
  );

  if (userData && stPatienten) {
    if (khData) {
      data = {
        userData: [
          {
            fieldName: "Vollname",
            value: `${userData.vorname} ${userData.name}`,
          },
          { fieldName: "Email", value: userData.email },
          { fieldName: "Geschlecht", value: userData.geschlecht },
          {
            fieldName: "Geburtsdatum",
            value: DateConverter(new Date(userData.geburtsdatum)),
          },
          { fieldName: "Krankenhaus", value: khData.name },
        ],
        stationaryData: stPatienten,
      };
    }

    return data;
  }
};

export const getVerwaltungIdx = ({ id }) => {
  let data;

  // get krankenhaus
  const { data: userData, error: userError } = useSWR(
    `${baseURL}/s1/verwaltungsmitarbeiter/${id}`,
    fetcher
  );

  const { data: vwData, error: vwError } = useSWR(
    userData ? `${baseURL}/s1/verwaltungen/${userData.verwaltung}` : null,
    fetcher
  );

  if (userData) {
    if (vwData) {
      data = {
        userData: [
          {
            fieldName: "Vollname",
            value: `${userData.vorname} ${userData.name}`,
          },
          { fieldName: "Email", value: userData.email },
          {
            fieldName: "Geburtsdatum",
            value: DateConverter(new Date(userData.geburtsdatum)),
          },
          { fieldName: "Verwaltung", value: vwData.name },
        ],
      };
    }

    return data;
  }
};

export const getPatientverwaltung = () => {
  let data;

  const { data: userData, error: userError } = useSWR(
    `${baseURL}/s2/patienten/`,
    fetcher
  );

  const { data: stAufData, error: stAufError } = useSWR(
    `${baseURL}/s3/stationaererAufenthalte`,
    fetcher
  );

  const { data: kKasseData, error: kkError } = useSWR(
    `${baseURL}/s2/krankenkassen/`,
    fetcher
  );

  const { data: terminData, error: terminError } = useSWR(
    `${baseURL}/s3/termine/`,
    fetcher
  );

  if (userData && stAufData && kKasseData && terminData) {
    data = {
      patienten: userData,
      stationaere: stAufData,
      kkData: kKasseData,
      termine: terminData,
    };
  }

  return data;
};
