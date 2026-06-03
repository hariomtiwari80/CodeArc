import {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import { useHandle } from "../../hooks/useHandle";

const Contests = () => {

  const {
    handle,
    setHandle,
  } = useHandle();

  const [inputHandle, setInputHandle] =
    useState(handle);

  const [ratingData, setRatingData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [contestWeakness, setContestWeakness] =
    useState(null);

  const [weakTopics, setWeakTopics] =
    useState([]);

  const analyzeContestWeakness = (data) => {

    if (!data.length) return;

    let negativeContests = 0;

    let hugeDrops = 0;

    let avgRank = 0;

    data.forEach((contest) => {

      const diff =
        contest.newRating - contest.oldRating;

      avgRank += contest.rank;

      if (diff < 0) {

        negativeContests++;

      }

      if (diff < -50) {

        hugeDrops++;

      }

    });

    avgRank = Math.floor(avgRank / data.length);

    const weakness = [];

    if (negativeContests >= 3) {

      weakness.push(
        "Frequent rating drops in contests"
      );

    }

    if (hugeDrops >= 2) {

      weakness.push(
        "Large performance inconsistency"
      );

    }

    if (avgRank > 3000) {

      weakness.push(
        "Low average contest ranking"
      );

    }

    if (weakness.length === 0) {

      weakness.push(
        "Contest performance looks stable"
      );

    }

    setContestWeakness({
      negativeContests,
      hugeDrops,
      avgRank,
      weakness,
    });

  };

  const analyzeWeakTopics = (submissions) => {

    const tagMap = {};

    submissions.forEach((sub) => {

      if (
        sub.verdict !== "OK" &&
        sub.problem?.tags
      ) {

        sub.problem.tags.forEach((tag) => {

          tagMap[tag] =
            (tagMap[tag] || 0) + 1;

        });

      }

    });

    const sorted = Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 9)
      .map(([tag, count]) => ({
        tag,
        count,
      }));

    setWeakTopics(sorted);

  };

  const fetchContests = async () => {

    if (!inputHandle) return;

    try {

      setLoading(true);

      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${inputHandle}`
      );

      const data = await response.json();

      if (data.status === "OK") {

        const formatted =
          data.result.map((contest) => ({
            contest: contest.contestName,
            rating: contest.newRating,
            rank: contest.rank,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
          }));

        setRatingData(formatted);

        analyzeContestWeakness(formatted);

      }

      const submissionResponse =
        await fetch(
          `https://codeforces.com/api/user.status?handle=${inputHandle}`
        );

      const submissionData =
        await submissionResponse.json();

      if (submissionData.status === "OK") {

        analyzeWeakTopics(
          submissionData.result
        );

      }

      setHandle(inputHandle);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (handle) {

      setInputHandle(handle);

      fetchContests();

    }

  }, []);

  return (

    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">


      {loading ? (

        <div className="flex items-center justify-center py-24">

          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

        </div>

      ) : ratingData.length > 0 ? (

        <div className="space-y-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden rounded-3xl border border-cyan-900/20 bg-[#030712]/90 p-5 sm:p-8 min-w-0"
        >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_70%)]"></div>

            <div className="relative">

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Rating Graph
              </h2>

              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Rating growth for
                <span className="text-cyan-400">
                  {" "}@{handle}
                </span>
              </p>

              <div className="w-full min-w-0 h-[300px] sm:h-[450px] mt-8 overflow-hidden">

              <ResponsiveContainer
                width="99%"
                height={450}
              >

                  <LineChart data={ratingData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1f2937"
                    />

                    <XAxis
                      dataKey="contest"
                      hide
                    />

                    <YAxis
                      stroke="#94a3b8"
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          "#030712",
                        border:
                          "1px solid rgba(14,165,233,0.2)",
                        borderRadius: "16px",
                        color: "white",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#22d3ee"
                      strokeWidth={3}
                      dot={false}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

          </motion.div>

          {contestWeakness && (

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative overflow-hidden rounded-3xl border border-red-900/20 bg-[#030712]/90 p-5 sm:p-8"
            >

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_70%)]"></div>

              <div className="relative">

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Contest Weakness Analysis
                </h2>

                <p className="text-slate-400 mt-2 text-sm sm:text-base">
                  AI-detected weaknesses from contests.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

                  <div className="bg-[#0f172a] rounded-3xl p-6 border border-red-500/10">

                    <p className="text-slate-400 text-sm">
                      Negative Contests
                    </p>

                    <h3 className="text-4xl font-bold text-red-400 mt-4">
                      {
                        contestWeakness.negativeContests
                      }
                    </h3>

                  </div>

                  <div className="bg-[#0f172a] rounded-3xl p-6 border border-yellow-500/10">

                    <p className="text-slate-400 text-sm">
                      Huge Rating Drops
                    </p>

                    <h3 className="text-4xl font-bold text-yellow-400 mt-4">
                      {
                        contestWeakness.hugeDrops
                      }
                    </h3>

                  </div>

                  <div className="bg-[#0f172a] rounded-3xl p-6 border border-cyan-500/10">

                    <p className="text-slate-400 text-sm">
                      Average Rank
                    </p>

                    <h3 className="text-4xl font-bold text-cyan-400 mt-4 break-all">
                      #
                      {
                        contestWeakness.avgRank
                      }
                    </h3>

                  </div>

                </div>

                <div className="mt-8">

                  <h3 className="text-xl font-semibold text-white">
                    Weakness Summary
                  </h3>

                  <div className="flex flex-col gap-4 mt-5">

                    {contestWeakness.weakness.map(
                      (item, index) => (

                      <div
                        key={index}
                        className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-red-300 text-sm sm:text-base"
                      >
                        {item}
                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </motion.div>

          )}

          {weakTopics.length > 0 && (

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative overflow-hidden rounded-3xl border border-yellow-900/20 bg-[#030712]/90 p-5 sm:p-8"
            >

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.08),transparent_70%)]"></div>

              <div className="relative">

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Weak Topics
                </h2>

                <p className="text-slate-400 mt-2 text-sm sm:text-base">
                  Topics where you struggle most.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

                  {weakTopics.map(
                    (topic, index) => (

                    <div
                      key={index}
                      className="bg-[#0f172a] border border-yellow-500/10 rounded-3xl p-6"
                    >

                      <p className="text-yellow-400 text-lg font-semibold capitalize break-words">
                        {topic.tag}
                      </p>

                      <p className="text-slate-400 mt-4 text-sm sm:text-base">

                        Failed Attempts:

                        <span className="text-white ml-2 font-medium">
                          {topic.count}
                        </span>

                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </motion.div>

          )}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative overflow-hidden rounded-3xl border border-cyan-900/20 bg-[#030712]/90 p-5 sm:p-8"
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_70%)]"></div>

            <div className="relative">

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Contest History
              </h2>

              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Recent contest performances.
              </p>

              <div className="overflow-x-auto overflow-y-auto max-h-[520px] mt-8 rounded-2xl custom-scrollbar">

                <table className="w-full min-w-[700px]">

                  <thead>

                    <tr className="border-b border-cyan-900/20 text-left">

                      <th className="pb-4 text-slate-400 font-medium">
                        Contest
                      </th>

                      <th className="pb-4 text-slate-400 font-medium">
                        Rank
                      </th>

                      <th className="pb-4 text-slate-400 font-medium">
                        Old Rating
                      </th>

                      <th className="pb-4 text-slate-400 font-medium">
                        New Rating
                      </th>

                      <th className="pb-4 text-slate-400 font-medium">
                        Change
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {ratingData
                      .slice()
                      .reverse()
                      .map((contest, index) => (

                      <tr
                        key={index}
                        className="border-b border-cyan-900/10"
                      >

                        <td className="py-5 text-white pr-4">
                          {contest.contest}
                        </td>

                        <td className="py-5 text-slate-300">
                          #{contest.rank}
                        </td>

                        <td className="py-5 text-slate-300">
                          {contest.oldRating}
                        </td>

                        <td className="py-5 text-slate-300">
                          {contest.newRating}
                        </td>

                        <td
                          className={`py-5 font-semibold ${
                            contest.newRating -
                              contest.oldRating >
                            0
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {contest.newRating -
                            contest.oldRating >
                          0
                            ? "+"
                            : ""}

                          {contest.newRating -
                            contest.oldRating}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </motion.div>

        </div>

      ) : (

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <h3 className="text-2xl sm:text-3xl font-bold text-white">

            No Contest Data Found

          </h3>

          <p className="text-slate-500 mt-3 max-w-md">

            Enter your Codeforces handle to generate contest analytics and insights.

          </p>

          <button
            onClick={fetchContests}
            className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.2)]"
          >

            Generate Analysis

          </button>

        </div>

      )}

    </div>

  );

};

export default Contests;