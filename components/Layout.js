import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Aside />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;