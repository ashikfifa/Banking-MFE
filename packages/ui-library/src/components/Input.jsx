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
          "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100",
          error ? "border-danger-400 focus:border-danger-400 focus:ring-danger-100" : "",
          inputClassName
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error ? <span className="text-sm text-danger-500">{error}</span> : null}
    </label>
  );
}
