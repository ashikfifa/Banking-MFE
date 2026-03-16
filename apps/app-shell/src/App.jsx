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
      <div className="min-h-screen">
        <AppHeader />

        <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
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
      </div>
    </BrowserRouter>
  );
}
