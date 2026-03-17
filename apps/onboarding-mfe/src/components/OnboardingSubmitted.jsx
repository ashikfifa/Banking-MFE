import { Button } from "@banking-mf/ui-library";

export function OnboardingSubmitted({ form, documents, onReset }) {
  return (
    <div className="space-y-4">
      {/* success banner */}
      <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-center text-white shadow">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold">Onboarding Complete!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-80">
          {form.personal.fullName || "Customer"} is ready for the next step. The shared profile is now available in the dashboard.
        </p>
      </div>

      {/* summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">📄</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              NID Upload
            </h3>
          </div>
          <p className="text-lg font-bold text-slate-900">Front & Back</p>
          <p className="mt-1 text-sm text-green-600 font-medium">Uploaded ✓</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">🤳</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Liveness
            </h3>
          </div>
          <p className="text-lg font-bold capitalize text-slate-900">{documents.livenessStatus}</p>
          <p className="mt-1 text-sm text-green-600 font-medium">Verified ✓</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">💰</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Income
            </h3>
          </div>
          <p className="text-lg font-bold text-slate-900">{form.income.monthlyIncome}</p>
          <p className="mt-1 text-sm text-slate-500">Monthly range</p>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="secondary" onClick={onReset}>
          Start New Onboarding
        </Button>
      </div>
    </div>
  );
}
