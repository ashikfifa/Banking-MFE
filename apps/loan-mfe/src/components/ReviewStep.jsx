import { Button, Card } from "@banking-mf/ui-library";

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value || "—"}</span>
    </div>
  );
}

export function ReviewStep({ selectedProduct, personal, onBack, onSubmit, formatCurrency }) {
  return (
    <div className="space-y-4">
      {/* section header */}
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            3
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
            <p className="text-sm text-slate-500">
              Verify all details before submitting your application.
            </p>
          </div>
        </div>
      </div>

      {/* review panels */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* selected loan */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🏦</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Selected Loan
            </h3>
          </div>
          <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-lg font-bold text-blue-700">
              {selectedProduct?.name || "Not selected"}
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            <ReviewRow label="Interest Rate" value={selectedProduct?.interestRate} />
            <ReviewRow label="Maximum Amount" value={formatCurrency(selectedProduct?.maxAmount)} />
            <ReviewRow label="Requested Amount" value={personal.loanAmount || "Not provided"} />
            <ReviewRow label="Tenure" value={personal.loanTenure || "Not provided"} />
          </div>
        </div>

        {/* applicant info */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">👤</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Applicant Details
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            <ReviewRow label="Full Name" value={personal.fullName} />
            <ReviewRow label="Phone" value={personal.phone} />
            <ReviewRow label="Email" value={personal.email} />
            <ReviewRow label="Monthly Income" value={personal.monthlyIncome} />
          </div>
        </div>
      </div>

      {/* disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
        ⚠️ By submitting, you confirm that all provided information is accurate and complete.
      </div>

      {/* action buttons */}
      <div className="flex flex-wrap justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onSubmit}>Submit Application ✓</Button>
      </div>
    </div>
  );
}
