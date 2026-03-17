import { Button, Card } from "@banking-mf/ui-library";

export function LoanSubmitted({ selectedProduct, personal, onReset }) {
  return (
    <div className="space-y-4">
      {/* success banner */}
      <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-center text-white shadow">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold">Application Submitted Successfully!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-80">
          Your {selectedProduct?.name || "loan"} application has been received and is now being processed.
        </p>
      </div>

      {/* summary cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">🏦</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Loan Product
            </h3>
          </div>
          <p className="text-lg font-bold text-slate-900">{selectedProduct?.name}</p>
          <p className="mt-1 text-sm text-slate-500">{selectedProduct?.interestRate} interest rate</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">👤</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Applicant
            </h3>
          </div>
          <p className="text-lg font-bold text-slate-900">{personal.fullName}</p>
          <p className="mt-1 text-sm text-slate-500">{personal.email}</p>
        </div>
      </div>

      <div className="text-center">
        <Button variant="secondary" onClick={onReset}>
          Start Another Application
        </Button>
      </div>
    </div>
  );
}
