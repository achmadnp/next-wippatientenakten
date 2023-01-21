import { SessionProvider } from "next-auth/react";

import "../styles/index.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps: pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </SessionProvider>
  );
}

export default MyApp;
