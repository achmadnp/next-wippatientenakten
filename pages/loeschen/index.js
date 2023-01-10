const { useState } = require("react");

// verwaltung sicht
const Loeschen = () => {
  const lData = [
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P2",
      name: "Max Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P3",
      name: "Erik Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P4",
      name: "Heinrich Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P2",
      name: "Max Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P3",
      name: "Erik Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P4",
      name: "Heinrich Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
    {
      id: "P1",
      name: "Daniel Mustermann",
      datum: "01.01.2000",
      gruend: "gr1",
    },
  ];

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(
    Array(Math.ceil(lData.length / 5))
      .fill(null)
      .map((_, i) => i + 1)
  );

  const paginate = (array, pgSize = 5, pgNumber = page) =>
    array.slice((pgNumber - 1) * pgSize, pgNumber * pgSize);
  const [toggle, setToggle] = useState(false);
  const [staging, setStaging] = useState();

  const [showData, setShowData] = useState(paginate(lData));

  const handleDataShown = (data, page) => {
    setShowData(paginate(data, 5, page));
  };

  const handleAction = (e, data) => {
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
          Löschanträge
        </h1>

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
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                    >
                      Antrag vom
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                    >
                      Begründung
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
                          {data.datum}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                          {data.gruend}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                          <button
                            className="underline"
                            onClick={(e) => handleAction(e, data)}
                          >
                            Löschen
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {pages.length > 1 && (
          <div className="flex mt-10">
            <ul className="inline-flex mx-auto border-2 border-black divide-x divide-gray-300 rounded">
              {pages.map((pageBtn, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setPage(index + 1);
                      handleDataShown(lData, index + 1);
                    }}
                    className={`px-3 py-2 leading-tight min-h-[30px] min-w-[50px] hover:font-bold hover:text-gray-900 ${
                      page === index + 1
                        ? "bg-gray-400 text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {pageBtn}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${toggle ? "fixed" : "hidden"} left-[40%] top-[30%]`}>
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
    </div>
  );
};

export default Loeschen;
