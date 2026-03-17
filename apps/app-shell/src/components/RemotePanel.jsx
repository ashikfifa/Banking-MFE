import { Suspense } from "react";
import { Card, Loader } from "@banking-mf/ui-library";

export function RemotePanel({ title, description, children }) {
  return (
    <div className="space-y-4">
      {/* panel header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-6 text-white shadow">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
          BRAC Bank
        </p>
        <h1 className="mt-2 text-2xl font-bold">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm opacity-80">{description}</p>
      </div>

      {/* content */}
      <Suspense
        fallback={
          <div className="rounded-xl bg-white p-6 shadow">
            <Loader label="Loading module..." />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
