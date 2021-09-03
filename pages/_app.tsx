import "../styles/globals.css";
import type { AppProps } from "next/app";
import FirebaseContext from "../store/FirebaseContext";
import firebaseInit from "../firebase";
import { ReactElement } from "react";
import Head from "next/head";

const firebase = firebaseInit();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return (
    <>
      <Head>
        <title>Cashflow App</title>
        <meta property="og:title" content="Cashflow App" key="title" />
      </Head>
      <FirebaseContext.Provider value={firebase}>
        {getLayout(<Component {...pageProps} />)}
      </FirebaseContext.Provider>
    </>
  );
}
export default MyApp;
