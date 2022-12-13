import Sidebar from "@/page-components/Sidebar";

const Stammdaten = (props) => {
  const data = {
    name: "mustermann",
    vorname: "max",
    geburtsdatum: "01.01.1990",
    gesclecht: "männlich",
    Telefonnummer: "0123456789",
    Email: "max@mustermann.com",
    Adresse: "beispielstraße 12",
    Ort: "Frankfurt",
    PLZ: "12345",
    Krankenkasse: "AOK",
    Versicherungsnummer: "12345678",
  };
  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="min-h-screen col-span-6 bg-bg-primary min-w-screen">
        <div className="container flex">
          <p className="py-4 mx-auto text-4xl font-bold underline">
            Stammdaten
          </p>
        </div>
        <div className="container overflow-hidden ">
          <div className="p-4 mx-8 border-4 rounded-md">
            <div className="grid grid-cols-3 text-lg font-semibold">
              <p>name</p>
              <p>:</p>
              <p>{data.name}</p>
              <p>vorname</p>
              <p>:</p>
              <p>{data.vorname}</p>
              <p>geburtsdatum</p>
              <p>:</p>
              <p>{data.geburtsdatum}</p>
              <p>gesclecht</p>
              <p>:</p>
              <p>{data.gesclecht}</p>
              <p>Telefonnummer</p>
              <p>:</p>
              <p>{data.Telefonnummer}</p>
              <p>Email</p>
              <p>:</p>
              <p>{data.Email}</p>
              <p>Adresse</p>
              <p>:</p>
              <p>
                {data.Adresse} {data.PLZ} {data.Ort}
              </p>
              <p>Krankenkasse</p>
              <p>:</p>
              <p>{data.Krankenkasse}</p>
              <p>Versicherungsnummer</p>
              <p>:</p>
              <p>{data.Versicherungsnummer}</p>
            </div>
          </div>

          <button className="p-2 m-8 font-semibold text-red-600 border-2 border-red-600 rounded-md font-lg">
            Meine Daten löschen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stammdaten;
