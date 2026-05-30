import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RatingChart = ({
  handle,
}) => {

  const [
    ratingData,
    setRatingData,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {

    if (!handle) return;

    const fetchRating =
      async () => {

        try {

          setLoading(true);

          const response =
            await fetch(
              `https://codeforces.com/api/user.rating?handle=${handle}`
            );

          const data =
            await response.json();

          if (
            data.status === "OK"
          ) {

            const formatted =
              data.result.map(
                (contest) => ({

                  contest:
                    contest.contestName,

                  rating:
                    contest.newRating,

                })
              );

            setRatingData(
              formatted
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchRating();

  }, [handle]);

  return (

    <div className="bg-[#0d1117] border border-green-900/20 rounded-3xl p-5 md:p-8 mt-8 overflow-hidden">

      <div className="mb-8">

        <h2 className="text-2xl md:text-3xl font-bold text-white">

          Rating Analytics

        </h2>

        <p className="text-slate-500 mt-2 text-sm md:text-base">

          Track your Codeforces
          rating growth.

        </p>

      </div>

      {loading ? (

        <p className="text-slate-500">

          Loading chart...

        </p>

      ) : (

        <div className="w-full h-[300px] md:h-[400px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={ratingData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 10,
              }}
            >

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
                width={40}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#0d1117",

                  border:
                    "1px solid #14532d",

                  borderRadius:
                    "16px",

                  color: "white",
                }}
              />

              <Line
                type="monotone"
                dataKey="rating"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );
};

export default RatingChart;