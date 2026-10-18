import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CallFloat from "./components/CallFloat";
import ScrollToTop from "./components/ScrollToTop";

export default function App({ children }) {
  return (
    <>
      <Navbar />
      <div className="relative"><CallFloat /></div>
      <div className="relative"><WhatsAppFloat /></div>
      <ScrollToTop />
      <main id="main-content" className="pt-[var(--navbar-height)]">{children}</main>
      <Footer />
    </>
  );
}
