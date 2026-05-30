import { useEffect, useState } from "react";

const TopicAnalysis = ({ handle }) => {

  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!handle) return;

    const fetchSubmissions = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          `https://codeforces.com/api/user.status?handle=${handle}`
        );

        const data = await response.json();

        if (data.status === "OK") {

          const solved = data.result.filter(
            (sub) =>
              sub.verdict === "OK"
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

      } finally {

        setLoading(false);

      }
    };

    fetchSubmissions();

  }, [handle]);

  const sortedTopics = Object.entries(topics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="bg-[#0d1117] border border-green-900/20 rounded-3xl p-8 mt-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Topic Analysis
        </h2>

        <p className="text-slate-500 mt-2">
          Analyze your strongest and weakest topics.
        </p>

      </div>

      {loading ? (
        <p className="text-slate-500">
          Loading topics...
        </p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {sortedTopics.map(([topic, count], index) => (

            <div
              key={index}
              className="bg-black border border-green-900/20 rounded-2xl p-5"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold capitalize text-white">
                  {topic}
                </h3>

                <span className="text-green-500 font-bold">
                  {count}
                </span>

              </div>

              <div className="w-full h-3 bg-[#161b22] rounded-full mt-5 overflow-hidden">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${Math.min(count, 100)}%`
                  }}
                ></div>

              </div>
              <p className="text-slate-500 text-sm mt-4">

                {count > 150
                  ? "Strong Topic"
                  : count > 50
                  ? "Medium Strength"
                  : "Needs Improvement"}

              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default TopicAnalysis;