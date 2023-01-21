import { Termine } from "./Termine";
import { PersonalInfo } from "./PersonalInfo";
import { Medikationsplan } from "./Medikation";
import { ArztHome } from "../Arzt/Home";
import { AssistenzHome } from "../Assistenz/Home";
import { VerwaltungHome } from "../Verwaltung/Home";

export const Home = ({ role, data }) => {
  return (
    <div className="w-full min-h-screen col-span-4 px-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
      <div className="container">
        <PersonalInfo role={role} data={data?.userData} />

        {role === "patient" && (
          <div>
            <Termine
              termine={data.termine.filter((termin) => {
                return new Date(termin.datum).getTime() > Date.now();
              })}
            />
            <Medikationsplan
              medikation={data.medikationsplan.filter((plan) => {
                return new Date(plan.bis).getTime() > Date.now();
              })}
            />
          </div>
        )}

        {role === "arzt" && (
          <div>
            <ArztHome
              patientData={data.patientData}
              stationaryData={data.stationaryData}
            />
          </div>
        )}

        {role === "assistent" && (
          <div>
            <AssistenzHome stationaryData={data.stationaryData} />
          </div>
        )}

        {role === "verwaltung" && (
          <div>
            <VerwaltungHome />
          </div>
        )}
      </div>
    </div>
  );
};
