import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="fixed top-0 left-0 w-full z-50 bg-[#030712]/80 backdrop-blur-2xl border-b border-cyan-900/20"
    >

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">

        <motion.div
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
        >

          <div className="relative">

            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>

            <img
              src="/logo.webp"
              alt="CodeArc Logo"
              width={64}
              height={64}
              loading="eager"
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />

          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-wide text-white">

            Code

            <span className="text-cyan-400">
              Arc
            </span>

          </h1>

        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(8,145,178,0.35)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/login")}
          className="
            relative overflow-hidden
            bg-cyan-600
            hover:bg-cyan-500
            px-4 sm:px-6 md:px-7
            py-2 sm:py-2.5
            rounded-full
            text-xs sm:text-sm md:text-base
            font-semibold
            tracking-wide
            text-white
            transition-all duration-300
            shadow-[0_0_20px_rgba(8,145,178,0.20)]
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-400/60
          "
        >

          <span className="relative z-10">
            Get Started
          </span>

          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-300/10 to-transparent"></div>

        </motion.button>

      </div>

    </motion.nav>
  );
};

export default Navbar;