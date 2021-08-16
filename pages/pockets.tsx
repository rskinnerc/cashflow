
import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import AuthContextProvider from "../store/AuthContextProvider";

export interface PocketsProps {
    
}
 
const Pockets: NextPageWithLayout = () => {
    return ( 
        <div>
            <h2>Pockets Page</h2>
        </div>
     );
}

Pockets.getLayout = function getLayout(page: ReactElement) {
    return (
      <AuthContextProvider>
        <Navbar />
          {page}
      </AuthContextProvider>
    )
  }
 
export default Pockets;