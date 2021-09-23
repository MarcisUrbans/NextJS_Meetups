import Layout from "../components/layout/Layout.js";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  //tests
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
