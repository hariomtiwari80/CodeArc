import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Header from "../components/Header";
import About from "../components/About";
import Features from "../components/Features";
import Buttons from "../components/Buttons";

const Home = () => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      
      <Navbar />

      <Header />

      <About />

      <Features />

      <Buttons />

      <Footer />

    </div>
  );
};

export default Home;