import Head from "next/head";
import Script from "next/script"
import Header from "../components/shared/header.component";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
