export function FileUploader({
  label,
  helperText,
  accept,
  file,
  onFileSelect,
  className = ""
}) {
  return (
    <label
      className={[
        "flex cursor-pointer flex-col gap-3 rounded-xl border border-dashed border-primary-200 bg-primary-50/60 p-4 transition hover:border-primary-400 hover:bg-primary-50",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <span className="text-sm text-slate-500">
        {file?.name ? `Selected: ${file.name}` : helperText}
      </span>
      <span className="inline-flex w-fit rounded-lg bg-white px-3 py-2 text-sm font-medium text-primary-700">
        Choose file
      </span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => onFileSelect?.(event.target.files?.[0] ?? null)}
      />
    </label>
  );
}
