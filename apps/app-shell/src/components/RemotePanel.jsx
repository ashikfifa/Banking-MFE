import { Suspense } from "react";
import { Card, Loader } from "@banking-mf/ui-library";

export function RemotePanel({ title, description, children }) {
  return (
    <Card>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            Micro frontend
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <Loader label="Loading remote module..." />
          </div>
        }
      >
        {children}
      </Suspense>
    </Card>
  );
}
