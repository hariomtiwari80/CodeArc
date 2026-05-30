import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const DashboardLayout = lazy(() =>
  import("./components/dashboard/DashboardLayout")
);

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

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login/*" element={<Login />} />

        <Route path="/register/*" element={<Register />} />

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
          <Route index element={<DashboardHome />} />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="contests"
            element={<Contests />}
          />

          <Route
            path="insights"
            element={<AIInsights />}
          />

          <Route
            path="learning-mode"
            element={<LearningMode />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;