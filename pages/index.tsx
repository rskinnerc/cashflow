import { ReactElement } from 'react'
import Link from 'next/link'
import AuthContextProvider from '../store/AuthContextProvider'

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/balances">Balances</Link>
      <Link href="/pockets">Pockets</Link>
      <Link href="/auth">Auth</Link>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider>
        {page}
    </AuthContextProvider>
  )
}

export default Home
