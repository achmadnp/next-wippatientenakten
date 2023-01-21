import useSWR from "swr";
import { Combobox } from "@headlessui/react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { LoadingToast } from "@/page-components/Toast/Toast";
import Router from "next/router";
import { Unauthorized } from "@/page-components/Error/Unauthorized";
import { Input, RadioInput } from "@/components/Inputs/Forms";
import { useState } from "react";
import { fetcher, postReq } from "lib/fetcher";

registerLocale("de", de);

const baseURL = "https://wippatientenakte.azure-api.net/";

const NewEmployee = () => {
  const [role, setRole] = useState("arzt");
  const [data, setData] = useState({
    username: "",
    passwort: "",
    rolle: "",
    nachname: "",
    vorname: "",
    geburtsdatum: new Date(),
    geschlecht: "männlich",
    email: "",
    strasse: "",
    ortplz: "",

    spezialisierung: "",
    jobtitel: "",
  });

  let filteredKh;
  let filteredFB;

  const [khQuery, setKhQuery] = useState("");
  const [FBQuery, setFBQuery] = useState("");

  const [selectedKh, setSelectedKh] = useState("");
  const [selectedFB, setSelectedFB] = useState("");

  const { data: khData, error: kkError } = useSWR(
    `${baseURL}/s4/krankenhauser`,
    fetcher
  );

  const { data: fbData, error: fbError } = useSWR(
    `${baseURL}/s4/fachbereiche`,
    fetcher
  );

  if (khData && fbData) {
    filteredKh =
      khQuery === ""
        ? khData
        : khData.filter((kh) => {
            return kh.name.toLowerCase().includes(khQuery.toLowerCase());
          });

    filteredFB =
      FBQuery === ""
        ? fbData
        : fbData.filter((fb) => {
            return fb.bezeichnung.toLowerCase().includes(FBQuery.toLowerCase());
          });
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    if (role === "arzt") {
      toast((t) => <LoadingToast text="Arztkonto wird erstellt..." />);
      console.log(data);
      console.log(selectedKh.khid, selectedFB.fbid);

      try {
        const arzt = await postReq({
          url: `${baseURL}/s4/arzte`,
          body: {
            username: data.username,
            passhash: data.passwort,
            name: data.nachname,
            vorname: data.vorname,
            geburtsdatum: data.geburtsdatum.toISOString(),
            geschlecht: data.geschlecht.charAt(0),
            adresse: `${data.strasse} ${data.ortplz}`,
            email: data.email,
            spezialisierung: data.spezialisierung,
            fachbereich: selectedFB.fbid,
            krankenhaus: selectedKh.khid,
            jobtitel: data.jobtitel,
          },
        });

        if (arzt) {
          toast.remove();
          toast.success(`Arzt wurde erfolgreich angelegt`, {
            style: {
              border: "1px solid green",
              padding: "16px",
              color: "#09ff00",
            },
          });
        }
      } catch (error) {}
    } else if (role === "assistent") {
      toast((t) => <LoadingToast text="Assistentkonto wird erstellt..." />);
      console.log(data);
      console.log(selectedKh.khid, selectedFB.fbid);

      try {
        const assistent = await postReq({
          url: `${baseURL}s4/assistenten/`,
          body: {
            username: data.username,
            passhash: data.passwort,
            name: data.nachname,
            vorname: data.vorname,
            geburtsdatum: data.geburtsdatum.toISOString(),
            geschlecht: data.geschlecht.charAt(0),
            adresse: `${data.strasse} ${data.ortplz}`,
            email: data.email,
            krankenhaus: selectedKh.khid,
          },
        });

        if (assistent) {
          toast.remove();
          toast.success(`Assistent wurde erfolgreich angelegt`, {
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
        }
      } catch (error) {}
    }
  };

  const handleClear = () => {
    setData({
      username: "",
      passwort: "",
      rolle: "arzt",
      nachname: "",
      vorname: "",
      geburtsdatum: new Date(),
      geschlecht: "männlich",
      email: "",
      strasse: "",
      ortplz: "",
      krankenhaus: "",
      fachbereich: "",
      spezialisierung: "",
      jobtitel: "",
    });
  };

  console.log(khData);

  return (
    <div className="w-full min-h-screen col-span-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container">
        <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
          Neuer Mitarbeiter hinzufügen
        </h1>

        <div>
          <h1 className="mt-4 mb-5 text-lg font-bold">
            Tragen Sie hier die Daten des neuen Mitarbeiters ein:
          </h1>

          <div className="grid grid-cols-1 space-2 xl:grid-cols-2">
            {/* selectbox */}

            <div className="max-w-lg">
              <p className="block mb-2 text-lg font-medium text-gray-900">
                Rolle
              </p>
              <select
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              >
                <option value="arzt">Arzt</option>
                <option value="assistent">Assistent</option>
              </select>
            </div>

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
                  Krankenhaus: &nbsp;
                </p>
                <div className="flex w-full flex-nowrap">
                  <Combobox
                    value={selectedKh ? `${selectedKh?.name}` : ""}
                    onChange={(e) => {
                      setSelectedKh({ khid: e.id, name: e.name });
                    }}
                  >
                    <div className="relative w-full max-w-lg mt-1">
                      <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                        <Combobox.Input
                          className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                          height="60px"
                          onChange={(event) => setKhQuery(event.target.value)}
                        />
                        <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredKh?.length === 0 && khQuery !== "" ? (
                            <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                              Kein Krankenhaus gefunden.
                            </div>
                          ) : (
                            filteredKh?.map((kk) => (
                              <Combobox.Option
                                className="p-2 font-semibold hover:bg-gray-200"
                                key={kk.id}
                                value={kk}
                              >
                                <div>{kk.name}</div>
                                <div>{kk.adresse}</div>
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

            {role === "arzt" && (
              <div>
                <Input
                  name="jobtitel"
                  label={"Jobtitel"}
                  value={data.jobtitel}
                  handleChange={handleChange}
                />

                <div className="flex flex-wrap justify-between">
                  <div className="w-full">
                    <p className="my-auto text-lg font-medium text-gray-900 ">
                      Fachbereich: &nbsp;
                    </p>
                    <div className="flex w-full flex-nowrap">
                      <Combobox
                        value={selectedFB ? `${selectedFB?.bezeichnung}` : ""}
                        onChange={(e) => {
                          setSelectedFB({
                            fbid: e.id,
                            bezeichnung: e.bezeichnung,
                          });
                        }}
                      >
                        <div className="relative w-full max-w-lg mt-1">
                          <div className="relative w-full text-left bg-white shadow-md cursor-default rounded-xl">
                            <Combobox.Input
                              className="min-w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none w-80 focus:ring-0"
                              height="60px"
                              onChange={(event) =>
                                setFBQuery(event.target.value)
                              }
                            />
                            <Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {filteredFB?.length === 0 && FBQuery !== "" ? (
                                <div className="relative px-4 py-3 text-gray-700 cursor-default select-none">
                                  Kein Fachbereich gefunden.
                                </div>
                              ) : (
                                filteredFB?.map((fb) => (
                                  <Combobox.Option
                                    className="p-2 font-semibold hover:bg-gray-200"
                                    key={fb.id}
                                    value={fb}
                                  >
                                    <div>{fb.bezeichnung}</div>
                                    <div className="font-thin">ID: {fb.id}</div>
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
                  name="spezialisierung"
                  label={"Spezialisierung"}
                  value={data.spezialisierung}
                  handleChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="flex m-8">
            <button
              onClick={handleClear}
              className={`px-3 py-2 mx-6  rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
            >
              Verwerfen
            </button>
            <button
              onClick={handleSubmit}
              className={`px-3 py-2  mx-6 rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
            >
              Abschicken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
