import { LoadingToast } from "@/components/Toasts/Toast";
import { DateConverter, TimeConverter } from "@/utils/DateConverter";
import { getRaumKrankenhaus } from "lib/data/krankenhaus/krankenhaus";
import { deleteReq } from "lib/fetcher";
import { toast } from "react-hot-toast";

const baseURL = "https://wippatientenakte.azure-api.net/";

export const NaechsteTermine = ({ termine, role }) => {
  let allKH = [];
  let nextTermine = termine.filter((t) => {
    return new Date(t.datum) - Date.now() > 0;
  });

  nextTermine?.map((termin, i) => {
    const khData = getRaumKrankenhaus({ raumId: termin.raum });

    if (khData) {
      allKH.push(khData?.name);
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          {nextTermine.length <= 0 && (
            <div className="text-lg">Keine Einträge</div>
          )}
          {nextTermine.length > 0 && (
            <table className="min-w-full">
              <TableHead />
              <tbody>
                {nextTermine?.map((termin, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      <div>
                        <p>{DateConverter(new Date(termin.datum))}</p>
                        <p>{TimeConverter(new Date(termin.datum))}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {termin.anliegen}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {termin.aName}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {termin.pName}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                      {allKH[i]}, Raum {termin.raumnummer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export const AlleTermine = ({ termine, role }) => {
  const handleDelete = async ({ termine }) => {
    const datum = termine.datum.replaceAll(":", "%3A");
    toast((t) => <LoadingToast text="Anfrage wird erstellt..." />);
    try {
      const delReq = await deleteReq({
        url: `${baseURL}s3/termine/${termine.pid}/${termine.aid}/${datum}`,
      });

      if (delReq) {
        toast.remove();
        toast.success(`ein Termin wurde erfolgreich gelöscht`, {
          style: {
            border: "1px solid green",
            padding: "16px",
            color: "#09ff00",
          },
        });

        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
      toast.remove();
      toast.error(`Fehlerhaft: Vorgang abgebrochen`, {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "#ff0000",
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full py-2 sm:px-1 lg:px-2">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <TableHead actionbtn={role === "arzt"} />
            <tbody>
              {termine.map((termin, i) => (
                <tr key={i} className="border-b">
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    <div>
                      <p>{DateConverter(new Date(termin.datum))}</p>
                      <p>{TimeConverter(new Date(termin.datum))}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {termin.anliegen}
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {termin.aVorname} {termin.aName}
                  </td>
                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    {termin.pVorname} {termin.pName}
                  </td>

                  <td className="px-6 py-4 font-light text-gray-900 text-md whitespace-nowrap">
                    <RaumTermin data={termin} />
                  </td>
                  {role === "arzt" && (
                    <td className="px-6 py-4 font-light text-blue-600 underline text-md whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          handleDelete({
                            termine: {
                              pid: termin.patientId,
                              aid: termin.arztId,
                              datum: termin.datum,
                            },
                          });
                        }}
                      >
                        Löschen
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RaumTermin = ({ data }) => {
  let kh;

  kh = getRaumKrankenhaus({ raumId: data.raum });

  if (!kh) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {kh && (
        <p>
          {kh.name}, Raum: {data.raumnummer}
        </p>
      )}
    </>
  );
};

const TableHead = ({ role, actionbtn }) => {
  return (
    <thead className="min-w-full bg-gray-300 border-b">
      <tr>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Datum/Uhrzeit
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Anliegen
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Arzt
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Patient
        </th>
        <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
          Raum
        </th>
        {actionbtn && (
          <th className="px-6 py-4 font-medium text-left text-gray-900 text-md">
            Aktion
          </th>
        )}
      </tr>
    </thead>
  );
};
