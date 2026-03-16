const variants = {
  primary:
    "bg-blue-600 text-white hover:opacity-90 focus-visible:ring-blue-600/20",
  secondary:
    "border border-blue-600 bg-white text-blue-600 hover:bg-gray-100 focus-visible:ring-blue-600/20",
  ghost:
    "border border-slate-200 bg-white text-slate-700 hover:bg-gray-100 focus-visible:ring-slate-200",
  success:
    "bg-green-500 text-white hover:opacity-90 focus-visible:ring-green-500/20"
};

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "w-full" : "",
        variants[variant] ?? variants.primary,
        className
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
