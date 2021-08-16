import { ReactElement } from "react";
import AuthContextProvider from "../store/AuthContextProvider";
 
const Balances: NextPageWithLayout = () => {
    return ( 
        <div>
            <h2>Balances Page</h2>
        </div>
     );
}

Balances.getLayout = function getLayout(page: ReactElement) {
    return (
      <AuthContextProvider>
          {page}
      </AuthContextProvider>
    )
  }
 
export default Balances;