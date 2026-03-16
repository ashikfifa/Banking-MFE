import { Button, Card, Loader } from "@banking-mf/ui-library";

export function ProductSelectionStep({
  products,
  isLoadingProducts,
  onSelectProduct,
  formatCurrency
}) {
  return (
    <Card className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
          Step 1
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Select a loan product</h2>
        <p className="mt-2 text-sm text-slate-500">
          Products are loaded from a local JSON file through a small async wrapper to simulate an
          API request.
        </p>
      </div>

      {isLoadingProducts ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6">
          <Loader label="Fetching loan products..." />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col justify-between border border-transparent bg-slate-50 p-5"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                  {product.interestRate} interest
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{product.tagline}</p>
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium text-slate-700">
                  Maximum amount: {formatCurrency(product.maxAmount)}
                </p>
                <Button fullWidth onClick={() => onSelectProduct(product)}>
                  Select product
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
