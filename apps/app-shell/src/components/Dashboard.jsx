import { NavLink } from "react-router-dom";
import { Button, Card } from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";

function formatTimestamp(value) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString();
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString();
}

/* ── tiny status badge ─────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    completed: { bg: "bg-green-100 text-green-700", label: "Completed" },
    submitted: { bg: "bg-green-100 text-green-700", label: "Submitted" },
    pending:   { bg: "bg-amber-100 text-amber-700",     label: "Pending" },
    active:    { bg: "bg-blue-100 text-blue-700",        label: "In Progress" },
    none:      { bg: "bg-slate-100 text-slate-500",      label: "Not Started" },
  };
  const s = map[status] || map.none;
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${s.bg}`}>
      {s.label}
    </span>
  );
}

/* ── metric card shown in the KPI row ──────────────────── */
function MetricCard({ label, value, icon, accent = false }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border p-6 transition-shadow hover:shadow-md",
        accent ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <span className="text-2xl">
          {icon}
        </span>
      </div>
    </div>
  );
}

/* ── data row used in tables ───────────────────────────── */
function DataRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2.5 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value || "—"}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════ */
export function Dashboard() {
  const userProfile = useBankingStore((state) => state.userProfile);
  const onboardingProgress = useBankingStore((state) => state.onboardingProgress);
  const onboardingForm = useBankingStore((state) => state.onboardingForm);
  const loanApplication = useBankingStore((state) => state.loanApplication);

  /* derive statuses */
  const onboardingStatus = onboardingProgress.isSubmitted
    ? "completed"
    : onboardingProgress.step > 1
      ? "active"
      : "pending";

  const loanStatus =
    loanApplication.status === "submitted"
      ? "submitted"
      : loanApplication.selectedProduct
        ? "active"
        : "none";

  return (
    <div className="space-y-4">
      {/* ─── welcome banner ──────────────────────────────── */}
      <div className="overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-6 text-white shadow">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-wide opacity-80">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome{userProfile.fullName ? `, ${userProfile.fullName}` : ""}
            </h1>
            <p className="max-w-lg text-sm leading-relaxed opacity-80">
              Manage onboarding workflows & loan applications from a single dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NavLink to="/onboarding">
              <Button className="!bg-white !text-black hover:!bg-blue-600 hover:!text-white">Start Onboarding</Button>
            </NavLink>
            <NavLink to="/loan">
              <Button variant="secondary" className="!border-white/40 !text-black hover:!bg-white/20 hover:!text-white">
                Apply for Loan
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* ─── KPI metrics row ─────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Onboarding"
          value={onboardingProgress.isSubmitted ? "Done" : `Step ${onboardingProgress.step}`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          accent={onboardingProgress.isSubmitted}
        />
        <MetricCard
          label="Loan Status"
          value={
            loanApplication.status === "submitted"
              ? "Submitted"
              : loanApplication.selectedProduct
                ? `Step ${loanApplication.step}`
                : "Not Started"
          }
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <MetricCard
          label="Product"
          value={loanApplication.selectedProduct?.name || "None"}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <MetricCard
          label="KYC"
          value={
            onboardingForm.documents.nidFront && onboardingForm.documents.nidBack
              ? "Verified"
              : "Pending"
          }
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          accent={!!(onboardingForm.documents.nidFront && onboardingForm.documents.nidBack)}
        />
      </div>

      {/* ─── main content area ───────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* customer profile panel */}
        <Card className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <h2 className="text-base font-semibold text-slate-900">Customer Profile</h2>
          </div>

          <div className="divide-y divide-slate-100">
            <DataRow label="Full Name" value={userProfile.fullName} />
            <DataRow label="Date of Birth" value={formatDate(userProfile.dateOfBirth)} />
            <DataRow label="Email" value={userProfile.email} />
            <DataRow label="Phone" value={userProfile.phone} />
            <DataRow label="Occupation" value={userProfile.occupation} />
            <DataRow label="Monthly Income" value={userProfile.monthlyIncome} />
          </div>
        </Card>

        {/* onboarding details panel */}
        <Card className="lg:col-span-1">
          <div className="mb-1 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            <h2 className="text-base font-semibold text-slate-900">Onboarding</h2>
          </div>
          <div className="mb-4">
            <StatusBadge status={onboardingStatus} />
          </div>

          <div className="divide-y divide-slate-100">
            <DataRow label="Address" value={userProfile.presentAddress} />
            <DataRow label="City" value={userProfile.city} />
            <DataRow label="District" value={userProfile.district} />
            <DataRow label="Postal Code" value={userProfile.postalCode} />
            <DataRow
              label="NID Documents"
              value={
                onboardingForm.documents.nidFront && onboardingForm.documents.nidBack
                  ? "✅ Uploaded"
                  : "Pending"
              }
            />
            <DataRow
              label="Liveness"
              value={
                onboardingForm.documents.livenessStatus
                  ? onboardingForm.documents.livenessStatus.charAt(0).toUpperCase() +
                    onboardingForm.documents.livenessStatus.slice(1)
                  : "—"
              }
            />
            <DataRow label="Submitted At" value={formatTimestamp(onboardingForm.submittedAt)} />
          </div>
        </Card>

        {/* loan application panel */}
        <Card className="lg:col-span-1">
          <div className="mb-1 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </span>
            <h2 className="text-base font-semibold text-slate-900">Loan Application</h2>
          </div>
          <div className="mb-4">
            <StatusBadge status={loanStatus} />
          </div>

          <div className="divide-y divide-slate-100">
            <DataRow
              label="Product"
              value={loanApplication.selectedProduct?.name}
            />
            <DataRow label="Applicant Email" value={loanApplication.personal.email} />
            <DataRow label="Submitted At" value={formatTimestamp(loanApplication.submittedAt)} />
          </div>

          {loanStatus === "none" && (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-gray-100 p-6 text-center">
              <p className="text-sm text-slate-500">No active loan application</p>
              <NavLink to="/loan" className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Start a new application →
              </NavLink>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
