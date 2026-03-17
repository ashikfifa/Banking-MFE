import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { RemotePanel } from "./components/RemotePanel.jsx";

const LoanApp = lazy(() => import("loan-mfe/App"));
const OnboardingApp = lazy(() => import("onboarding-mfe/App"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <AppHeader />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/onboarding"
              element={
                <RemotePanel
                  title="Customer Onboarding"
                  description="Wizard-based KYC flow with shared document upload and dummy liveness verification."
                >
                  <OnboardingApp />
                </RemotePanel>
              }
            />
            <Route
              path="/loan"
              element={
                <RemotePanel
                  title="Loan Application"
                  description="Multi-step loan product selection and application flow powered by the shared store."
                >
                  <LoanApp />
                </RemotePanel>
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
          © 2026 Copyright By BRAC Bank PLC
        </footer>
      </div>
    </BrowserRouter>
  );
}
