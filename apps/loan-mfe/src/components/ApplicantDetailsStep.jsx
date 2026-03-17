import { Button, Card, Input } from "@banking-mf/ui-library";
import {
  LOAN_AMOUNT_OPTIONS,
  LOAN_MONTHLY_INCOME_OPTIONS,
  LOAN_TENURE_OPTIONS
} from "../lib/loanHelpers.js";

const selectClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

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
    <div className="space-y-4">
      {/* section header */}
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Applicant Information</h2>
              <p className="text-sm text-slate-500">
                Provide your personal details for the loan application.
              </p>
            </div>
          </div>

          {selectedProduct ? (
            <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                🏦
              </div>
              <div className="text-sm">
                <p className="font-bold text-blue-700">{selectedProduct.name}</p>
                <p className="text-blue-600/70">
                  {selectedProduct.interestRate} · Max {formatCurrency(selectedProduct.maxAmount)}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* prefill notice */}
      {hasProfilePrefill ? (
        <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <span className="text-lg">✅</span>
          <p className="text-sm font-medium text-green-700">
            Applicant data has been prefilled from your onboarding profile.
          </p>
        </div>
      ) : null}

      {/* form fields */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Personal Details
        </h3>
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
        </div>

        <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Loan Details
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      {/* action buttons */}
      <div className="flex flex-wrap justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onContinue}>Review Application →</Button>
      </div>
    </div>
  );
}
