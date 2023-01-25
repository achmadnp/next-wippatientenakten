import { Input, RadioInput } from "@/components/Inputs/Forms";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { LoadingToast } from "@/page-components/Toast/Toast";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { data } from "autoprefixer";
import { getAllUser } from "lib/data/user/user";
import { deleteReq } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const baseURL = "https://wippatientenakte.azure-api.net/";

const Employee = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let data;
  let combinedData = [];
  data = getAllUser();

  const [filter, setFilter] = useState("alle");
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [staging, setStaging] = useState();

  if (data) {
    combinedData = data.arzt.concat(data.ass, data.patient, data.verw);
  }

  const [showData, setShowData] = useState(
    combinedData.length > 0 ? combinedData : []
  );

  useEffect(() => {
    if (combinedData.length > 0) {
      setShowData(combinedData);
    }
  }, [combinedData.length]);

  const handleDataShown = (data, page) => {
    setShowData(data);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    let filteredData;

    if (search !== "") {
      filteredData = combinedData
        .filter((data) => {
          return (
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.role.toLowerCase().includes(search.toLowerCase()) ||
            data.id.toLowerCase().includes(search.toLowerCase())
          );
        })
        .filter((data) => {
          if (value === "nur Mitarbeiter") {
            return (
              data.role === "Arzt" ||
              data.role === "Assistent" ||
              data.role === "Verwaltung"
            );
          } else if (value === "nur Patienten") {
            return data.role === "Patient";
          } else {
            return combinedData;
          }
        });
    } else {
      filteredData = combinedData.filter((data) => {
        if (value === "nur Mitarbeiter") {
          return (
            data.role === "Arzt" ||
            data.role === "Assistent" ||
            data.role === "Verwaltung"
          );
        } else if (value === "nur Patienten") {
          return data.role === "Patient";
        } else {
          return combinedData;
        }
      });
    }

    handleDataShown(filteredData);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    let searchedData;

    if (filter != "alle") {
      searchedData = combinedData
        .filter((data) => {
          if (filter === "nur Mitarbeiter") {
            return (
              data.role === "Arzt" ||
              data.role === "Assistent" ||
              data.role === "Verwaltung"
            );
          } else if (filter === "nur Patienten") {
            return data.role === "Patient";
          } else {
            return combinedData;
          }
        })
        .filter((data) => {
          return (
            data.name.toLowerCase().includes(keyword.toLowerCase()) ||
            data.vorname.toLowerCase().includes(keyword.toLowerCase()) ||
            data.role.toLowerCase().includes(keyword.toLowerCase()) ||
            data.id.toLowerCase().includes(keyword.toLowerCase())
          );
        });
    } else {
      if (keyword === "") {
        searchedData = combinedData;
      } else {
        searchedData = combinedData.filter((data) => {
          return (
            data.name.toLowerCase().includes(keyword.toLowerCase()) ||
            data.role.toLowerCase().includes(keyword.toLowerCase()) ||
            data.id.toLowerCase().includes(keyword.toLowerCase())
          );
        });
      }
    }

    handleDataShown(searchedData);
  };

  const handleAction = (e, data) => {
    if (data.role === "Patient") {
      Router.push(`/patient/${data.id}`);
    } else {
      setToggle(true);
      setStaging(data);
    }
  };

  const handleDelete = async () => {
    if (staging.role === "Arzt") {
      toast((t) => <LoadingToast text="Arzt wird gelöscht..." />);

      try {
        const delReq = await deleteReq({
          url: `${baseURL}s4/arzte/${staging.id}`,
        });

        if (delReq) {
          toast.remove();
          toast.success(`ein Arzt wurde erfolgreich gelöscht`, {
            style: {
              border: "1px solid green",
              padding: "16px",
              color: "#09ff00",
            },
          });

          window.location.reload(true);
        }
      } catch (error) {
        toast.remove();
        toast.error(`Fehlerhaft: Vorgang abgebrochen`, {
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "#ff0000",
          },
        });
      }
    } else if (staging.role === "Assistent") {
      toast((t) => <LoadingToast text="Assistent wird gelöscht..." />);

      try {
        const delReq = await deleteReq({
          url: `${baseURL}s4//assistenten/${staging.id}`,
        });

        if (delReq) {
          toast.remove();
          toast.success(`ein Assistent wurde erfolgreich gelöscht`, {
            style: {
              border: "1px solid green",
              padding: "16px",
              color: "#09ff00",
            },
          });

          window.location.reload(true);
        }
      } catch (error) {
        toast.remove();
        toast.error(`Fehlerhaft: Vorgang abgebrochen`, {
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "#ff0000",
          },
        });
      }
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <div className="w-full min-h-screen col-span-4 px-3 pt-8 lg:px-4 md:col-span-5 2xl:col-span-6 bg-bg-primary">
        <div className="container">
          <h1 className="mt-2 mb-5 text-4xl font-semibold underline">
            Liste aller eingetragenen Personen
          </h1>
          <div className="flex justify-between mx-4">
            <div>
              <RadioInput
                name="geschlecht"
                flex={false}
                values={["alle", "nur Mitarbeiter", "nur Patienten"]}
                checked={filter}
                handleCheck={handleFilter}
              />
            </div>

            <div className="w-[20%] block">
              <Input
                placeholder="Durchsuchen"
                value={search}
                handleChange={handleSearch}
              />
            </div>
          </div>
          <div className="my-10">
            <div className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8 ">
              <div className="inline-block min-w-full py-2 overflow-hidden sm:px-6 lg:px-8">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                      >
                        Aktion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {showData &&
                      showData.map((data, i) => (
                        <tr key={i} className="border-b">
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {data.id}
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {data.vorname} {data.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {data.role}
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                            <button
                              className="underline"
                              onClick={(e) => handleAction(e, data)}
                            >
                              {data.role === "Patient" ? "Details" : "Löschen"}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`${toggle ? "fixed" : "hidden"} left-[50%] top-[30%]`}>
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setToggle(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Sind Sie sicher, dass Sie die ausgewählten Daten
                  unwiderruflich löschen möchten?
                </h3>
                <button
                  onClick={() => {
                    setToggle(false);
                    handleDelete();
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Ja
                </button>
                <button
                  onClick={() => {
                    setToggle(false);
                    setStaging(null);
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Nein
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithSidebar>
  );
};

export default Employee;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
