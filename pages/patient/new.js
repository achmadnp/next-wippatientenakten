import {
  CheckbokInput,
  FileInput,
  Input,
  RadioInput,
} from "@/components/Inputs/Forms";
import { data } from "autoprefixer";
import { useState } from "react";

const NewPatient = () => {
  const [data, setData] = useState({
    nachname: "",
    vorname: "",
    geburtsdatum: "",
    geschlecht: "männlich",
    telefonnummer: "",
    email: "",
    strasse: "",
    ortplz: "",
    krankenkasse: "",
    versicherungsnr: "",
    vorerkrankungen: "",
    unvertraeglichkeiten: "",
    gewicht: "",
    groesse: "",
    organausweis: false,
    organausweisbild: null,
    medikamente: "",
    operation: "",
    patientenverfuegung: false,
    patientenverfuegungbild: null,
    vorsorgevollmacht: false,
    vorsorgevollmachtbild: null,
    nutzungsbedingung: false,
    dsgvo: false,
  });

  const [page, setPage] = useState(1);

  const pages = [1, 2, 3];

  const handleChange = (e) => {
    const value = e.target.value;

    if (
      e.target.name === "organausweis" ||
      e.target.name === "patientenverfuegung"
    ) {
      if (value === "ja") {
        setData({
          ...data,
          [e.target.name]: true,
        });
      } else {
        if (value === "nein") {
          setData({
            ...data,
            [e.target.name]: false,
          });
        }
      }
    } else {
      setData({
        ...data,
        [e.target.name]: value,
      });
    }
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-screen col-span-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container ">
        <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
          Neuer Patient hinzufügen
        </h1>
        {page === 1 && (
          <div>
            <h1 className="mt-2 mb-5 text-2xl font-semibold underline">
              Stammdaten
            </h1>
            <h1 className="mt-4 mb-5 text-lg font-bold">
              Tragen Sie hier ihre persönlichen aktuellen Information ein:
            </h1>
            <div className="grid grid-cols-1 space-2 xl:grid-cols-2">
              <Input
                name="nachname"
                label={"Nachname"}
                value={data.nachname}
                handleChange={handleChange}
              />
              <Input
                name="vorname"
                label={"Vor- und Zuname"}
                value={data.vorname}
                handleChange={handleChange}
              />
              <Input
                name="geburtsdatum"
                label={"Geburtsdatum"}
                value={data.geburtsdatum}
                handleChange={handleChange}
              />

              <RadioInput
                label={"Geschlecht"}
                name="geschlecht"
                values={["männlich", "weiblich", "diverse"]}
                checked={data.geschlecht}
                handleCheck={handleChange}
              />

              <Input
                name="telefonnummer"
                label={"Telefonnummer"}
                value={data.telefonnummer}
                handleChange={handleChange}
              />

              <Input
                name="email"
                label={"E-Mail"}
                value={data.email}
                handleChange={handleChange}
              />

              <Input
                name="strasse"
                label={"Straße"}
                value={data.strasse}
                handleChange={handleChange}
              />

              <Input
                name="ortplz"
                label={"Ort und Postleitzahl"}
                value={data.ortplz}
                handleChange={handleChange}
              />

              <Input
                name="krankenkasse"
                label={"Krankenkasse"}
                value={data.krankenkasse}
                handleChange={handleChange}
              />

              <Input
                name="versicherungsnr"
                label={"Versicherungsnummer"}
                value={data.versicherungsnr}
                handleChange={handleChange}
              />
            </div>

            <div className="flex m-8">
              <button
                onClick={handleSubmit}
                className={`px-3 py-2  mx-[80%] rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {page === 2 && (
          <div>
            <h1 className="mt-2 mb-5 text-2xl font-semibold underline">
              Gesundheitsdaten
            </h1>
            <h1 className="mt-4 mb-5 text-lg font-bold">
              Tragen Sie hier wichtige Informationen ein, die im Falle eines
              Notfalls wichtig werden könnten:
            </h1>
            <div className="grid grid-cols-1 space-2 xl:grid-cols-2">
              <Input
                name="vorerkrankungen"
                label={"Vorerkrankungen"}
                value={data.vorerkrankungen}
                handleChange={handleChange}
              />
              <Input
                name="unvertraeglichkeiten"
                label={"Unverträglichkeiten / Allergien"}
                value={data.unvertraeglichkeiten}
                handleChange={handleChange}
              />
              <Input
                name="gewicht"
                label={"Gewicht in kg"}
                value={data.gewicht}
                handleChange={handleChange}
              />
              <Input
                name="groesse"
                label={"Größe in cm"}
                value={data.groesse}
                handleChange={handleChange}
              />
              <div>
                <RadioInput
                  label={"Organspendeausweis"}
                  name="organausweis"
                  values={["ja", "nein"]}
                  checked={data.organausweis === true ? "ja" : "nein"}
                  handleCheck={handleChange}
                />
                {data.organausweis && (
                  <FileInput className={"max-w-sm mx-10"} />
                )}
              </div>

              <Input
                name="medikamente"
                label={"Dauerhafte Medikamente"}
                value={data.medikamente}
                handleChange={handleChange}
              />

              <Input
                name="operation"
                label={"Vergangene Operationen"}
                value={data.operation}
                handleChange={handleChange}
              />
              <div>
                <RadioInput
                  label={"Patientenverfügung vorhanden?"}
                  name="patientenverfuegung"
                  values={["ja", "nein"]}
                  checked={data.patientenverfuegung === true ? "ja" : "nein"}
                  handleCheck={handleChange}
                />
                {data.patientenverfuegung && (
                  <FileInput className={"max-w-sm mx-10"} />
                )}
              </div>

              <div>
                <RadioInput
                  label={"Vorsorgevollmacht vorhanden?"}
                  name="vorsorgevollmacht"
                  values={["ja", "nein"]}
                  checked={data.vorsorgevollmacht === true ? "ja" : "nein"}
                  handleCheck={handleChange}
                />
                {data.vorsorgevollmacht && (
                  <FileInput className={"max-w-sm mx-10"} />
                )}
              </div>
            </div>
            <div className="flex justify-between m-8 max-w-7xl">
              <button
                onClick={handleSubmit}
                className={`px-3 py-2 rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
              >
                Zurück
              </button>
              <button
                onClick={handleSubmit}
                className={`px-3 py-2 rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {page === 3 && (
          <div>
            <h1 className="mt-2 mb-5 text-2xl font-semibold">
              Nutzungsbedingung und Datenschutz
            </h1>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using Content here, content here, making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              lorem ipsu will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and
              Evil) by Cicero, written in 45 BC. This book is a treatise on the
              theory of ethics, very popular during the Renaissance. The first
              line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a
              line in section 1.10.32. The standard chunk of Lorem Ipsum used
              since the 1500s is reproduced below for those interested. Sections
              1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero
              are also reproduced in their exact original form, accompanied by
              English versions from the 1914 translation by H. Rackham. Where
              can I get some? There are many variations of passages of Lorem
              Ipsum available, but the majority have suffered alteration in some
              form, by injected humour, or randomised words which dont look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isnt anything embarrassing hidden
              in the middle of text. All the Lorem Ipsum generators on the
              Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </p>

            <div className="my-10">
              <CheckbokInput
                label={""}
                content={
                  "Hiermit stimme ich den Nutzungsbedingungen der elektronischen Patientenakte zu"
                }
                handleCheck={() => {}}
              />
              <CheckbokInput
                label={""}
                content={
                  "Hiermit stimme ich der Datenverarbeitung gemäß DSGVO zu"
                }
                handleCheck={() => {}}
              />
            </div>

            <button
              disabled={data.dsgvo !== true}
              onClick={handleSubmit}
              className={`px-3 py-2 leading-tight  border  ${
                data.dsgvo
                  ? "cursor-pointer text-gray-900 border-black"
                  : "cursor-not-allowed text-gray-400 border-gray-400"
              }`}
            >
              Abschicken
            </button>
          </div>
        )}

        <div className="flex mt-10">
          <ul className="inline-flex mx-auto border-2 border-black divide-x divide-gray-300 rounded">
            {pages.map((pageBtn, index) => (
              <li key={index}>
                <button
                  onClick={() => setPage(index + 1)}
                  className={`px-3 py-2 leading-tight h-12 w-40 hover:font-bold hover:text-gray-900 ${
                    page === index + 1
                      ? "bg-gray-400 text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {pageBtn}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NewPatient;
