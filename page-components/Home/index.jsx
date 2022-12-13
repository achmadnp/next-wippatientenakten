import { Schedule } from "./Schedule";
import { PersonalInfo } from "./PersonalInfo";
import { Medicationplan } from "./Medication";

export const Home = (props) => {
  return (
    <div className="w-full min-h-screen col-span-6 pt-8 bg-bg-primary">
      <div className="container w-screen">
        <PersonalInfo />
        <Schedule />
        <Medicationplan />
      </div>
    </div>
  );
  s;
};
