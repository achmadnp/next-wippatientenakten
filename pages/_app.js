import { SessionProvider } from "next-auth/react";

import "../styles/index.css";

function MyApp({ Component, pageProps: pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
