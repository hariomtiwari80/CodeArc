import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import { useHandle } from "../../hooks/useHandle";

const Analytics = () => {

  const {
    handle,
    setHandle,
  } = useHandle();

  const [inputHandle, setInputHandle] =
    useState(handle);

  const [topics, setTopics] = useState({});

  const [loading, setLoading] =
    useState(false);

  const fetchAnalytics = async () => {

    if (!inputHandle) return;

    try {

      setLoading(true);

      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${inputHandle}`
      );

      const data = await response.json();

      if (data.status === "OK") {

        const solved = data.result.filter(
          (sub) => sub.verdict === "OK"
        );

        const topicCounts = {};

        solved.forEach((submission) => {

          submission.problem.tags.forEach((tag) => {

            if (topicCounts[tag]) {

              topicCounts[tag] += 1;

            } else {

              topicCounts[tag] = 1;

            }

          });

        });

        setTopics(topicCounts);

        setHandle(inputHandle);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (handle) {

      setInputHandle(handle);

      const loadAnalytics = async () => {

        try {

          const response = await fetch(
            `https://codeforces.com/api/user.status?handle=${handle}`
          );

          const data = await response.json();

          if (data.status === "OK") {

            const solved = data.result.filter(
              (sub) => sub.verdict === "OK"
            );

            const topicCounts = {};

            solved.forEach((submission) => {

              submission.problem.tags.forEach((tag) => {

                if (topicCounts[tag]) {

                  topicCounts[tag] += 1;

                } else {

                  topicCounts[tag] = 1;

                }

              });

            });

            setTopics(topicCounts);

          }

        } catch (error) {

          console.log(error);

        }
      };

      loadAnalytics();

    }

  }, []);

  const sortedTopics = Object.entries(topics)
    .sort((a, b) => b[1] - a[1]);

  return (

    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">

      {loading ? (

        <div className="flex items-center justify-center py-20">

          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

        </div>

      ) : sortedTopics.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {sortedTopics.map(
            ([topic, count], index) => {

              const progress =
                Math.min(count, 100);

              return (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                  }}
                  className="relative overflow-hidden rounded-3xl border border-cyan-900/20 bg-[#030712]/90 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(14,165,233,0.04)]"
                >

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_70%)]"></div>

                  <div className="relative">

                    <div className="flex items-start justify-between gap-4">

                      <h3 className="text-xl sm:text-2xl font-bold capitalize text-white leading-tight">

                        {topic}

                      </h3>

                      <div className="flex items-center justify-center min-w-[70px] h-[70px] rounded-2xl bg-cyan-500/10 border border-cyan-500/10">

                        <span className="text-2xl font-bold text-cyan-400">

                          {count}

                        </span>

                      </div>

                    </div>

                    <div className="mt-8">

                      <div className="w-full h-3 bg-[#111827] rounded-full overflow-hidden">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${progress}%`,
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400"
                        ></motion.div>

                      </div>

                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      {count > 150 ? (

                        <span className="text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">

                          Strong Topic

                        </span>

                      ) : count > 50 ? (

                        <span className="text-yellow-400 text-sm font-semibold bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full">

                          Medium Strength

                        </span>

                      ) : (

                        <span className="text-red-400 text-xs sm:text-sm font-semibold bg-red-500/10 border border-red-500/20 px-3 sm:px-4 py-2 rounded-2xl w-fit">

                          Needs Improvement

                        </span>

                      )}

                      <span className="text-slate-400 text-sm sm:text-base">
                        {progress}% solved
                      </span>

                    </div>

                  </div>

                </motion.div>

              );
            }
          )}

        </div>

      ) : (

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <h3 className="text-2xl font-bold text-white">

            No Analytics Found

          </h3>

          <p className="text-slate-500 mt-3 max-w-md">

            Enter your Codeforces handle to generate topic-wise insights and analytics.

          </p>

          <button
            onClick={fetchAnalytics}
            className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.2)]"
          >

            Generate Analytics

          </button>

        </div>

      )}

    </div>

  );
};

export default Analytics;