import { Bell, Menu } from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Topbar = ({
  setMobileOpen,
}) => {

  const { user } = useUser();

  return (

    <header className="fixed top-0 left-0 md:left-[270px] right-0 z-40 bg-[#030712]/90 backdrop-blur-2xl border-b border-cyan-900/20">

      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5">

        <div className="flex items-center gap-4 min-w-0">

          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="md:hidden w-11 h-11 rounded-2xl bg-[#0f172a] border border-cyan-900/20 flex items-center justify-center text-white"
          >

            <Menu size={24} />

          </button>

          <div className="min-w-0">

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight truncate">

              Welcome,
              <span className="text-sky-400">

                {" "}
                {user?.firstName || "Coder"}

              </span>

            </h1>

            <p className="text-slate-400 mt-1 text-xs sm:text-sm truncate">

              AI-powered coding analytics dashboard.

            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">

          <button className="hidden sm:flex w-11 h-11 rounded-2xl bg-[#0f172a] border border-cyan-900/20 items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.06)]">

            <Bell size={18} />

          </button>

          <div className="bg-[#0f172a] border border-cyan-900/20 rounded-2xl p-1.5 sm:p-2 shadow-[0_0_20px_rgba(14,165,233,0.06)]">

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 sm:w-10 sm:h-10",
                },
              }}
            />

          </div>

        </div>

      </div>

    </header>

  );

};

export default Topbar;