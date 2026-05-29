import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-[#030712] overflow-hidden">

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">

        <svg
          className="relative block w-[calc(100%+1.3px)] h-14 sm:h-20"
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_55%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-500/10 blur-3xl rounded-full"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.9,
        }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6"
      >

        <div className="border-t border-cyan-900/20 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-sm">

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="text-slate-500 text-center md:text-left text-xs sm:text-sm"
          >
            © 2026 CodeArc. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >

            <motion.a
              whileHover={{
                y: -2,
                color: "#22d3ee",
              }}
              href="/"
              className="text-slate-500 transition-all duration-300 text-xs sm:text-sm"
            >
              Privacy Policy
            </motion.a>

            <motion.a
              whileHover={{
                y: -2,
                color: "#22d3ee",
              }}
              href="/"
              className="text-slate-500 transition-all duration-300 text-xs sm:text-sm"
            >
              Terms of Service
            </motion.a>

            <motion.a
              whileHover={{
                y: -2,
                color: "#22d3ee",
              }}
              href="/"
              className="text-slate-500 transition-all duration-300 text-xs sm:text-sm"
            >
              Contact
            </motion.a>

          </motion.div>

        </div>

      </motion.div>

    </footer>
  );
};

export default Footer;