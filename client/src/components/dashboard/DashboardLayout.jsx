import { useState } from "react";

import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { Outlet } from "react-router-dom";

import {
  UserButton,
} from "@clerk/clerk-react";

const DashboardLayout = () => {

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  return (

    <div className="min-h-screen bg-black text-white flex overflow-x-hidden w-full max-w-full">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 md:ml-[270px] w-full min-w-0 overflow-x-hidden max-w-full">

        <div className="md:hidden h-[80px] border-b border-cyan-900/20 bg-[#030712]/95 backdrop-blur-2xl flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-40">

          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="text-white flex-shrink-0"
          >

            <Menu size={30} />

          </button>

          <h1 className="text-xl font-bold text-white">

            Code
            <span className="text-sky-400">
              Arc
            </span>

          </h1>

          <div className="flex-shrink-0">

            <UserButton
              afterSignOutUrl="/"
            />

          </div>

        </div>

        <div className="hidden md:block">

          <Topbar
            setMobileOpen={setMobileOpen}
          />

        </div>

        <main className="p-4 md:p-8 pt-[100px] md:pt-[120px] overflow-x-hidden w-full max-w-full">

          <Outlet />

        </main>

      </div>

    </div>

  );
};

export default DashboardLayout;