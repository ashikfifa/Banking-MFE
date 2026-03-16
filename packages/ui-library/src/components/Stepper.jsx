export function Stepper({ steps, currentStep }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;

        return (
          <div
            key={step}
            className={[
              "rounded-xl border px-4 py-3 transition",
              isActive
                ? "border-primary-200 bg-primary-50"
                : isDone
                  ? "border-success-200 bg-success-50"
                  : "border-slate-200 bg-white"
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  isActive
                    ? "bg-primary-600 text-white"
                    : isDone
                      ? "bg-success-500 text-white"
                      : "bg-slate-100 text-slate-500"
                ].join(" ")}
              >
                {isDone ? "✓" : stepNumber}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Step {stepNumber}
                </p>
                <p className="text-sm font-semibold text-slate-800">{step}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
