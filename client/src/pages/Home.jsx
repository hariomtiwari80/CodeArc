import { lazy, Suspense } from "react";

import Navbar from "../components/Navbar";
import Header from "../components/Header";

const About = lazy(() =>
  import("../components/About")
);

const Features = lazy(() =>
  import("../components/Features")
);

const Buttons = lazy(() =>
  import("../components/Buttons")
);

const Footer = lazy(() =>
  import("../components/Footer")
);

const Loader = () => (
  <div className="flex justify-center py-8">
    <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">

      <Navbar />

      <Header />

      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Features />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Buttons />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>

    </div>
  );
};

export default Home;