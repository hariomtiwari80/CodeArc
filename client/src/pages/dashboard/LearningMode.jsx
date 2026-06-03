import { useState } from "react";

import axios from "axios";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Brain,
  Lock,
  Sparkles,
  Code2,
  ArrowRight,
} from "lucide-react";

const API =
  import.meta.env.VITE_API_URL;

const LearningMode = () => {

  const [problem, setProblem] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [pseudoLoading, setPseudoLoading] =
    useState(false);

  const [hints, setHints] =
    useState([]);

  const [pseudocode, setPseudocode] =
    useState("");

  const [unlockedHints, setUnlockedHints] =
    useState(0);

  const [showPseudoButton, setShowPseudoButton] =
    useState(false);

  const [error, setError] =
    useState("");

  const validateProblem = () => {

    const trimmed =
      problem.trim();

    if (!trimmed)
      return false;

    if (trimmed.length < 20)
      return false;

    return true;

  };

  const startLearning = async () => {

    try {

      setError("");

      if (
        !validateProblem()
      ) {

        return setError(
          "Please enter a valid problem statement."
        );

      }

      setLoading(true);

      setHints([]);

      setUnlockedHints(0);

      setShowPseudoButton(false);

      setPseudocode("");

      const res =
        await axios.post(
          `${API}/api/learning/hint`,
          {
            problem,
          }
        );

      setHints(
        res.data.hints
      );

      setUnlockedHints(1);

    } catch (error) {

      console.log(error);

      setError(
        "Failed to generate hints."
      );

    } finally {

      setLoading(false);

    }

  };

  const unlockNextHint = () => {

    if (
      unlockedHints < 3
    ) {

      const next =
        unlockedHints + 1;

      setUnlockedHints(next);

      if (next === 3) {

        setShowPseudoButton(true);

      }

    }

  };

  const generatePseudocode =
    async () => {

      try {

        setPseudoLoading(true);

        const res =
          await axios.post(
            `${API}/api/learning/pseudocode`,
            {
              problem,
            }
          );

        setPseudocode(
          res.data.pseudocode
        );

      } catch (error) {

        console.log(error);

        setError(
          "Failed to generate pseudocode."
        );

      } finally {

        setPseudoLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black px-3 sm:px-5 lg:px-8 py-6 sm:py-10 overflow-hidden">

      <div className="max-w-7xl mx-auto">



        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden"
        >

          <div className="relative">

            <textarea
              value={problem}
              onChange={(e) =>
                setProblem(
                  e.target.value
                )
              }
              placeholder="Paste your problem statement here..."
              className="w-full h-56 sm:h-72 lg:h-80 p-4 sm:p-6 rounded-3xl bg-[#0f172a] border border-cyan-900/20 text-white outline-none resize-none text-sm sm:text-base leading-7 placeholder:text-slate-500 custom-scrollbar"
            />

            <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.06),transparent_70%)]"></div>

          </div>

          {error && (

            <div className="mt-5 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm sm:text-base">

              {error}

            </div>

          )}

          <button
            onClick={
              startLearning
            }
            disabled={loading}
            className="mt-6 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.18)] disabled:opacity-50"
          >

            {
              loading
                ? "AI is thinking..."
                : "Start Learning"
            }

          </button>

        </motion.div>

        <AnimatePresence>

          {hints.length > 0 && (

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6"
            >

              {[1, 2, 3].map(
                (
                  num,
                  index
                ) => {

                  const unlocked =
                    index <
                    unlockedHints;

                  return (

                    <motion.div
                      key={num}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.1,
                      }}
                      className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 sm:p-6 flex flex-col min-h-[320px] overflow-hidden"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            unlocked
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "bg-[#111827] text-slate-500"
                          }`}>

                            {unlocked ? (
                              <Sparkles
                                size={
                                  22
                                }
                              />
                            ) : (
                              <Lock
                                size={
                                  20
                                }
                              />
                            )}

                          </div>

                          <div>

                            <h2 className="text-xl font-bold text-white">

                              Hint {num}

                            </h2>

                            <p className="text-slate-500 text-sm mt-1">

                              {
                                unlocked
                                  ? "Unlocked"
                                  : "Locked"
                              }

                            </p>

                          </div>

                        </div>

                        {!unlocked && (

                          <span className="text-slate-500 text-sm">

                            Locked

                          </span>

                        )}

                      </div>

                      <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar pr-2">

                        {unlocked &&
                          hints[
                            index
                          ] && (

                          <p className="text-slate-300 leading-8 text-sm sm:text-base whitespace-pre-wrap">

                            {
                              hints[
                                index
                              ]
                            }

                          </p>

                        )}

                      </div>

                      {index + 1 ===
                        unlockedHints &&
                        unlockedHints <
                          3 && (

                        <button
                          onClick={
                            unlockNextHint
                          }
                          className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 py-3 rounded-2xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        >

                          Unlock Next

                          <ArrowRight
                            size={
                              18
                            }
                          />

                        </button>

                      )}

                    </motion.div>

                  );

                }
              )}

            </motion.div>

          )}

        </AnimatePresence>

        <AnimatePresence>

          {showPseudoButton && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="mt-8"
            >

              <button
                onClick={
                  generatePseudocode
                }
                disabled={
                  pseudoLoading
                }
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300"
              >

                {
                  pseudoLoading
                    ? "Generating..."
                    : "Generate Pseudocode"
                }

              </button>

            </motion.div>

          )}

        </AnimatePresence>

        <AnimatePresence>

          {pseudocode && (

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="mt-10 bg-[#030712]/90 border border-green-900/20 rounded-3xl p-5 sm:p-7 overflow-hidden"
            >

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">

                  <Code2 size={28} />

                </div>

                <div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white">

                    AI Pseudocode

                  </h2>

                  <p className="text-slate-400 mt-1 text-sm sm:text-base">

                    Step-by-step structured logic.

                  </p>

                </div>

              </div>

              <div className="bg-[#0f172a] border border-green-900/10 rounded-3xl p-4 sm:p-6 overflow-x-auto custom-scrollbar">

                <pre className="whitespace-pre-wrap text-slate-300 leading-8 text-sm sm:text-base min-w-full">

                  {pseudocode}

                </pre>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </div>

  );

};

export default LearningMode;