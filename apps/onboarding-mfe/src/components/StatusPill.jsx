export function StatusPill({ label, tone }) {
  const tones = {
    success: "border border-green-500 bg-white text-green-500",
    warning: "border border-blue-600 bg-white text-blue-600",
    neutral: "border border-slate-200 bg-white text-slate-600"
  };

  return (
    <span className={["inline-flex rounded-xl px-4 py-2 text-sm font-medium", tones[tone]].join(" ")}>
      {label}
    </span>
  );
}
