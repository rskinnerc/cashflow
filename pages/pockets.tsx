
import { ReactElement } from "react";
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
          {page}
      </AuthContextProvider>
    )
  }
 
export default Pockets;