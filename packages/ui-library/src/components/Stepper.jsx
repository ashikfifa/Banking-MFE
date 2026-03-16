export function Stepper({ steps, currentStep }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;

        return (
          <div
            key={step}
            className={[
              "rounded-xl bg-white p-4 shadow transition",
              isActive
                ? "border border-blue-600"
                : isDone
                  ? "border border-green-500"
                  : "border border-slate-200"
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  isActive
                    ? "bg-blue-600 text-white"
                    : isDone
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-slate-500"
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
