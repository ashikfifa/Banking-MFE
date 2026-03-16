import { Button, Card } from "@banking-mf/ui-library";

export function LoanSubmitted({ selectedProduct, personal, onReset }) {
  return (
    <Card className="space-y-4">
      <div className="inline-flex w-fit rounded-xl border border-green-500 bg-white px-4 py-2 text-sm font-semibold text-green-500">
        Application submitted
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          {selectedProduct?.name || "Loan"} submitted successfully.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          The application remains visible in the app shell because the loan state is stored in the
          shared workspace package.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-gray-100 p-4 shadow text-sm">
          <p className="font-semibold text-slate-800">Product</p>
          <p className="mt-2 text-slate-600">{selectedProduct?.name}</p>
          <p className="mt-1 text-slate-500">{selectedProduct?.interestRate} interest</p>
        </div>
        <div className="rounded-xl bg-gray-100 p-4 shadow text-sm">
          <p className="font-semibold text-slate-800">Applicant</p>
          <p className="mt-2 text-slate-600">{personal.fullName}</p>
          <p className="mt-1 text-slate-500">{personal.email}</p>
        </div>
      </div>
      <Button variant="secondary" onClick={onReset}>
        Start another application
      </Button>
    </Card>
  );
}
