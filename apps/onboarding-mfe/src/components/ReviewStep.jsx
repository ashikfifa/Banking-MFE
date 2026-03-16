import { Button, Card } from "@banking-mf/ui-library";
import { StatusPill } from "./StatusPill.jsx";

function ReviewSection({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
      <p className="font-semibold uppercase tracking-[0.18em] text-primary-600">{title}</p>
      <div className="mt-4 space-y-2 text-slate-600">{children}</div>
    </div>
  );
}

export function ReviewStep({ form, documents, onBack, onSubmit }) {
  return (
    <Card className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
          Step 4
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review and submit</h2>
        <p className="mt-2 text-sm text-slate-500">
          Review all onboarding information before final submission.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ReviewSection title="Personal">
          <p>{form.personal.fullName}</p>
          <p>{form.personal.dateOfBirth}</p>
          <p>{form.personal.phone}</p>
          <p>{form.personal.email}</p>
        </ReviewSection>

        <ReviewSection title="Address">
          <p>{form.address.presentAddress}</p>
          <p>{form.address.city}</p>
          <p>{form.address.district}</p>
          <p>{form.address.postalCode}</p>
        </ReviewSection>

        <ReviewSection title="Income">
          <p>{form.income.occupation}</p>
          <p>{form.income.monthlyIncome}</p>
          <p>{form.income.companyName}</p>
        </ReviewSection>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
          <p className="font-semibold text-slate-800">NID upload status</p>
          <div className="mt-4 space-y-2 text-slate-600">
            <p>Front: {documents.nidFront?.name || "Missing"}</p>
            <p>Back: {documents.nidBack?.name || "Missing"}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
          <p className="font-semibold text-slate-800">Liveness verification</p>
          <div className="mt-4 flex items-center gap-3">
            {documents.livenessStatus === "verified" ? (
              <StatusPill label="Verified" tone="success" />
            ) : (
              <StatusPill label="Incomplete" tone="warning" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Submit onboarding</Button>
      </div>
    </Card>
  );
}
