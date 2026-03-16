import { Button, Card } from "@banking-mf/ui-library";

export function ReviewStep({ selectedProduct, personal, onBack, onSubmit, formatCurrency }) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
          Step 3
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review and submit</h2>
        <p className="mt-2 text-sm text-slate-500">
          Confirm the selected product and applicant details before submitting.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-gray-100 p-4 shadow">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Selected loan
          </p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">
            {selectedProduct?.name || "Not selected"}
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Interest rate</dt>
              <dd className="font-medium text-slate-700">{selectedProduct?.interestRate}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Maximum amount</dt>
              <dd className="font-medium text-slate-700">
                {formatCurrency(selectedProduct?.maxAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Requested amount</dt>
              <dd className="font-medium text-slate-700">
                {personal.loanAmount ? formatCurrency(personal.loanAmount) : "Not provided"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 shadow">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Applicant information
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Full name</dt>
              <dd className="font-medium text-slate-700">{personal.fullName}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Phone</dt>
              <dd className="font-medium text-slate-700">{personal.phone}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Email</dt>
              <dd className="font-medium text-slate-700">{personal.email}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Monthly income</dt>
              <dd className="font-medium text-slate-700">{personal.monthlyIncome}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Submit application</Button>
      </div>
    </Card>
  );
}
