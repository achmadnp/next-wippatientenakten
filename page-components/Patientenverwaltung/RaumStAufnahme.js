import { getRaumKrankenhaus } from "lib/data/krankenhaus/krankenhaus";

const RaumStAufnahme = ({ data }) => {
  let kh;

  kh = getRaumKrankenhaus({ raumId: data.raumId });

  if (!kh) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {kh && (
        <p>
          {kh.name}, Raum: {data.raumNummer}
        </p>
      )}
    </>
  );
};

export default RaumStAufnahme;
