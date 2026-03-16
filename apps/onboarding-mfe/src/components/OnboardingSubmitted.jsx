import { Button, Card } from "@banking-mf/ui-library";

export function OnboardingSubmitted({ form, documents, onReset }) {
  return (
    <Card className="space-y-4">
      <div className="inline-flex w-fit rounded-xl border border-green-500 bg-white px-4 py-2 text-sm font-semibold text-green-500">
        Onboarding submitted
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          {form.personal.fullName || "Customer"} is ready for the next step.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          The shared profile is now available to the loan micro frontend and visible from the app
          shell dashboard.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-gray-100 p-4 shadow">
          <p className="text-sm font-semibold text-slate-800">NID upload</p>
          <p className="mt-2 text-sm text-slate-600">Front and back uploaded</p>
        </div>
        <div className="rounded-xl bg-gray-100 p-4 shadow">
          <p className="text-sm font-semibold text-slate-800">Liveness</p>
          <p className="mt-2 text-sm capitalize text-slate-600">{documents.livenessStatus}</p>
        </div>
        <div className="rounded-xl bg-gray-100 p-4 shadow">
          <p className="text-sm font-semibold text-slate-800">Income</p>
          <p className="mt-2 text-sm text-slate-600">{form.income.monthlyIncome}</p>
        </div>
      </div>
      <Button variant="secondary" onClick={onReset}>
        Start new onboarding
      </Button>
    </Card>
  );
}
