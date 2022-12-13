import { Label } from "@/components/Inputs/Forms";
import { useState } from "react";

const InfoRegistrar = (props) => {
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState(""); //todo
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [insurance, setInsurance] = useState("");
  const [insuranceNr, setInsuranceNr] = useState("");

  return (
    <div className="flex h-screen bg-bg-primary">
      <div className="container">
        <h1 className="mt-2 mb-12 text-4xl font-bold text-center text-primary">
          Stammdaten
        </h1>
        {/* wrapped border */}
        <div className="p-10 border-l-2">
          <Label
            htmlFor="input-group-registrar"
            label="Nachname"
            InputId="surname"
            inputType="text"
            inputName="surname"
            inputPlaceholder="Musterman"
            value={name}
            onchange={(e) => setName(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Vorname"
            InputId="vorname"
            inputType="text"
            inputName="vorname"
            inputPlaceholder="Max"
            value={vorname}
            onchange={(e) => setVorname(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Geburtsdatum"
            svgIcon=""
            InputId="dateofbirth"
            inputType="text"
            inputName="dateofbirth"
            inputPlaceholder="01.01.1990"
            value={date}
            onchange={(e) => setDate(e.target.value)}
          />

          {/* maybe with dropdown? */}
          <Label
            htmlFor="input-group-registrar"
            label="Geschlecht"
            svgIcon=""
            InputId="sex"
            inputType="text"
            inputName="sex"
            value={sex}
            onchange={(e) => setSex(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Telefonnummer"
            svgIcon=""
            InputId="telnr"
            inputType="number"
            inputName="telnr"
            inputPlaceholder="+490123456789"
            value={tel}
            onchange={(e) => setTel(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Email"
            svgIcon=""
            InputId="email"
            inputType="email"
            inputName="email"
            inputPlaceholder="max@musterman.com"
            value={email}
            onchange={(e) => setEmail(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Adresse"
            svgIcon=""
            InputId="address"
            inputType="text"
            inputName="address"
            inputPlaceholder="Straßenname 15"
            value={address}
            onchange={(e) => setAddress(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Ort und Postleitzahl"
            svgIcon=""
            InputId="city"
            inputType="text"
            inputName="city"
            inputPlaceholder="Friedberg, 61169"
            value={city}
            onchange={(e) => setCity(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Krankenkasse"
            svgIcon=""
            InputId="insurance"
            inputType="text"
            inputName="insurance"
            inputPlaceholder="z.B. AOK"
            value={insurance}
            onchange={(e) => setInsurance(e.target.value)}
          />

          <Label
            htmlFor="input-group-registrar"
            label="Versicherungsnummer"
            svgIcon=""
            InputId="insurancenr"
            inputType="number"
            inputName="insurancenr"
            inputPlaceholder="12 123456 M 123"
            value={insuranceNr}
            onchange={(e) => setInsuranceNr(e.target.target)}
          />

          <div className="flex gap-8">
            <button
              onClick={() => {
                console.log(
                  name,
                  ", ",
                  vorname,
                  ", ",
                  date,
                  ", ",
                  email,
                  ", ",
                  address,
                  ", ",
                  city
                );
              }}
              className="block w-full px-4 py-2 mt-20 font-semibold text-center text-white bg-green-600 rounded cursor-pointer hover:bg-green-400"
            >
              Speichern
            </button>

            <button
              onClick={``}
              className="block w-full px-4 py-2 mt-20 font-semibold text-center text-white bg-red-600 rounded cursor-pointer hover:bg-red-800"
            >
              Verwerfen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoRegistrar;
