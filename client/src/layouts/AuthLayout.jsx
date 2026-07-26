import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container my-5">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default AuthLayout;