import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./components/dashboard/DashboardLayout";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Analytics from "./pages/dashboard/Analytics";
import Contests from "./pages/dashboard/Contests";
import AIInsights from "./pages/dashboard/AIInsights";
import LearningMode from "./pages/dashboard/LearningMode";

const App = () => {
  return (
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
  );
};

export default App;