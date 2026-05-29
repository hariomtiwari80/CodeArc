import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center px-3 py-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_55%)]"></div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-500/10 blur-[140px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-md flex flex-col items-center"
      >

        <div className="flex flex-col items-center mb-6">

          <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            src="/logo.png"
            alt="logo"
            className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-3"
          />

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Code
            <span className="text-cyan-400">
              Arc
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
            className="text-gray-400 mt-2 text-sm sm:text-base text-center px-2"
          >
            Create your account and start analyzing your Codeforces journey
          </motion.p>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
          }}
          className="w-full flex justify-center"
        >

          <SignUp
            routing="path"
            path="/register"
            signInUrl="/login"
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                },

                card: {
                  width: "100%",
                  maxWidth: "100%",
                  borderRadius: "24px",
                  background: "white",
                },
              },
            }}
          />

        </motion.div>

      </motion.div>

    </div>
  );
};

export default Register;