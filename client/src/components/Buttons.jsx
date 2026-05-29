import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Buttons = () => {

  const navigate = useNavigate();

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32 bg-[#030712] overflow-hidden">

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">

        <svg
          className="relative block w-[calc(100%+1.3px)] h-16 sm:h-24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39 56.44C197.81 89.92 0 120 0 120V0h1200v27.35c-191.86 22.27-372.1 60.95-563.77 52.61C517.11 74.4 431.56 34.92 321.39 56.44z"
            className="fill-[#030712]"
          ></path>
        </svg>

      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),transparent_50%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-cyan-500/10 blur-3xl rounded-full"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.9,
        }}
        className="relative max-w-5xl mx-auto text-center bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.8rem] px-5 sm:px-10 py-14 sm:py-24 shadow-[0_0_60px_rgba(14,165,233,0.06)] overflow-hidden"
      >

        <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="relative">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full border border-cyan-900/40 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm mb-6 sm:mb-8"
          >
            Codeforces AI Analytics
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white"
          >

            Improve Your

            <span className="text-cyan-400">
              {" "}Contest Performance
            </span>

          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            className="text-slate-400 text-sm sm:text-lg mt-6 sm:mt-8 max-w-3xl mx-auto leading-7 sm:leading-8 px-1"
          >

            Get deep insights into your Codeforces rating growth,
            contest consistency, weak topics, solving patterns,
            and AI-generated recommendations to level up faster.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.7,
            }}
            className="flex justify-center mt-12 sm:mt-16"
          >

            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0px 0px 40px rgba(14,165,233,0.45)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="group relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-medium text-white shadow-[0_0_30px_rgba(14,165,233,0.3)]"
            >

              <span className="relative z-10">
                Get Started
              </span>

            </motion.button>

          </motion.div>

        </div>

      </motion.div>

    </section>
  );
};

export default Buttons;