import { motion } from "framer-motion";

const features = [
  "Rating Analytics",
  "Contest Performance",
  "AI Topic Detection",
  "Problem Recommendations",
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative px-4 sm:px-6 py-20 sm:py-32 bg-[#030712] overflow-hidden"
    >

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_45%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        className="absolute left-0 top-20 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-cyan-500/10 blur-3xl rounded-full"
      ></motion.div>

      <div className="relative max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
          }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-cyan-400 uppercase tracking-[0.3em] text-[11px] sm:text-sm">
            Codeforces Features
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-5 sm:mt-6 text-white leading-tight">
            Everything For Competitive Coding
          </h2>

          <p className="text-slate-400 mt-6 sm:mt-8 text-sm sm:text-lg leading-7 sm:leading-8 px-2">

            Analyze Codeforces contests, track rating growth,
            identify weak topics, and improve problem-solving
            using AI-powered coding insights.

          </p>

        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-14 sm:mt-20">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
              }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 hover:border-cyan-400 hover:bg-cyan-500/[0.04] transition-all duration-500 overflow-hidden"
            >

              <div className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 bg-cyan-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative flex items-center justify-between">

                <motion.div
                  whileHover={{
                    rotate: 180,
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl sm:text-2xl group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300"
                >
                  ✦
                </motion.div>

                <span className="text-[10px] sm:text-xs text-cyan-300 uppercase tracking-wider">
                  Codeforces
                </span>

              </div>

              <div className="relative">

                <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 text-white leading-snug">
                  {feature}
                </h3>

                <p className="text-slate-400 mt-4 sm:mt-5 leading-7 sm:leading-8 text-sm sm:text-base">

                  Advanced Codeforces analytics
                  powered with AI-driven insights.

                </p>

                <ul className="mt-5 sm:mt-6 space-y-3 text-slate-500 text-xs sm:text-sm">

                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    Rating trend analysis
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    Contest performance tracking
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    AI-powered recommendations
                  </li>

                </ul>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        className="absolute bottom-0 left-0 w-full pointer-events-none"
      >

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-cyan-500/5 to-cyan-500/10 blur-2xl"></div>

        <div className="mx-auto w-[90%] sm:w-[85%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

      </motion.div>

    </section>
  );
};

export default Features;