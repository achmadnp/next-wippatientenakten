import { Input, RadioInput } from "@/components/Inputs/Forms";
import { data } from "autoprefixer";
import { useState } from "react";

const Employee = () => {
  const eData = [
    {
      id: "A1",
      name: "Daniel Mustermann",
      rolle: "Arzt",
    },
    {
      id: "A2",
      name: "Erika Musterfrau",
      rolle: "Arzt",
    },
    {
      id: "1",
      name: "Max Mustermann",
      rolle: "Assistenz",
    },
    {
      id: "V1",
      name: "Peter Mustermann",
      rolle: "Verwaltung",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      rolle: "Patient",
    },
    {
      id: "P2",
      name: "Erika Musterfrau",
      rolle: "Patient",
    },
    {
      id: "A1",
      name: "Daniel Mustermann",
      rolle: "Arzt",
    },
    {
      id: "A2",
      name: "Erika Musterfrau",
      rolle: "Arzt",
    },
    {
      id: "1",
      name: "Max Mustermann",
      rolle: "Assistenz",
    },
    {
      id: "V1",
      name: "Peter Mustermann",
      rolle: "Verwaltung",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      rolle: "Patient",
    },
    {
      id: "P2",
      name: "Erika Musterfrau",
      rolle: "Patient",
    },
  ];

  const [filter, setFilter] = useState("alle");
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [staging, setStaging] = useState();

  const [showData, setShowData] = useState(eData);

  const handleDataShown = (data, page) => {
    setShowData(data);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    let filteredData;

    if (search !== "") {
      filteredData = eData
        .filter((data) => {
          return (
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.rolle.toLowerCase().includes(search.toLowerCase()) ||
            data.id.toLowerCase().includes(search.toLowerCase())
          );
        })
        .filter((data) => {
          if (value === "nur Mitarbeiter") {
            return (
              data.rolle === "Arzt" ||
              data.rolle === "Assistenz" ||
              data.rolle === "Verwaltung"
            );
          } else if (value === "nur Patienten") {
            return data.rolle === "Patient";
          } else {
            return eData;
          }
        });
    } else {
      filteredData = eData.filter((data) => {
        if (value === "nur Mitarbeiter") {
          return (
            data.rolle === "Arzt" ||
            data.rolle === "Assistenz" ||
            data.rolle === "Verwaltung"
          );
        } else if (value === "nur Patienten") {
          return data.rolle === "Patient";
        } else {
          return eData;
        }
      });
    }
    setPages(
      Array(Math.ceil(filteredData.length / 10))
        .fill(null)
        .map((_, i) => i + 1)
    );
    handleDataShown(filteredData);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    let searchedData;

    if (filter != "alle") {
      searchedData = eData
        .filter((data) => {
          if (filter === "nur Mitarbeiter") {
            return (
              data.rolle === "Arzt" ||
              data.rolle === "Assistenz" ||
              data.rolle === "Verwaltung"
            );
          } else if (filter === "nur Patienten") {
            return data.rolle === "Patient";
          } else {
            return eData;
          }
        })
        .filter((data) => {
          return (
            data.name.toLowerCase().includes(keyword.toLowerCase()) ||
            data.rolle.toLowerCase().includes(keyword.toLowerCase()) ||
            data.id.toLowerCase().includes(keyword.toLowerCase())
          );
        });
    } else {
      if (keyword === "") {
        searchedData = eData;
      } else {
        searchedData = eData.filter((data) => {
          return (
            data.name.toLowerCase().includes(keyword.toLowerCase()) ||
            data.rolle.toLowerCase().includes(keyword.toLowerCase()) ||
            data.id.toLowerCase().includes(keyword.toLowerCase())
          );
        });
      }
    }

    handleDataShown(searchedData);
  };

  const handleAction = (e, data) => {
    console.log(data);

    if (data.rolle === "Patient") {
      console.log("Details");
    } else {
      setToggle(true);
      setStaging(data);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(``, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      } else {
        await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen col-span-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
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
                      Rolle
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
                          {data.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {data.rolle}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                          <button
                            className="underline"
                            onClick={(e) => handleAction(e, data)}
                          >
                            {data.rolle === "Patient" ? "Details" : "Löschen"}
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
                Sind Sie sicher, dass Sie die ausgewählten Daten unwiderruflich
                löschen möchten?
              </h3>
              <button
                onClick={() => {
                  setToggle(false);
                }}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Ja
              </button>
              <button
                onClick={() => setToggle(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Nein
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
