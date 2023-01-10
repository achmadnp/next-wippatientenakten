import { Sidebar } from "@/components/Sidebar/Sidebar";
import { WithSidebar } from "@/components/Wrapper/WithSidebar";
import { DateConverter } from "@/utils/DateConverter";
import { getSidebarMenus } from "@/utils/SidebarMenus";
import { Dialog, Transition } from "@headlessui/react";
import { fetcher } from "lib/fetcher";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
const baseURL = "https://wippatientenakte.azure-api.net/";

const Stammdaten = (props) => {
  const session = props.session;

  const userRole = session?.userRole;

  const pid = props.pid;

  useEffect(() => {
    if (!session) {
      Router.push(`/signin`);
    }
  }, [session]);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { data: stammData, error: stammError } = useSWR(
    `${baseURL}/s2/patienten/${pid}`,
    fetcher
  );

  const { data: kData, error: kError } = useSWR(
    stammData ? `${baseURL}s2/krankenkassen/${stammData?.krankenkasse}` : null,
    fetcher
  );

  let data;

  if (stammData && kData) {
    data = [
      {
        fieldName: "Vollname",
        value: `${stammData.vorname} ${stammData.name}`,
      },
      { fieldName: "Username", value: stammData.username },
      { fieldName: "Email", value: stammData.email },
      { fieldName: "Geschlecht", value: stammData.geschlecht },
      {
        fieldName: "Geburtsdatum",
        value: DateConverter(new Date(stammData.geburtsdatum)),
      },
      { fieldName: "adresse", value: stammData.adresse },
      { fieldName: "Telefonnummer", value: stammData.telefonnummer },
      {
        fieldName: "Krankenkasse",
        value: `${kData?.name},${kData?.standort}`,
      },
    ];
  }

  return (
    <WithSidebar>
      <Sidebar menus={getSidebarMenus({ role: userRole, id: session?.id })} />
      <div className="w-full min-h-screen col-span-4 px-4 pt-8 md:col-span-5 2xl:col-span-6 bg-bg-primary">
        {stammData && (
          <div className="container">
            <div className="p-2 space-y-4 border-2 rounded">
              <p className="text-lg font-bold">Persönliche Daten</p>
              <div className="flex justify-start gap-8">
                <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                  {data &&
                    data.map((field) => (
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
            {pid === session.id && (
              <div className="mt-5">
                <button
                  onClick={openModal}
                  className="p-2 font-semibold text-red-600 border-2 border-red-600 rounded-md"
                >
                  Meine Daten Löschen
                </button>
              </div>
            )}

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-red-700"
                        >
                          Alle Daten dauerhaft löschen
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum. Why do we use it? It is a long
                            established fact that a reader will be distracted by
                            the readable content of a page when looking at its
                            layout. The point of using Lorem Ipsum is that it
                            has a more-or-less normal distribution of letters,
                            as opposed to using Content here, content here,
                            making it look like readable English. Many desktop
                            publishing packages and web page editors now use
                            Lorem Ipsum as their default model text, and a
                            search for lorem ipsu will uncover many web sites
                            still in their infancy. Various versions have
                            evolved over the years, sometimes by accident,
                            sometimes on purpose (injected humour and the like).
                            Where does it come from? Contrary to popular belief,
                            Lorem Ipsum is not simply random text. It has roots
                            in a piece of classical Latin literature from 45 BC,
                            making it over 2000 years old. Richard McClintock, a
                            Latin professor at Hampden-Sydney College in
                            Virginia, looked up one of the more obscure Latin
                            words, consectetur, from a Lorem Ipsum passage, and
                            going through the cites of the word in classical
                            literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of de
                            Finibus Bonorum et Malorum (The Extremes of Good and
                            Evil) by Cicero, written in 45 BC. This book is a
                            treatise on the theory of ethics, very popular
                            during the Renaissance. The first line of Lorem
                            Ipsum, Lorem ipsum dolor sit amet.., comes from a
                            line in section 1.10.32. The standard chunk of Lorem
                            Ipsum used since the 1500s is reproduced below for
                            those interested. Sections 1.10.32 and 1.10.33 from
                            de Finibus Bonorum et Malorum by Cicero are also
                            reproduced in their exact original form, accompanied
                            by English versions from the 1914 translation by H.
                            Rackham. Where can I get some? There are many
                            variations of passages of Lorem Ipsum available, but
                            the majority have suffered alteration in some form,
                            by injected humour, or randomised words which dont
                            look even slightly believable. If you are going to
                            use a passage of Lorem Ipsum, you need to be sure
                            there isnt anything embarrassing hidden in the
                            middle of text. All the Lorem Ipsum generators on
                            the Internet tend to repeat predefined chunks as
                            necessary, making this the first true generator on
                            the Internet. It uses a dictionary of over 200 Latin
                            words, combined with a handful of model sentence
                            structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore
                            always free from repetition, injected humour, or
                            non-characteristic words etc.
                          </p>
                        </div>

                        <div className="flex justify-between mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Abbrechen
                          </button>

                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Daten löschen
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        )}
      </div>
    </WithSidebar>
  );
};

export default Stammdaten;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const pid = await context.params.patientid;

  return {
    props: {
      session,
      pid,
    },
  };
}
