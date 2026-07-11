import {
  useEffect,
  useState,
  useMemo,
} from "react";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  Code2,
  Trophy,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useHandle } from "../../hooks/useHandle";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AIInsights = () => {

  const { handle } = useHandle();
  const { user } = useUser();

const [topics, setTopics] =
  useState({});
useEffect(() => {

  if (!handle) return;

  const savedTopics =
    localStorage.getItem(
      `topics-${handle}`
    );

  if (savedTopics) {

    setTopics(
      JSON.parse(savedTopics)
    );

  }

}, [handle]);

  const [loading, setLoading] = useState(false);
  const [
    contestWeakness,
    setContestWeakness,
  ] = useState(null);

  const [
    aiInsights,
    setAiInsights,
  ] = useState([]);


  const [roadmapLoading, setRoadmapLoading] =
    useState(false);

    const [
      formattedRoadmap,
      setFormattedRoadmap,
    ] = useState(() => {

      const saved =
        localStorage.getItem(
          `roadmap-${handle}`
        )

      return saved
        ? JSON.parse(saved)
        : [];
    });
useEffect(() => {

  if (!handle) return;

  localStorage.setItem(
    `roadmap-${handle}`,
    JSON.stringify(formattedRoadmap)
  );

}, [
  formattedRoadmap,
  handle,
]);

      const [
      solvedProblems,
      setSolvedProblems,
    ] = useState(() => {

      const saved =
        localStorage.getItem(
          `solved-${handle}`
        )

      return saved
        ? JSON.parse(saved)
        : [];
    });
useEffect(() => {

  if (!handle) return;

  localStorage.setItem(
    `solved-${handle}`,
    JSON.stringify(solvedProblems)
  );

}, [
  solvedProblems,
  handle,
]);
  useEffect(() => {

    if (!handle) return;

    const fetchInsights = async () => {

setAiInsights([]);


setContestWeakness(null);

      try {

        setLoading(true);

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
          localStorage.setItem(
  `topics-${handle}`,
  JSON.stringify(topicCounts)
);
          const contestResponse =
  await fetch(
    `https://codeforces.com/api/user.rating?handle=${handle}`
  );

const contestData =
  await contestResponse.json();

if (
  contestData.status === "OK"
) {

  analyzeContestWeakness(
    contestData.result
  );

}

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchInsights();

  }, [handle]);
      useEffect(() => {

      if (!handle) return;

      const loadSavedProgress =
        async () => {

          try {

            const response =
              await fetch(
                `${API_BASE_URL}/api/progress/load?handle=${handle}`
              );

            const data =
              await response.json();

            if (
              data.success &&
              data.progress
            ) {

              setSolvedProblems(
                data.progress
                  .solvedProblems || []
              );

              setFormattedRoadmap(
                data.progress
                  .roadmap || []
              );

            }

          } catch (error) {

            console.log(error);

          }
        };

      loadSavedProgress();

    }, [handle]);

const weakTopics = useMemo(() => {

  if (
    !topics ||
    Object.keys(topics).length === 0
  ) return [];

  const sortedTopics =
    Object.entries(topics)
      .sort(
        (a, b) => a[1] - b[1]
      );

  const weakest =
    sortedTopics
      .slice(0, 10);

  const contestWeaknessTopics = [];

  if (
    contestWeakness?.hugeDrops > 1
  ) {

    contestWeaknessTopics.push([
      "contest-performance",
      0,
    ]);

  }

  if (
    contestWeakness?.avgRank > 3000
  ) {

    contestWeaknessTopics.push([
      "speed-and-accuracy",
      0,
    ]);

  }

  return [
    ...weakest,
    ...contestWeaknessTopics,
  ];

}, [
  topics,
  contestWeakness,
]);
  const analyzeContestWeakness = (
  contests
) => {

  if (!contests.length) return;

  let negativeContests = 0;

  let hugeDrops = 0;

  let avgRank = 0;

  contests.forEach((contest) => {

    const diff =
      contest.newRating -
      contest.oldRating;

    avgRank += contest.rank;

    if (diff < 0) {

      negativeContests++;

    }

    if (diff < -50) {

      hugeDrops++;

    }

  });

  avgRank = Math.floor(
    avgRank / contests.length
  );

  setContestWeakness({
    negativeContests,
    hugeDrops,
    avgRank,
  });

};

  const parseRoadmap = (
    text
  ) => {

    const topics =
      text
        .split("### Topic:")
        .filter(Boolean);

    return topics.map(
      (topicBlock) => {

        const lines =
          topicBlock
            .split("\n")
            .map((line) =>
              line.trim()
            );

        const title =
          lines[0];

        const getSection = (
          section
        ) => {

          const start =
            lines.findIndex(
              (line) =>
                line.includes(
                  section
                )
            );

          if (start === -1)
            return [];

          const data = [];

          for (
            let i = start + 1;
            i < lines.length;
            i++
          ) {

            const line =
              lines[i];

            if (
              line.endsWith(":") &&
              !line.startsWith("-") &&
              !line.match(
                /^\d+\./
              ) &&
              !line.startsWith(
                "https"
              )
            ) {
              break;
            }

            if (line) {
              data.push(line);
            }
          }

          return data;
        };

        return {

              title,

              theory:
                getSection(
                  "Theory"
                ),

              algorithms:
                getSection(
                  "Important Algorithms"
                ),

              concepts:
                getSection(
                  "Key Concepts"
                ),

              problems:
                getSection(
                  "Codeforces Problems"
                ).filter(
                  (item) =>
                    !item.startsWith(
                      "https"
                    )
                ),

              tips:
                getSection(
                  "Practice Tips"
                ),

              advice:
                getSection(
                  "Contest Advice"
                ),
            };
      }
    );
  };

  const generateRoadmap = async () => {

    try {

      setRoadmapLoading(true)

      const response = await fetch(
        `${API_BASE_URL}/api/ai/roadmap`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: user?.id,
            weakTopics:
              weakTopics.map(
                ([topic]) => topic
              ),
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {

        const parsed =
          parseRoadmap(
            data.roadmap
          );

        setFormattedRoadmap(parsed);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setRoadmapLoading(false);

    }
  };

  const getProblemLink = (
    
    problem
  ) => {

    const match =
      problem.match(
        /(\d+)([A-Z]\d*)?/
      );

    if (!match) return "#";

    const contestId =
      match[1];

    const index =
      problem.match(
        /[A-Z]\d*/
      )?.[0];

    if (!contestId || !index)
      return "#";

    return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
  };
  const generateAIInsights = () => {

  const insights = [];

  if (
    contestWeakness?.negativeContests > 3
  ) {

    insights.push(
      "You are losing rating frequently in contests."
    );

  }

  if (
    contestWeakness?.hugeDrops > 1
  ) {

    insights.push(
      "Your contest performance is inconsistent."
    );

  }

  if (
    contestWeakness?.avgRank > 3000
  ) {

    insights.push(
      "Your average contest rank is low. Focus on solving easier problems faster."
    );

  }


  if (weakTopics.length > 0) {

    insights.push(
      `${weakTopics[0][0]} is currently your weakest topic.`
    );

    insights.push(
      `You should prioritize ${weakTopics[0][0]} and ${weakTopics[1]?.[0]} practice.`
    );

  }

  if (
    weakTopics.length >= 5
  ) {

    insights.push(
      "You are struggling across multiple problem-solving areas."
    );

  }

  if (insights.length === 0) {

    insights.push(
      "Your competitive programming performance looks stable."
    );

  }

  setAiInsights(insights);

};
useEffect(() => {

  generateAIInsights();

}, [
  contestWeakness,
  weakTopics,
]);
  const downloadPDF = async() => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(22);
    doc.text("CodeArc Personalized Roadmap", 20, y);
    y += 20;
    formattedRoadmap.forEach((topic, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(18);
      doc.text(`${index + 1}. ${topic.title}`, 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.text("Theory:", 20, y);
      y += 8;
      topic.theory.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });
      y += 4;
      doc.text("Algorithms:", 20, y);
      y += 8;
      topic.algorithms.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });
      y += 4;
      doc.text("Problems:", 20, y);
      y += 8;
      topic.problems.forEach((item) => {
        const clean = item.replace(/https?:\/\/\S+/g, "").trim();
        doc.text(`• ${clean}`, 25, y);
        y += 7;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
      y += 15;
    });
    doc.save("CodeArc-Roadmap.pdf");
  };
      const totalProblems =
          formattedRoadmap.reduce(
            (acc, topic) =>
              acc +
              topic.problems.length,
            0
          );

        const solvedCount =
          solvedProblems.length;

        const completionPercentage =
          totalProblems
            ? Math.floor(
                (solvedCount /
                  totalProblems) *
                  100
              )
            : 0;

        useEffect(() => {

          if (!handle) return;

          const saveProgress =
            async () => {

              try {

                await fetch(
                  `${API_BASE_URL}/api/progress/save`,
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({

                      handle,

                      solvedProblems,

                      weakTopics: [

  ...weakTopics.map(
    ([topic]) => topic
  ),

  ...(contestWeakness?.hugeDrops > 1
    ? ["contest-performance"]
    : []),

],

                      roadmap:
                        formattedRoadmap,

                      completion:
                        completionPercentage,

                    }),
                  }
                );

              } catch (error) {

                console.log(error);

              }
            };

          saveProgress();

        }, [
          handle,
          solvedProblems,
          formattedRoadmap,
          completionPercentage,
        ]);


return (
  <div className="w-full overflow-hidden px-3 sm:px-5 lg:px-8 py-6 sm:py-0">

    {!handle ? (

      <div className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-6 sm:p-10 mt-6 text-center">

        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          No Handle Connected
        </h2>

        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Connect your Codeforces handle first.
        </p>

      </div>

    ) : loading ? (

      <div className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-6 sm:p-10 mt-6 text-center">

        <div className="flex justify-center">

          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

        </div>

        <p className="text-slate-400 mt-6">
          Loading Insights...
        </p>

      </div>

    ) : (

      <>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6 items-start">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="xl:col-span-4 bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 sm:p-7 flex flex-col h-[628px]"
          >

            <div className="flex items-start sm:items-center gap-4">

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0">

                <AlertTriangle size={26} />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Weak Topics
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Topics needing improvement.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-8 overflow-y-auto pr-2 flex-1 custom-scrollbar max-h-[400px] xl:max-h-none">

              {weakTopics.length === 0 ? (

  <div className="flex items-center justify-center h-full py-16 text-center">

    <p className="text-slate-500 text-sm sm:text-base">
      No weak topics detected yet.
    </p>

  </div>

) : weakTopics.map(
                ([topic, count], index) => (

                  <div
                    key={index}
                    className="bg-[#0f172a] border border-cyan-900/10 rounded-2xl p-4 flex items-center justify-between gap-4"
                  >

                    <span className="capitalize text-white break-words text-sm sm:text-base">

                      {topic}

                    </span>

                    <span className="text-red-400 font-semibold flex-shrink-0">

                      {count}

                    </span>

                  </div>

                )
              )}

            </div>

          </motion.div>

          <div className="xl:col-span-8 flex flex-col gap-6">

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-[#030712]/90 border border-purple-900/20 rounded-3xl p-5 sm:p-8 flex flex-col h-[410px]"
            >

              <div className="flex items-start sm:items-center gap-4">

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">

                  <Target size={26} />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    AI Insights
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    AI-generated performance analysis.
                  </p>

                </div>

              </div>

              <div className="space-y-4 mt-8 overflow-y-auto pr-2 flex-1 custom-scrollbar max-h-[280px] xl:max-h-none">

                {aiInsights.length === 0 ? (

  <div className="flex items-center justify-center h-full py-16 text-center">

    <p className="text-slate-500 text-sm sm:text-base">
      No AI insights available.
    </p>

  </div>

) : aiInsights.map(
                  (insight, index) => (

                    <div
                      key={index}
                      className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 text-purple-300 text-sm sm:text-base"
                    >

                      {insight}

                    </div>

                  )
                )}

              </div>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 sm:p-7"
            >

              <div className="flex items-start sm:items-center gap-4">

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">

                  <Target size={26} />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    AI Learning Paths
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    Personalized topic roadmap.
                  </p>

                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  onClick={generateRoadmap}
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl font-medium transition text-white"
                >

                  {roadmapLoading
                    ? "Generating..."
                    : "Generate Roadmap"}

                </button>

                {formattedRoadmap.length > 0 && (

                  <button
                    onClick={downloadPDF}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-medium transition text-white"
                  >

                    Download PDF

                  </button>

                )}

              </div>

            </motion.div>

          </div>

        </div>

        {formattedRoadmap.length > 0 && (

          <div className="mt-10 space-y-8">

            {formattedRoadmap.map(
              (topic, index) => (

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
                  className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 sm:p-8 overflow-hidden"
                >

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                    <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 break-words leading-tight">

                      {topic.title}

                    </h2>

                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">

                      {index + 1}

                    </div>

                  </div>

                  <div className="mt-10">

                    <div className="flex items-center gap-3">

                      <BookOpen
                        size={20}
                        className="text-yellow-400"
                      />

                      <h3 className="text-xl font-semibold text-white">
                        Theory
                      </h3>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">

                      {topic.theory.map(
                        (item, i) => (

                          <div
                            key={i}
                            className="bg-[#0f172a] border border-cyan-900/10 rounded-2xl p-4 text-slate-300 text-sm sm:text-base break-words"
                          >
                            {item}
                          </div>

                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-10">

                    <div className="flex items-center gap-3">

                      <Code2
                        size={20}
                        className="text-cyan-400"
                      />

                      <h3 className="text-xl font-semibold text-white">
                        Algorithms
                      </h3>

                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">

                      {topic.algorithms.map(
                        (item, i) => (

                          <span
                            key={i}
                            className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-xl text-sm break-words"
                          >
                            {item}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-10">

                    <h3 className="text-xl font-semibold text-white">
                      Key Concepts
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-5">

                      {topic.concepts.map(
                        (item, i) => (

                          <span
                            key={i}
                            className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl text-sm break-words"
                          >
                            {item}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-10">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <h3 className="text-xl font-semibold text-white">
                        Progress
                      </h3>

                      <span className="text-cyan-400 font-medium text-sm sm:text-base">

                        {
                          topic.problems.filter(
                            (problem) =>
                              solvedProblems.includes(
                                problem
                              )
                          ).length
                        }
                        /
                        {topic.problems.length}
                        {" "}Solved

                      </span>

                    </div>

                    <div className="w-full h-4 bg-[#0f172a] rounded-full overflow-hidden mt-5">

                      <div
                        className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (
                              topic.problems.filter(
                                (problem) =>
                                  solvedProblems.includes(
                                    problem
                                  )
                              ).length /
                              topic.problems.length
                            ) * 100
                          }%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  <div className="mt-10">

                    <div className="flex items-center gap-3">

                      <Trophy
                        size={20}
                        className="text-blue-400"
                      />

                      <h3 className="text-xl font-semibold text-white">
                        Codeforces Problems
                      </h3>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                      {topic.problems.map(
                        (item, i) => {

                          const solved =
                            solvedProblems.includes(
                              item
                            );

                          return (

                            <div
                              key={i}
                              className={`border rounded-2xl p-4 transition overflow-hidden ${
                                solved
                                  ? "bg-cyan-500/10 border-cyan-500"
                                  : "bg-[#0f172a] border-cyan-900/20"
                              }`}
                            >

                              <a
                                href={getProblemLink(item)}
                                target="_blank"
                                rel="noreferrer"
                                className={`block text-base md:text-lg font-medium break-words transition ${
                                  solved
                                    ? "text-cyan-400"
                                    : "text-white hover:text-cyan-400"
                                }`}
                              >

                                {item
                                  .replace(
                                    /https?:\/\/\S+/g,
                                    ""
                                  )
                                  .trim()}

                              </a>

                              <button
                                onClick={() => {

                                  if (solved) {

                                    setSolvedProblems(
                                      solvedProblems.filter(
                                        (problem) =>
                                          problem !== item
                                      )
                                    );

                                  } else {

                                    setSolvedProblems([
                                      ...solvedProblems,
                                      item,
                                    ]);

                                  }

                                }}
                                className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium transition w-full sm:w-auto ${
                                  solved
                                    ? "bg-cyan-600 hover:bg-cyan-700"
                                    : "bg-[#161b22] hover:bg-cyan-600"
                                }`}
                              >

                                {solved
                                  ? "Solved"
                                  : "Mark Solved"}

                              </button>

                            </div>

                          );
                        }
                      )}

                    </div>

                  </div>

                  <div className="mt-10">

                    <h3 className="text-xl font-semibold text-white">
                      Practice Tips
                    </h3>

                    <div className="space-y-4 mt-5">

                      {topic.tips.map(
                        (item, i) => (

                          <div
                            key={i}
                            className="bg-[#0f172a] border border-cyan-900/10 rounded-2xl p-4 text-slate-300 text-sm sm:text-base break-words"
                          >
                            {item}
                          </div>

                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-10">

                    <h3 className="text-xl font-semibold text-white">
                      Contest Advice
                    </h3>

                    <div className="space-y-4 mt-5">

                      {topic.advice.map(
                        (item, i) => (

                          <div
                            key={i}
                            className="bg-[#0f172a] border border-cyan-900/10 rounded-2xl p-4 text-slate-300 text-sm sm:text-base break-words"
                          >
                            {item}
                          </div>

                        )
                      )}

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </>

    )}

  </div>
);
};

export default AIInsights;