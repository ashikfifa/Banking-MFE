import { Card, Loader } from "@banking-mf/ui-library";

export function ProductSelectionStep({
  products,
  isLoadingProducts,
  onSelectProduct,
  formatCurrency
}) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
          Step 1
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Select a loan product</h2>
        <p className="mt-2 text-sm text-slate-500">
          Products are loaded from a local JSON file through a small async wrapper to simulate an
          API request.
        </p>
      </div>

      {isLoadingProducts ? (
        <div className="rounded-xl bg-gray-100 p-6 shadow">
          <Loader label="Fetching loan products..." />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectProduct(product)}
              className="flex h-full flex-col gap-4 rounded-xl bg-white p-6 text-left shadow transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/10"
            >
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {product.interestRate} interest
                </p>
                <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm leading-6 text-slate-500">{product.tagline}</p>
              </div>

              <div className="mt-auto rounded-xl bg-gray-100 p-4 shadow">
                <p className="text-sm font-medium text-slate-700">
                  Maximum amount: {formatCurrency(product.maxAmount)}
                </p>
                <p className="mt-4 text-sm font-medium text-blue-600">Click card to select</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
