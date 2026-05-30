import { useEffect, useState } from "react";

import { useHandle } from "../../hooks/useHandle";

const DashboardHome = () => {

  const {
    handle,
    setHandle,
  } = useHandle();

  const [
    inputHandle,
    setInputHandle,
  ] = useState(handle);

  const [
    userData,
    setUserData,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const fetchUser =
    async () => {

      if (!inputHandle)
        return;

      try {

        setLoading(true);

        const response =
          await fetch(
            `https://codeforces.com/api/user.info?handles=${inputHandle}`
          );

        const data =
          await response.json();

        if (
          data.status === "OK"
        ) {

          setUserData(
            data.result[0]
          );

          setHandle(
            inputHandle
          );

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

      const loadUser =
        async () => {

          try {

            const response =
              await fetch(
                `https://codeforces.com/api/user.info?handles=${handle}`
              );

            const data =
              await response.json();

            if (
              data.status === "OK"
            ) {

              setUserData(
                data.result[0]
              );

            }

          } catch (error) {

            console.log(error);

          }
        };

      loadUser();

    }

  }, []);

  return (

    <div className="w-full max-w-full overflow-x-hidden pb-10">

      <div className="relative bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 md:p-8 mt-6 overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_70%)]"></div>

        <div className="relative">

          <h2 className="text-2xl font-bold text-white">

            Connect Codeforces

          </h2>

          <p className="text-slate-400 mt-3 text-sm md:text-base">

            Enter your Codeforces handle to fetch profile analytics.

          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-8 w-full">

            <input
              type="text"
              placeholder="Enter Codeforces Handle"
              value={inputHandle}
              onChange={(e) =>
                setInputHandle(
                  e.target.value
                )
              }
              className="w-full flex-1 bg-[#0f172a] border border-cyan-900/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-500 focus:border-cyan-500 transition min-w-0"
            />

            <button
              onClick={fetchUser}
              className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded-2xl font-medium transition-all duration-300 text-white shadow-[0_0_25px_rgba(14,165,233,0.2)] flex-shrink-0"
            >

              {loading
                ? "Loading..."
                : "Analyze"}

            </button>

          </div>

        </div>

      </div>

      {userData && (

        <>

          <div className="relative bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 md:p-8 mt-10 overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.06),transparent_70%)]"></div>

            <div className="relative flex flex-col items-start md:flex-row md:items-center gap-6 w-full">

              <img
                src={
                  userData.titlePhoto
                }
                alt="profile"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-cyan-900/20 object-cover flex-shrink-0"
              />

              <div className="min-w-0 w-full">

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">

                  Welcome,

                </h2>

                <p className="text-cyan-400 text-xl sm:text-3xl md:text-4xl font-bold mt-2 break-all leading-tight">

                  {userData.handle}

                </p>

                <p className="text-slate-400 mt-4 capitalize text-sm md:text-base break-words">

                  {userData.rank}

                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 w-full">

            <div className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 md:p-6">

              <p className="text-slate-400 text-sm md:text-base">

                Current Rating

              </p>

              <h3 className="text-3xl md:text-4xl font-bold text-cyan-400 mt-4 break-words">

                {
                  userData.rating ||
                  "N/A"
                }

              </h3>

            </div>

            <div className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 md:p-6">

              <p className="text-slate-400 text-sm md:text-base">

                Max Rating

              </p>

              <h3 className="text-3xl md:text-4xl font-bold text-cyan-400 mt-4 break-words">

                {
                  userData.maxRating ||
                  "N/A"
                }

              </h3>

            </div>

            <div className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 md:p-6">

              <p className="text-slate-400 text-sm md:text-base">

                Rank

              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mt-4 capitalize break-words">

                {
                  userData.rank ||
                  "N/A"
                }

              </h3>

            </div>

            <div className="bg-[#030712]/90 border border-cyan-900/20 rounded-3xl p-5 md:p-6">

              <p className="text-slate-400 text-sm md:text-base">

                Max Rank

              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mt-4 capitalize break-words">

                {
                  userData.maxRank ||
                  "N/A"
                }

              </h3>

            </div>

          </div>

        </>

      )}

    </div>

  );
};

export default DashboardHome;