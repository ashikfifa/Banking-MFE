import { Button, Card, Input } from "@banking-mf/ui-library";

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
        <Input
          label="Monthly Income"
          type="number"
          placeholder="Enter monthly income"
          value={income.monthlyIncome}
          error={errors.monthlyIncome}
          onChange={(event) => onChange({ monthlyIncome: event.target.value })}
        />
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
