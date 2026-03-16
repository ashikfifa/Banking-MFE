import { Button, Card, Input } from "@banking-mf/ui-library";

export function AddressStep({ address, errors, onChange, onBack, onContinue }) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
          Step 2
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Address information</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Present Address"
          placeholder="Enter present address"
          value={address.presentAddress}
          error={errors.presentAddress}
          onChange={(event) => onChange({ presentAddress: event.target.value })}
        />
        <Input
          label="City"
          placeholder="Enter city"
          value={address.city}
          error={errors.city}
          onChange={(event) => onChange({ city: event.target.value })}
        />
        <Input
          label="District"
          placeholder="Enter district"
          value={address.district}
          error={errors.district}
          onChange={(event) => onChange({ district: event.target.value })}
        />
        <Input
          label="Postal Code"
          placeholder="Enter postal code"
          value={address.postalCode}
          error={errors.postalCode}
          onChange={(event) => onChange({ postalCode: event.target.value })}
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
