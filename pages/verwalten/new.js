const { Input, RadioInput } = require("@/components/Inputs/Forms");
const { useState } = require("react");

const NewEmployee = () => {
  const [data, setData] = useState({
    rolle: "",
    nachname: "",
    vorname: "",
    geburtsdatum: "",
    geschlecht: "männlich",
    email: "",
    strasse: "",
    ortplz: "",
    krankenhaus: "",
    fachbereich: "",
    spezialisierung: "",
    jobtitel: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(data);
  };

  const handleClear = () => {
    setData({
      rolle: "arzt",
      nachname: "",
      vorname: "",
      geburtsdatum: "",
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

            {data.rolle === "arzt" && (
              <div>
                {/* dropdown select menu */}
                <Input
                  name="krankenhaus"
                  label={"Krankenhaus"}
                  value={data.jobtitel}
                  handleChange={handleChange}
                />
                {/* dropdown select menu */}
                <Input
                  name="fachbereich"
                  label={"Fachbereich"}
                  value={data.jobtitel}
                  handleChange={handleChange}
                />

                <Input
                  name="spezialisierung"
                  label={"Spezialisierung"}
                  value={data.spezialisierung}
                  handleChange={handleChange}
                />
              </div>
            )}

            <Input
              name="jobtitel"
              label={"Jobtitel"}
              value={data.jobtitel}
              handleChange={handleChange}
            />
          </div>
          <div className="flex m-8">
            <button
              onClick={handleClear}
              className={`px-3 py-2  mx-[80%] rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
            >
              Verwerfen
            </button>
            <button
              onClick={handleSubmit}
              className={`px-3 py-2  mx-[80%] rounded-lg leading-tight  border "cursor-pointer text-gray-900 border-black`}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
