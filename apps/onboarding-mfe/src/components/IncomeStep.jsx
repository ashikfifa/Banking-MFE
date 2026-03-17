import { Button, Card, Input } from "@banking-mf/ui-library";
import { MONTHLY_INCOME_OPTIONS } from "../lib/onboardingValidation.js";

const selectClassName =
  "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

export function IncomeStep({ income, errors, onChange, onBack, onContinue }) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
          Step 3
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Income information</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Occupation"
          placeholder="Enter occupation"
          value={income.occupation}
          error={errors.occupation}
          onChange={(event) => onChange({ occupation: event.target.value })}
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
            value={income.monthlyIncome}
            onChange={(event) => onChange({ monthlyIncome: event.target.value })}
          >
            <option value="">Select monthly income range</option>
            {MONTHLY_INCOME_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.monthlyIncome ? (
            <span className="text-sm text-red-500">{errors.monthlyIncome}</span>
          ) : null}
        </label>
        <Input
          label="Company Name"
          placeholder="Enter company name"
          className="md:col-span-2"
          value={income.companyName}
          error={errors.companyName}
          onChange={(event) => onChange({ companyName: event.target.value })}
        />
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </Card>
  );
}
