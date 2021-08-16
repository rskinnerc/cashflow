import '../styles/globals.css'
import type { AppProps } from 'next/app'
import FirebaseContext from '../store/FirebaseContext'
import firebaseInit from "../firebase";

const firebase = firebaseInit()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <FirebaseContext.Provider value={firebase}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
  
}
export default MyApp
