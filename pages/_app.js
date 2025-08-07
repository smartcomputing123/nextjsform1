import Layout from "../components/Layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// const MyApp = ({ Component, pageProps }) => {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// };

// export default MyApp;
