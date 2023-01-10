/* eslint-disable react-hooks/rules-of-hooks */
import { fetcher } from "lib/fetcher";
import useSWR from "swr";

const baseURL = "https://wippatientenakte.azure-api.net/";

export const getRaumKrankenhaus = ({ raumId }) => {
  const { data: khidData, error: khidError } = useSWR(
    `${baseURL}/s3/raume/${raumId}`,
    fetcher
  );

  const { data: khData, error: khError } = useSWR(
    khidData ? `${baseURL}/s4/krankenhauser/${khidData.krankenhaus}` : null,
    fetcher
  );

  return khData;
};
