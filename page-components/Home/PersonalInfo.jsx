import { Avatar } from "@/components/Images/Image";

export const PersonalInfo = (props) => {
  const fields = [
    { fieldName: "Vollname", value: "Max Musterman" },
    { fieldName: "Email", value: "Max@musterman.com" },
    { fieldName: "Geschlecht", value: "Männlich" },
    { fieldName: "Geburtsdatum", value: "01.01.2015" },
    { fieldName: "Telefonnummer", value: "+49012345678" },
    { fieldName: "Krankenkasse", value: "AOK" },
  ];
  return (
    <>
      <p className="text-lg font-semibold">Herzlich Willkommen</p>
      <div className="p-2 space-y-4 border-2 rounded">
        <p className="text-lg font-bold">Persönliche Daten</p>
        <div className="flex justify-start gap-8">
          <Avatar
            imgSrc={`https://mdbcdn.b-cdn.net/img/new/avatars/2.webp`}
            imgWidth="36"
          />
          <div className="grid w-full grid-cols-3">
            {fields.map((field) => (
              <div key={field.fieldName} className="pt-2">
                <p className="font-bold text-md">{field.fieldName}</p>
                <p className="font-normal text-md">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
