import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
const baseURL = "https://wippatientenakte.azure-api.net/";

const DocView = (props) => {
  useEffect(() => {
    let data;
    async function getDoc() {
      data = await fetch(`${baseURL}s3/file/${props?.docid?.docId}`, {
        headers: {
          "Ocp-Apim-Subscription-Key": props.ocpkey.value,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          var file = window.URL.createObjectURL(blob);
          window.location.assign(file);
        });
    }

    getDoc();
  });

  return <div></div>;
};

export default DocView;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const docid = context.params;
  const key = {
    type: "Ocp-Apim-Subscription-Key",
    value: "3591a8d3b11f4916a8a631f0936e4726",
  };

  return {
    props: {
      session,
      docid,
      ocpkey: key,
    },
  };
}
