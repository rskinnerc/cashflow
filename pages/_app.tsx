import "../styles/globals.css";
import type { AppProps } from "next/app";
import FirebaseContext from "../store/FirebaseContext";
import firebaseInit from "../firebase";
import { ReactElement } from "react";

const firebase = firebaseInit();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return (
    <FirebaseContext.Provider value={firebase}>
      {getLayout(<Component {...pageProps} />)}
    </FirebaseContext.Provider>
  );
}
export default MyApp;
