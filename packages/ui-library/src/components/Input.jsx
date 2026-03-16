export function Input({
  label,
  error,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <label className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <input
        className={[
          "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
          inputClassName
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error ? <span className="text-sm text-red-500">{error}</span> : null}
    </label>
  );
}
