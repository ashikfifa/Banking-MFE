import { lazy, Suspense } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Button, Card, Loader } from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";

const LoanApp = lazy(() => import("loan-mfe/App"));
const OnboardingApp = lazy(() => import("onboarding-mfe/App"));

function formatTimestamp(value) {
  if (!value) {
    return "Not submitted yet";
  }

  return new Date(value).toLocaleString();
}

function Dashboard() {
  const userProfile = useBankingStore((state) => state.userProfile);
  const onboardingProgress = useBankingStore((state) => state.onboardingProgress);
  const onboardingForm = useBankingStore((state) => state.onboardingForm);
  const loanApplication = useBankingStore((state) => state.loanApplication);

  const onboardingTone = onboardingProgress.isSubmitted
    ? "text-success-300"
    : "text-white";
  const loanTone = loanApplication.status === "submitted" ? "text-success-300" : "text-white";

  return (
    <div className="space-y-6">
      <Card accent className="overflow-hidden">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Banking Micro-Frontend
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Shared onboarding and loan workflows from one app shell.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                The dashboard reads from the shared Zustand store, while onboarding and loan
                modules are lazy loaded through Vite Module Federation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <NavLink to="/onboarding">
                <Button>Start onboarding</Button>
              </NavLink>
              <NavLink to="/loan">
                <Button variant="secondary">Open loan flow</Button>
              </NavLink>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-float">
            <p className="text-sm uppercase tracking-[0.24em] text-primary-200">Live summary</p>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-slate-400">Customer</p>
                <p className="mt-1 text-lg font-semibold">
                  {userProfile.fullName || "No profile created yet"}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-slate-400">Onboarding</p>
                  <p className={["mt-1 font-semibold", onboardingTone].join(" ")}>
                    {onboardingProgress.isSubmitted ? "Completed" : `Step ${onboardingProgress.step}`}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Loan</p>
                  <p className={["mt-1 font-semibold", loanTone].join(" ")}>
                    {loanApplication.status === "submitted"
                      ? "Application submitted"
                      : loanApplication.selectedProduct
                        ? `Step ${loanApplication.step}`
                        : "Not started"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Shared state snapshot</h2>
              <p className="text-sm text-slate-500">
                Data entered in onboarding is immediately visible across the shell and loan module.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">User profile</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">Full name</dt>
                  <dd className="font-medium text-slate-700">{userProfile.fullName || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Email</dt>
                  <dd className="font-medium text-slate-700">{userProfile.email || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Phone</dt>
                  <dd className="font-medium text-slate-700">{userProfile.phone || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Monthly income</dt>
                  <dd className="font-medium text-slate-700">
                    {userProfile.monthlyIncome || "Pending"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Onboarding status</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">NID upload</dt>
                  <dd className="font-medium text-slate-700">
                    {onboardingForm.documents.nidFront && onboardingForm.documents.nidBack
                      ? "Front and back uploaded"
                      : "Pending upload"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Liveness</dt>
                  <dd className="font-medium text-slate-700 capitalize">
                    {onboardingForm.documents.livenessStatus}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Submitted</dt>
                  <dd className="font-medium text-slate-700">
                    {formatTimestamp(onboardingForm.submittedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Loan snapshot</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-slate-400">Selected product</p>
              <p className="mt-1 font-semibold text-slate-800">
                {loanApplication.selectedProduct?.name || "None selected"}
              </p>
            </div>
            <div>
              <p className="text-slate-400">Applicant email</p>
              <p className="mt-1 font-semibold text-slate-800">
                {loanApplication.personal.email || "Pending"}
              </p>
            </div>
            <div>
              <p className="text-slate-400">Submission time</p>
              <p className="mt-1 font-semibold text-slate-800">
                {formatTimestamp(loanApplication.submittedAt)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RemotePanel({ title, description, children }) {
  return (
    <Card>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            Micro frontend
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <Loader label="Loading remote module..." />
          </div>
        }
      >
        {children}
      </Suspense>
    </Card>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="border-b border-white/60 bg-white/75 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                App Shell
              </p>
              <p className="text-lg font-semibold text-slate-900">Retail Banking Platform</p>
            </div>

            <nav className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1">
              {[
                { to: "/", label: "Dashboard" },
                { to: "/onboarding", label: "Onboarding" },
                { to: "/loan", label: "Loan" }
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-white text-primary-700 shadow"
                        : "text-slate-600 hover:text-slate-900"
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

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
