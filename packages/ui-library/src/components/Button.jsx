const variants = {
  primary:
    "bg-primary-600 text-white shadow-float hover:bg-primary-700 focus-visible:ring-primary-300",
  secondary:
    "border border-primary-200 bg-white text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-200",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-200",
  success:
    "bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-200"
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
