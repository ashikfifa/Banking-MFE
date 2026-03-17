import { Button, Card, Input } from "@banking-mf/ui-library";
import {
  LOAN_AMOUNT_OPTIONS,
  LOAN_MONTHLY_INCOME_OPTIONS,
  LOAN_TENURE_OPTIONS
} from "../lib/loanHelpers.js";

const selectClassName =
  "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

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
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Monthly Income</span>
          <select
            className={[
              selectClassName,
              errors.monthlyIncome ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""
            ]
              .filter(Boolean)
              .join(" ")}
            value={personal.monthlyIncome}
            onChange={(event) => onChange({ monthlyIncome: event.target.value })}
          >
            <option value="">Select monthly income range</option>
            {LOAN_MONTHLY_INCOME_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.monthlyIncome ? (
            <span className="text-sm text-red-500">{errors.monthlyIncome}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Loan Amount</span>
          <select
            className={[
              selectClassName,
              errors.loanAmount ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""
            ]
              .filter(Boolean)
              .join(" ")}
            value={personal.loanAmount}
            onChange={(event) => onChange({ loanAmount: event.target.value })}
          >
            <option value="">Select loan amount</option>
            {LOAN_AMOUNT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.loanAmount ? (
            <span className="text-sm text-red-500">{errors.loanAmount}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Loan Tenure</span>
          <select
            className={[
              selectClassName,
              errors.loanTenure ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""
            ]
              .filter(Boolean)
              .join(" ")}
            value={personal.loanTenure}
            onChange={(event) => onChange({ loanTenure: event.target.value })}
          >
            <option value="">Select loan tenure</option>
            {LOAN_TENURE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.loanTenure ? (
            <span className="text-sm text-red-500">{errors.loanTenure}</span>
          ) : null}
        </label>
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
