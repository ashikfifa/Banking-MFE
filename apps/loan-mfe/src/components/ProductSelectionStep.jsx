import { Card, Loader } from "@banking-mf/ui-library";

export function ProductSelectionStep({
  products,
  isLoadingProducts,
  onSelectProduct,
  formatCurrency
}) {
  return (
    <div className="space-y-4">
      {/* section header */}
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            1
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Select a Loan Product</h2>
            <p className="text-sm text-slate-500">
              Choose a loan product that best fits your needs.
            </p>
          </div>
        </div>
      </div>

      {/* product cards */}
      {isLoadingProducts ? (
        <div className="rounded-xl bg-white p-6 shadow">
          <Loader label="Fetching loan products..." />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectProduct(product)}
              className="group relative flex h-full flex-col rounded-xl border-2 border-slate-100 bg-white p-6 text-left shadow transition-all duration-200 hover:border-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20"
            >
              {/* interest rate badge */}
              <div className="mb-4 inline-flex self-start rounded-full bg-blue-50 px-3 py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {product.interestRate} Interest
                </span>
              </div>

              {/* product name & tagline */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {product.tagline}
              </p>

              {/* max amount section */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Max Amount
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {formatCurrency(product.maxAmount)}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 text-blue-500 transition-all group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
                    →
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
