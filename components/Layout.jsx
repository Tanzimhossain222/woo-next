import Head from "next/head";
import Header from "./Header";
import { AppProvider } from "@/context/AppContext";

const Layout = (props) => {
  return (
    <AppProvider>
      <div>
        <Head>
          <title>WooCommerce React Theme</title>
          <link
            rel="stylesheet"
            href="https://bootswatch.com/5/flatly/bootstrap.min.css"
          />
        </Head>
        <Header />
        {props.children}
      </div>
    </AppProvider>
  );
};

export default Layout;
