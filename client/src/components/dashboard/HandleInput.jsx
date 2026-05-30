import { useState } from "react";

const HandleInput = ({
  setHandleData,
}) => {

  const [handle, setHandle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [userData, setUserData] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!handle) return;

      try {

        setLoading(true);

        setError("");

        const response =
          await fetch(
            `https://codeforces.com/api/user.info?handles=${handle}`
          );

        const data =
          await response.json();

        if (
          data.status !== "OK"
        ) {

          throw new Error(
            "User not found"
          );

        }

        setUserData(
          data.result[0]
        );

        setHandleData(handle);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="bg-[#0d1117] border border-green-900/20 rounded-3xl p-5 md:p-8">

      <h2 className="text-2xl md:text-3xl font-bold text-white">

        Connect Codeforces

      </h2>

      <p className="text-slate-500 mt-3 leading-7 text-sm md:text-base">

        Enter your Codeforces handle
        to analyze contests, track
        progress, and generate
        AI-powered insights.

      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mt-8"
      >

        <input
          type="text"
          placeholder="Enter Codeforces Handle"
          value={handle}
          onChange={(e) =>
            setHandle(
              e.target.value
            )
          }
          className="flex-1 bg-black border border-green-900/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-500 focus:border-green-500 transition"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl font-medium transition"
        >

          {loading
            ? "Loading..."
            : "Analyze"}

        </button>

      </form>

      {error && (

        <p className="text-red-500 mt-5">

          {error}

        </p>

      )}

      {userData && (

        <div className="mt-10 bg-black border border-green-900/20 rounded-3xl p-5 md:p-6">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            <img
              src={
                userData.titlePhoto
              }
              alt="profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-green-900/20"
            />

            <div className="w-full">

              <h3 className="text-2xl md:text-3xl font-bold text-white break-all">

                {userData.handle}

              </h3>

              <p className="text-green-500 mt-2 capitalize">

                {userData.rank}

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-5">

                <div className="flex-1 bg-[#0d1117] border border-green-900/20 px-5 py-3 rounded-2xl">

                  <p className="text-slate-500 text-sm">

                    Current Rating

                  </p>

                  <h4 className="text-2xl font-bold text-green-500 mt-2">

                    {
                      userData.rating ||
                      "N/A"
                    }

                  </h4>

                </div>

                <div className="flex-1 bg-[#0d1117] border border-green-900/20 px-5 py-3 rounded-2xl">

                  <p className="text-slate-500 text-sm">

                    Max Rating

                  </p>

                  <h4 className="text-2xl font-bold text-green-500 mt-2">

                    {
                      userData.maxRating ||
                      "N/A"
                    }

                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default HandleInput;