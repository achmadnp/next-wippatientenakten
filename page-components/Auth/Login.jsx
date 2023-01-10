import { IDSvg } from "@/components/svgs/Svgs";
import {
  LoadingToast,
  SuccessToast,
  FailedToast,
} from "@/components/Toasts/Toast";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

export const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessToast, setSuccessToast] = useState(false);
  const [isFailedToast, setFailedToast] = useState(null);
  const [message, setMessage] = useState(null);

  const showToast = (state) => {
    if (state === "init") {
      setIsLoading(false);
      setSuccessToast(false);
      setFailedToast(false);
    }
    if (state === "loading") {
      setIsLoading(true);
      setSuccessToast(false);
      setFailedToast(false);
    }
    if (state === "success") {
      setIsLoading(false);
      setSuccessToast(true);
      setFailedToast(false);
    }
    if (state === "failed") {
      setIsLoading(false);
      setSuccessToast(false);
      setFailedToast(true);
    }

    setTimeout(() => {
      setIsLoading(false);
      setSuccessToast(false);
      setFailedToast(false);
    }, 2500);
  };

  const signinUser = async (e) => {
    e.preventDefault();
    showToast("init");

    let options = { redirect: false, id, password, role };

    const res = await signIn("credentials", options);
    if (res?.error) {
      return;
    }

    setTimeout(() => {
      Router.push("/");
    }, 1000);
  };

  return (
    <div className="">
      {isLoading && <LoadingToast />}

      {isSuccessToast && <SuccessToast />}

      {isFailedToast && <FailedToast />}
      <div className="flex h-screen bg-gray-300 dark:text-white">
        <div className="w-full max-w-md px-16 py-10 m-auto bg-gray-700 border-2 rounded-lg shadow-lg shadow-cyan-500/50 border-cyan-400 border-primary Border shadow-default">
          <h1 className="mt-2 mb-12 text-2xl font-medium text-center text-primary">
            Anmeldung
          </h1>

          <div className="relative z-0">
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ID
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IDSvg strokeColor={"#000000"} />
              </div>
              <input
                type="text"
                name="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Passwort
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#000000"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  ></path>
                </svg>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <select
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            >
              <option value="patient">Patient</option>
              <option value="arzt">Arzt</option>
              <option value="assistent">Assistent</option>
              <option value="verwaltung">Verwaltung</option>
            </select>
          </div>

          <div>
            <button
              onClick={
                (e) => {
                  signinUser(e);
                }
                // signinUser(e)
              }
              className="block w-full px-4 py-2 mt-20 font-semibold text-center text-white rounded cursor-pointer bg-c-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80"
            >
              Anmelden
            </button>
            {/* <div>
              <p className="block mt-4 text-sm font-medium text-center text-textColor dark:text-textColor-dark">
                Neu bei uns?
              </p>
              <a
                href="/register"
                className="block mt-2 text-sm font-bold text-center text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                Konto Erstellen
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
