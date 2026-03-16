import { Button, Card, Input } from "@banking-mf/ui-library";

export function ApplicantDetailsStep({
  selectedProduct,
  hasProfilePrefill,
  personal,
  errors,
  onChange,
  onBack,
  onContinue,
  formatCurrency
}) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Step 2
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Applicant information</h2>
          <p className="mt-2 text-sm text-slate-500">
            Personal details can be prefilled from the onboarding micro frontend through the
            shared store.
          </p>
        </div>

        {selectedProduct ? (
          <div className="rounded-xl bg-gray-100 p-4 shadow text-sm">
            <p className="font-semibold text-blue-600">{selectedProduct.name}</p>
            <p className="text-slate-600">
              {selectedProduct.interestRate} interest, max{" "}
              {formatCurrency(selectedProduct.maxAmount)}
            </p>
          </div>
        ) : null}
      </div>

      {hasProfilePrefill ? (
        <div className="rounded-xl bg-gray-100 p-4 text-sm text-green-500 shadow">
          Applicant data has been prefilled from onboarding where available.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={personal.fullName}
          error={errors.fullName}
          onChange={(event) => onChange({ fullName: event.target.value })}
        />
        <Input
          label="Phone"
          placeholder="Enter phone number"
          value={personal.phone}
          error={errors.phone}
          onChange={(event) => onChange({ phone: event.target.value })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          value={personal.email}
          error={errors.email}
          onChange={(event) => onChange({ email: event.target.value })}
        />
        <Input
          label="Monthly Income"
          type="number"
          placeholder="Enter monthly income"
          value={personal.monthlyIncome}
          error={errors.monthlyIncome}
          onChange={(event) => onChange({ monthlyIncome: event.target.value })}
        />
        <Input
          label="Loan Amount"
          type="number"
          placeholder="Optional requested amount"
          value={personal.loanAmount}
          error={errors.loanAmount}
          onChange={(event) => onChange({ loanAmount: event.target.value })}
        />
        <Input
          label="Loan Tenure"
          placeholder="Optional tenure, e.g. 36 months"
          value={personal.loanTenure}
          onChange={(event) => onChange({ loanTenure: event.target.value })}
        />
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue}>Review application</Button>
      </div>
    </Card>
  );
}
