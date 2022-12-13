import Head from "next/head";
import { Navbar } from "./Nav";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Projekt 2</title>
        <meta key="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
      </Head>
      <Navbar />
      <main></main>
      {/* <Footer /> */}
    </>
  );
};
