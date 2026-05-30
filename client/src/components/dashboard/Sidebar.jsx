import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  Brain,
  BookOpen,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Contests",
    path: "/dashboard/contests",
    icon: Trophy,
  },
  {
    title: "AI Insights",
    path: "/dashboard/insights",
    icon: Brain,
  },
  {
    title: "Learning Mode",
    path: "/dashboard/learning-mode",
    icon: BookOpen,
  },
];

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
}) => {

  const [
    nextContest,
    setNextContest,
  ] = useState(null);

  const [
    countdown,
    setCountdown,
  ] = useState("");

  useEffect(() => {

    const fetchContest =
      async () => {

        try {

          const response =
            await fetch(
              "https://codeforces.com/api/contest.list"
            );

          const data =
            await response.json();

          if (
            data.status === "OK"
          ) {

            const upcoming =
              data.result
                .filter(
                  (contest) =>
                    contest.phase ===
                    "BEFORE"
                )
                .sort(
                  (a, b) =>
                    a.startTimeSeconds -
                    b.startTimeSeconds
                )[0];

            if (upcoming) {

              setNextContest({
                name:
                  upcoming.name,
                startTime:
                  upcoming.startTimeSeconds,
                duration:
                  upcoming.durationSeconds,
                link:
                  "https://codeforces.com/contests",
              });

            }

          }

        } catch (error) {

          console.log(error);

        }

      };

    fetchContest();

  }, []);

  useEffect(() => {

    if (!nextContest) return;

    const updateCountdown =
      () => {

        const now =
          Math.floor(
            Date.now() / 1000
          );

        const diff =
          nextContest.startTime -
          now;

        if (diff <= 0) {

          setCountdown(
            "Contest Started"
          );

          return;

        }

        const days =
          Math.floor(
            diff / (60 * 60 * 24)
          );

        const hours =
          Math.floor(
            (
              diff %
              (60 * 60 * 24)
            ) /
              (60 * 60)
          );

        const minutes =
          Math.floor(
            (
              diff %
              (60 * 60)
            ) / 60
          );

        setCountdown(
          `${days}d ${hours}h ${minutes}m`
        );

      };

    updateCountdown();

    const timer =
      setInterval(
        updateCountdown,
        60000
      );

    return () =>
      clearInterval(timer);

  }, [nextContest]);

  return (

    <>

      {mobileOpen && (

        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        ></div>

      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[85%] max-w-[280px] bg-[#020617]/95 backdrop-blur-2xl border-r border-cyan-900/20 px-4 sm:px-5 py-6 z-50 transition-all duration-300 flex flex-col ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_70%)]"></div>

        <div className="relative flex items-center gap-3 mb-10">

          <img
            src="/logo.webp"
            alt="CodeArc Logo"
            width={44}
            height={44}
            loading="eager"
            decoding="async"
            className="
              w-10 h-10
              sm:w-11 sm:h-11
              object-contain
            "
          />

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">

            Code
            <span className="text-cyan-400">
              Arc
            </span>

          </h1>

        </div>

        <div className="relative flex flex-col gap-3">

          {menuItems.map(
            (item, index) => {

              const Icon =
                item.icon;

              return (

                <NavLink
                  key={index}
                  to={item.path}
                  end={
                    item.path ===
                    "/dashboard"
                  }
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    `group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 border ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                        : "border-transparent text-slate-400 hover:bg-[#111827] hover:text-white"
                    }`
                  }
                >

                  <Icon size={19} />

                  <span className="font-medium text-sm">

                    {item.title}

                  </span>

                </NavLink>

              );

            }
          )}

        </div>

        {nextContest && (

          <div className="relative mt-auto pt-5">

            <div className="rounded-3xl bg-[#0f172a] border border-cyan-500/20 p-4 sm:p-5">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">

                  <CalendarDays
                    size={18}
                    className="text-cyan-400"
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] sm:text-[11px] text-cyan-400 uppercase tracking-[0.25em]">

                    Next Contest

                  </p>

                  <h3 className="text-white text-sm sm:text-[15px] font-semibold mt-2 leading-5 break-words">

                    {nextContest.name}

                  </h3>

                </div>

              </div>

              <div className="mt-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 p-3 sm:p-4">

                <p className="text-slate-400 text-[11px] sm:text-xs mb-2">

                  Starts In

                </p>

                <h2 className="text-white text-lg sm:text-2xl font-bold tracking-tight break-words">

                  {countdown}

                </h2>

              </div>

              <a
                href={nextContest.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] transition-all duration-300 rounded-2xl py-3 text-sm font-semibold text-white"
              >

                Join Contest

                <ArrowUpRight size={16} />

              </a>

            </div>

          </div>

        )}

      </aside>

    </>

  );
};

export default Sidebar;