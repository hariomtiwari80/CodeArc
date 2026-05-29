import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] px-4 sm:px-6 pt-28 sm:pt-26 pb-20">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_45%)]"
      ></motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[320px] sm:h-[500px] md:h-[700px] bg-cyan-500/10 blur-3xl rounded-full"
      ></motion.div>

      <div className="relative text-center max-w-7xl mx-auto w-full">

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-cyan-900/40 bg-white/5 backdrop-blur-xl px-3 sm:px-5 py-2 shadow-[0_0_40px_rgba(14,165,233,0.08)]"
        >

          <span className="bg-cyan-500 text-[10px] sm:text-xs px-3 py-1 rounded-full font-medium text-white">
            LIVE
          </span>

          <p className="text-cyan-300 text-[11px] sm:text-sm">
            AI Powered Codeforces Performance Analytics
          </p>

        </motion.div>

        <motion.h1
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold mt-8 sm:mt-10 leading-[1.1] tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 text-transparent bg-clip-text px-2"
        >

          Analyze Your

          <br />

          <span className="text-cyan-400">
            Codeforces Journey
          </span>

        </motion.h1>

        <motion.p
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          className="text-slate-400 text-sm sm:text-lg md:text-xl max-w-4xl mx-auto mt-8 sm:mt-10 leading-7 sm:leading-9 px-2"
        >

          Track your Codeforces contests, analyze weak topics,
          monitor rating growth, get AI-generated recommendations,
          and improve your competitive programming performance smarter.

        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7 mt-16 sm:mt-9"
        >

          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 hover:border-cyan-400 hover:bg-cyan-500/[0.04] transition-all duration-500">

            <div className="text-4xl sm:text-5xl font-bold text-cyan-400">
              5K+
            </div>

            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-7">
              Codeforces submissions analyzed using AI-powered insights.
            </p>

          </div>

          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 hover:border-cyan-400 hover:bg-cyan-500/[0.04] transition-all duration-500">

            <div className="text-4xl sm:text-5xl font-bold text-cyan-400">
              AI
            </div>

            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-7">
              Detect weak topics, rating trends, and contest consistency instantly.
            </p>

          </div>

          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 hover:border-cyan-400 hover:bg-cyan-500/[0.04] transition-all duration-500">

            <div className="text-4xl sm:text-5xl font-bold text-cyan-400">
              24/7
            </div>

            <p className="text-slate-400 mt-4 text-sm sm:text-base leading-7">
              Personalized problem recommendations and learning roadmaps.
            </p>

          </div>

        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-full pointer-events-none"
      >

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-cyan-500/5 to-cyan-500/10 blur-2xl"></div>

        <div className="mx-auto w-[90%] sm:w-[85%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

      </motion.div>

    </section>
  );
};

export default Header;