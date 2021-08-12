import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cashflow by Dev2Cloud</title>
        <meta name="description" content="Cashflow tracking app by Dev2Cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Cashflow App by Dev2Cloud
        </h1>
      </main>
    </div>
  )
}

export default Home
