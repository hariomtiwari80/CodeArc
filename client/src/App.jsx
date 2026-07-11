import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import { lazy, Suspense } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./components/dashboard/DashboardLayout";

const DashboardHome = lazy(() =>
  import("./pages/dashboard/DashboardHome")
);

const Analytics = lazy(() =>
  import("./pages/dashboard/Analytics")
);

const Contests = lazy(() =>
  import("./pages/dashboard/Contests")
);

const AIInsights = lazy(() =>
  import("./pages/dashboard/AIInsights")
);

const LearningMode = lazy(() =>
  import("./pages/dashboard/LearningMode")
);

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#030712]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>

      <p className="text-slate-300 text-lg">
        Loading...
      </p>
    </div>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login/*"
        element={<Login />}
      />

      <Route
        path="/register/*"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <DashboardLayout />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <DashboardHome />
            </Suspense>
          }
        />

        <Route
          path="analytics"
          element={
            <Suspense fallback={<Loader />}>
              <Analytics />
            </Suspense>
          }
        />

        <Route
          path="contests"
          element={
            <Suspense fallback={<Loader />}>
              <Contests />
            </Suspense>
          }
        />

        <Route
          path="insights"
          element={
            <Suspense fallback={<Loader />}>
              <AIInsights />
            </Suspense>
          }
        />

        <Route
          path="learning-mode"
          element={
            <Suspense fallback={<Loader />}>
              <LearningMode />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;