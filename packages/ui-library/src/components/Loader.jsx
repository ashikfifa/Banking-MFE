export function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      <span>{label}</span>
    </div>
  );
}
