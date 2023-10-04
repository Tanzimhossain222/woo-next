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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <Header />
        {props.children}
      </div>
    </AppProvider>
  );
};

export default Layout;
