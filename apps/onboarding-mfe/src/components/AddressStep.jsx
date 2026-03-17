import { Button, Card, Input } from "@banking-mf/ui-library";

const districts = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal"];
const cities = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Narayanganj"];
const selectClassName =
  "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

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
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">City</span>
          <select
            className={[selectClassName, errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""]
              .filter(Boolean)
              .join(" ")}
            value={address.city}
            onChange={(event) => onChange({ city: event.target.value })}
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city ? <span className="text-sm text-red-500">{errors.city}</span> : null}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">District</span>
          <select
            className={[
              selectClassName,
              errors.district ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""
            ]
              .filter(Boolean)
              .join(" ")}
            value={address.district}
            onChange={(event) => onChange({ district: event.target.value })}
          >
            <option value="">Select district</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district ? (
            <span className="text-sm text-red-500">{errors.district}</span>
          ) : null}
        </label>
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
