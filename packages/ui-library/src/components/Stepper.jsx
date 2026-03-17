export function Stepper({ steps, currentStep }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isDone = stepNumber < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step} className="flex flex-1 items-center">
              {/* step indicator */}
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : isDone
                        ? "bg-green-500 text-white"
                        : "border-2 border-slate-200 bg-white text-slate-400"
                  ].join(" ")}
                >
                  {isDone ? "✓" : stepNumber}
                </div>
                <div>
                  <p
                    className={[
                      "text-[10px] font-medium uppercase tracking-widest",
                      isActive ? "text-blue-600" : isDone ? "text-green-500" : "text-slate-400"
                    ].join(" ")}
                  >
                    Step {stepNumber}
                  </p>
                  <p
                    className={[
                      "text-xs font-semibold",
                      isActive ? "text-slate-900" : isDone ? "text-slate-700" : "text-slate-400"
                    ].join(" ")}
                  >
                    {step}
                  </p>
                </div>
              </div>

              {/* connector line */}
              {!isLast && (
                <div className="mx-4 h-0.5 flex-1">
                  <div
                    className={[
                      "h-full rounded-full transition-all",
                      isDone ? "bg-green-400" : "bg-slate-200"
                    ].join(" ")}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
