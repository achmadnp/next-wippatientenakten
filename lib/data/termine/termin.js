/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from "swr";
import { fetcher } from "lib/fetcher";

const baseURL = "https://wippatientenakte.azure-api.net/";

export const getUserTerminData = ({ role, id }) => {
  switch (role) {
    case "patient":
      return getPatientTermin({ id });
    case "arzt":
      return getArztTermin({ id });
    case "assistent":
      return getVerwaltungTermin({ id });
    case "verwaltung":
      return getVerwaltungTermin({ id });

    default:
      return { error: "Invalid assigned role" };
  }
};

export const getPatientTermin = ({ id }) => {
  let data;

  const { data: terminData, error: terminError } = useSWR(
    `${baseURL}/s3/termine?patientId=${id}`,
    fetcher
  );

  if (terminData) {
    return terminData;
  }
};

export const getArztTermin = ({ id }) => {
  const { data: terminData, error: terminError } = useSWR(
    `${baseURL}/s3/termine?arztid=${id}`,
    fetcher
  );

  if (terminData) {
    return terminData;
  }
};

export const getVerwaltungTermin = ({}) => {
  let data;

  const { data: arztData, error: arztError } = useSWR(
    `${baseURL}/s4/arzte`,
    fetcher
  );

  const { data: terminData, error: terminError } = useSWR(
    `${baseURL}/s3/termine`,
    fetcher
  );

  if (arztData && terminData) {
    data = {
      arztData,
      terminData,
    };

    return data;
  }
};
