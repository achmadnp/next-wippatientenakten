export const PersonalInfo = ({ data }) => {
  return (
    <>
      <div className="p-2 space-y-4 border-2 rounded">
        <p className="text-lg font-bold">Persönliche Daten</p>
        <div className="flex justify-start gap-8">
          <div className="grid w-full grid-cols-2 lg:grid-cols-3">
            {data.map((field) => (
              <div key={field.fieldName} className="pt-2">
                <p className="overflow-hidden font-bold text-ellipsis text-md">
                  {field.fieldName}
                </p>
                <p className="overflow-hidden font-normal text-ellipsis text-md">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
