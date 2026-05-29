import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-28 bg-[#030712] overflow-hidden">

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.14),transparent_45%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        className="absolute right-0 top-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-500/10 blur-3xl rounded-full"
      ></motion.div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
          }}
        >

          <p className="text-cyan-400 uppercase tracking-[0.3em] text-[11px] sm:text-sm font-medium">
            About Platform
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-5 sm:mt-6 leading-tight text-white">

            Built for

            <span className="text-cyan-400">
              {" "}Codeforces Coders
            </span>

          </h2>

          <p className="text-slate-400 text-sm sm:text-lg leading-7 sm:leading-9 mt-6 sm:mt-8 max-w-2xl">

            CodeArc helps competitive programmers analyze
            Codeforces contests, identify weak topics,
            track rating progress, and improve problem-solving
            consistency using AI-powered insights.

          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">

            <motion.div
              whileHover={{
                y: -10,
                borderColor: "rgba(34,211,238,0.7)",
              }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 hover:bg-cyan-500/5 transition-all duration-300"
            >

              <h3 className="text-4xl sm:text-5xl font-bold text-cyan-400">
                5K+
              </h3>

              <p className="text-slate-400 mt-3 sm:mt-4 text-base sm:text-lg">
                Codeforces Problems
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                borderColor: "rgba(34,211,238,0.7)",
              }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 hover:bg-cyan-500/5 transition-all duration-300"
            >

              <h3 className="text-4xl sm:text-5xl font-bold text-cyan-400">
                AI
              </h3>

              <p className="text-slate-400 mt-3 sm:mt-4 text-base sm:text-lg">
                Smart Contest Analysis
              </p>

            </motion.div>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
          }}
          className="relative"
        >

          <div className="absolute -top-8 -right-8 w-32 sm:w-40 h-32 sm:h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-10 shadow-[0_0_50px_rgba(14,165,233,0.06)]">

            <div className="space-y-5 sm:space-y-6">

              {[
                {
                  title: "Weak Topic Detection",
                  desc: "Identify weak Codeforces topics and improve problem-solving accuracy.",
                },
                {
                  title: "Contest Performance",
                  desc: "Track rating changes, contest consistency, and solving speed analytics.",
                },
                {
                  title: "Personalized Recommendations",
                  desc: "Get AI-generated problem suggestions and coding improvement roadmaps.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-black/30 border border-white/5 rounded-3xl p-5 sm:p-7 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-300"
                >

                  <div className="flex items-start gap-4 sm:gap-5">

                    <motion.div
                      whileHover={{
                        rotate: 180,
                        scale: 1.1,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl sm:text-2xl shrink-0"
                    >
                      ✦
                    </motion.div>

                    <div>

                      <h3 className="text-xl sm:text-3xl font-semibold text-cyan-300 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-slate-400 mt-3 sm:mt-4 leading-7 sm:leading-8 text-sm sm:text-lg">

                        {item.desc}

                      </p>

                    </div>

                  </div>

                </motion.div>
              ))}

            </div>

          </div>

        </motion.div>

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

export default About;