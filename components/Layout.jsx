import Head from "next/head";
import Header from "./Header";


const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>WooCommerce React Theme</title>
        <link rel="stylesheet" href="https://bootswatch.com/5/flatly/bootstrap.min.css" />
      </Head>
      <Header />
    {props.children}
    </div>
  )
}

export default Layout;