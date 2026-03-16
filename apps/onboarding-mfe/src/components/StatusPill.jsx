export function StatusPill({ label, tone }) {
  const tones = {
    success: "bg-success-100 text-success-700",
    warning: "bg-amber-100 text-amber-700",
    neutral: "bg-slate-100 text-slate-600"
  };

  return (
    <span className={["inline-flex rounded-full px-3 py-1 text-sm font-medium", tones[tone]].join(" ")}>
      {label}
    </span>
  );
}
