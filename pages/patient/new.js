import {
  CheckbokInput,
  FileInput,
  Input,
  RadioInput,
} from "@/components/Inputs/Forms";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { docUpload, fetcher, postReq } from "lib/fetcher";
import useSWR from "swr";
import { Combobox } from "@headlessui/react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { LoadingToast } from "@/page-components/Toast/Toast";
import Router from "next/router";
import { Unauthorized } from "@/page-components/Error/Unauthorized";

registerLocale("de", de);

const baseURL = "https://wippatientenakte.azure-api.net/";

const NewPatient = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  // useEffect(() => {
  //   if (!session) {
  //     Router.push(`/signin`);
  //   }
  // }, [session]);

  const [data, setData] = useState({
    username: "",
    passwort: "",
    nachname: "",
    vorname: "",
    geburtsdatum: new Date(),
    geschlecht: "männlich",
    telefonnummer: "",
    email: "",
    strasse: "",
    ortplz: "",
    vorerkrankungen: "",
    unvertraeglichkeiten: "",
    gewicht: 80,
    groesse: 180,
    organausweis: false,
    organausweisbild: null,
    operation: "",
    patientenverfuegung: false,
    patientenverfuegungbild: null,
    vorsorgevollmacht: false,
    vorsorgevollmachtbild: null,
    nutzungsbedingung: false,
    dsgvo: false,
  });

  const [organFile, setOrganFile] = useState(null);
  const [verfuegungFile, setVerfuegungFile] = useState(null);
  const [vollmachtFile, setVollmachtFile] = useState(null);

  const { data: kkData, error: kkError } = useSWR(
    `${baseURL}/s2/krankenkassen`,
    fetcher
  );

  // medikamente
  const { data: mdkData, error: mdkError } = useSWR(
    `${baseURL}/s2/medikamente`,
    fetcher
  );

  let filteredKK;
  let filteredMDK;

  const [kkQuery, setKkQuery] = useState("");
  const [mdkQuery, setMDKQuery] = useState("");

  const [selectedKK, setSelectedKK] = useState("");
  const [selectedMdk, setSelectedMdk] = useState("");

  const [page, setPage] = useState(1);

  const pages = [1, 2, 3];

  if (kkData && mdkData) {
    filteredKK =
      kkQuery === ""
        ? kkData
        : kkData.filter((kk) => {
            return kk.name.toLowerCase().includes(kkQuery.toLowerCase());
          });

    filteredMDK =
      mdkQuery === ""
        ? mdkData
        : mdkData.filter((mdk) => {
            return mdk.name.toLowerCase().includes(mdkQuery.toLowerCase());
          });
  }

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

  const resetData = (page) => {
    if (page === 1) {
      setData({
        ...data,
        username: "",
        passwort: "",
        nachname: "",
        vorname: "",
        geburtsdatum: new Date(),
        geschlecht: "männlich",
        telefonnummer: "",
        email: "",
        strasse: "",
        ortplz: "",
      });

      setSelectedKK("");
    } else if (page === 2) {
      setData({
        ...data,
        vorerkrankungen: "",
        unvertraeglichkeiten: "",
        gewicht: 80,
        groesse: 180,
        organausweis: false,
        operation: "",
        patientenverfuegung: false,
        vorsorgevollmacht: false,
      });

      setSelectedMdk("");
    } else if (page === 3) {
      setData({ data, dsgvo: false });
    }
  };

  const handleFile = (e) => {
    const doctype = e.target.name;
    if (doctype === "organausweis") {
      setOrganFile(e.target.value[0]);
    } else if (doctype === "pverfuegung") {
      setVerfuegungFile(e.target.value[0]);
    } else if (doctype === "pvollmacht") {
      setVollmachtFile(e.target.value[0]);
    }
  };

  const handleSubmit = async (e) => {
    let createdPatient;
    toast((t) => <LoadingToast text="Patient wird erstellt..." />);
    try {
      createdPatient = await fetch("../api/patient/createpatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `${baseURL}s2/patienten`,
          username: data.username,
          password: data.passwort,
          name: data.nachname,
          vorname: data.vorname,
          geburtsdatum: data.geburtsdatum.toISOString(),
          geschlecht: data.geschlecht.charAt(0),
          adresse: `${data.strasse} ${data.ortplz}`,
          telefonnummer: data.telefonnummer,
          email: data.email,
          dsgvo: data.dsgvo,
          letzteaenderung: new Date().toISOString(),
          krankenkasse: selectedKK.kid,
          loeschanfrage: "",
        }),
      });

      if (createdPatient.ok) {
        const patient = await createdPatient.json();
        toast.remove();
        toast.success(`Patient wurde erfolgreich erstellt`, {
          style: {
            border: "1px solid green",
            padding: "16px",
            color: "#09ff00",
          },
        });

        toast((t) => (
          <LoadingToast text="Gesundheitsdaten werden hochgeladen..." />
        ));

        // create user gesundheitsdaten
        const ghDaten = await postReq({
          url: `${baseURL}/s2/gesundheitsdaten`,
          body: {
            vorerkrankungen: data.vorerkrankungen,
            allergien: data.unvertraeglichkeiten,
            gewicht: data.gewicht,
            groeßeCM: data.groesse,
            ops: data.operation,
            patientenverfuegung: data.patientenverfuegung,
            patient: patient.id,
          },
        });

        if (ghDaten) {
          toast.remove();
          toast.success(`Gesundheitsdaten wurde erfolgreich hinzugefügt`, {
            style: {
              border: "1px solid green",
              padding: "16px",
              color: "#09ff00",
            },
          });

          toast((t) => <LoadingToast text="Dokumenten werden geprüft..." />);
          if (organFile) {
            try {
              const fileUpload = await docUpload({
                url: `${baseURL}s3/dokumente/?patient=${patient.id}&bezeichnung=organspendeausweis`,
                body: {
                  File: organFile,
                },
              });
            } catch (error) {}
          }
          if (verfuegungFile) {
            try {
              const fileUpload = await docUpload({
                url: `${baseURL}s3/dokumente/?patient=${patient.id}&bezeichnung=verfuegung`,
                body: {
                  File: verfuegungFile,
                },
              });
            } catch (error) {}
          }
          if (vollmachtFile) {
            try {
              const fileUpload = await docUpload({
                url: `${baseURL}s3/dokumente/?patient=${patient.id}&bezeichnung=vollmacht`,
                body: {
                  File: vollmachtFile,
                },
              });
            } catch (error) {}
          }

          toast.remove();
          toast.success(`Daten werden erfolgreich erstellt`, {
            style: {
              border: "1px solid green",
              padding: "16px",
              color: "#09ff00",
            },
          });

          toast((t) => (
            <LoadingToast text="Sie werden in Kürze weitergeleitet..." />
          ));

          setTimeout(() => {
            Router.push(`/`);
          }, 500);
        } else {
          toast.remove();
          toast.error(`Gesundheitsdaten konnte nicht hinzugefügt werden`, {
            style: {
              border: "1px solid red",
              padding: "16px",
              color: "#ff0000",
            },
          });
        }
      }

      if (!createdPatient.ok) {
        const res = await createdPatient.json();
        toast.remove();

        toast.error(`Ein Patient konnte nicht erstellt werden`, {
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "#ff0000",
          },
        });
      }
    } catch (error) {
      toast.error(
        `Vorgang abgebrochen: Patient mit diesem Username bereits existiert`,
        {
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "#ff0000",
          },
        }
      );
    }
  };

  if (!kkData) {
    return <div>Loading...</div>;
  }

  if (userRole == "patient") {
    return <Unauthorized />;
  }

  return (
    <div className="w-full min-h-screen col-span-4 px-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
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
              Tragen Sie hier die persönlichen aktuellen Informationen ein:
            </h1>
            <div className="grid grid-cols-1 space-2 xl:grid-cols-2">
              <Input
                name="username"
                label={"Username"}
                value={data.username}
                handleChange={handleChange}
              />

              <Input
                type="password"
                name="passwort"
                label={"Passwort"}
                value={data.passwort}
                handleChange={handleChange}
              />
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

              <div className="my-auto">
                <label className="block mb-2 text-lg font-medium text-gray-900 ">
                  Geburtsdatum
                </label>

                <DatePicker
                  selected={data.geburtsdatum}
                  name="geburtsdatum"
                  dateFormat="dd.MM.yyyy"
                  locale="de"
                  maxDate={new Date()}
                  onChange={(date) =>
                    handleChange({
                      target: {
                        name: "geburtsdatum",
                        value: date,
                      },
                    })
                  }
                  className="block w-full max-w-lg p-2 my-auto font-medium leading-normal text-gray-700 bg-white border border-gray-300 rounded-md shadow-md appearance-none"
                ></DatePicker>
              </div>

              <RadioInput
                label={"Geschlecht"}
                name="geschlecht"
                values={["männlich", "weiblich", "diverse"]}
                checked={data.geschlecht}
                handleCheck={handleChange}
              />

              <Input
                name="telefonnummer"
                type="number"
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

              <div className="flex flex-wrap justify-between">
                <div className="w-full">
                  <p className="my-auto text-lg font-medium text-gray-900 ">
                    Krankenkasse: &nbsp;
                  </p>
                  <div className="flex w-full flex-nowrap">
                    <Combobox
                      value={selectedKK ? `${selectedKK?.name}` : ""}
                      onChange={(e) => {
                        setSelectedKK({ kid: e.id, name: e.name });
                      }}
                    >
                      <div className="relative w-full max-w-lg mt-1">
                        <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                          <Combobox.Input
                            className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                            height="60px"
                            onChange={(event) => setKkQuery(event.target.value)}
                          />
                          <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredKK?.length === 0 && kkQuery !== "" ? (
                              <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                                Keine Krankenkasse gefunden.
                              </div>
                            ) : (
                              filteredKK?.map((kk) => (
                                <Combobox.Option
                                  className="p-2 font-semibold hover:bg-gray-200"
                                  key={kk.id}
                                  value={kk}
                                >
                                  <div>{kk.name}</div>
                                  <div>{kk.stanort}</div>
                                  <div className="font-thin">ID: {kk.id}</div>
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </div>
                      </div>
                    </Combobox>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse m-8">
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
                className={`px-3 py-2 rounded-lg leading-tight mx-6  border "cursor-pointer text-gray-900 border-black`}
              >
                Weiter
              </button>

              <button
                onClick={() => {
                  resetData(page);
                }}
                className={`px-3 py-2 rounded-lg leading-tight mx-6 border "cursor-pointer text-gray-900 border-red-500`}
              >
                Verwerfen
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
                type="number"
                label={"Gewicht in kg"}
                value={data.gewicht}
                handleChange={handleChange}
              />
              <Input
                name="groesse"
                type="number"
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
                  <FileInput
                    name="organausweis"
                    className={"max-w-sm mx-10"}
                    handleChange={(e) => {
                      handleFile({
                        target: {
                          name: "organausweis",
                          value: e,
                        },
                      });
                    }}
                  />
                )}
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="w-full">
                  <p className="my-auto text-lg font-medium text-gray-900 ">
                    Dauerhaftes Medikament: &nbsp;
                  </p>
                  <div className="flex w-full flex-nowrap">
                    <Combobox
                      value={selectedMdk ? `${selectedMdk?.name}` : ""}
                      onChange={(e) => {
                        setSelectedMdk({ mid: e.id, name: e.name });
                      }}
                    >
                      <div className="relative w-full max-w-lg mt-1">
                        <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                          <Combobox.Input
                            className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                            height="60px"
                            onChange={(event) =>
                              setMDKQuery(event.target.value)
                            }
                          />
                          <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredMDK?.length === 0 && mdkQuery !== "" ? (
                              <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                                Kein Medikament gefunden.
                              </div>
                            ) : (
                              filteredMDK?.map((mdk) => (
                                <Combobox.Option
                                  className="p-2 font-semibold hover:bg-gray-200"
                                  key={mdk.id}
                                  value={mdk}
                                >
                                  <div>{mdk.name}</div>
                                  <div className="font-thin">ID: {mdk.id}</div>
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </div>
                      </div>
                    </Combobox>
                  </div>
                </div>
              </div>

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
                  <FileInput
                    name="pverfuegung"
                    className={"max-w-sm mx-10"}
                    handleChange={(e) => {
                      handleFile({
                        target: {
                          name: "pverfuegung",
                          value: e,
                        },
                      });
                    }}
                  />
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
                  <FileInput
                    name="pvollmacht"
                    className={"max-w-sm mx-10"}
                    handleChange={(e) => {
                      handleFile({
                        target: {
                          name: "pvollmacht",
                          value: e,
                        },
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between m-8 max-w-7xl">
              <div>
                <button
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  className={`px-3 py-2 rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
                >
                  Zurück
                </button>
                <button
                  onClick={() => {
                    resetData(page);
                  }}
                  className={`px-3 py-2 rounded-lg leading-tight mx-6 border "cursor-pointer text-gray-900 border-red-500`}
                >
                  Verwerfen
                </button>
              </div>

              <button
                onClick={() => {
                  setPage(page + 1);
                }}
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
                name={"nutzungsbedingung"}
                label={""}
                content={
                  "Hiermit stimme ich den Nutzungsbedingungen der elektronischen Patientenakte zu"
                }
                handleCheck={(e) => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  });
                }}
              />
              <CheckbokInput
                name={"dsgvo"}
                label={""}
                content={
                  "Hiermit stimme ich der Datenverarbeitung gemäß DSGVO zu"
                }
                handleCheck={(e) => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  });
                }}
              />
            </div>

            <button
              onClick={() => {
                setPage(page - 1);
              }}
              className={`px-3 py-2 mx-6 rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
            >
              Zurück
            </button>
            <button
              disabled={data.dsgvo !== true}
              onClick={handleSubmit}
              className={`px-3 py-2 mx-6 leading-tight rounded-lg border  ${
                data.dsgvo && data.nutzungsbedingung
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
