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
        "flex cursor-pointer flex-col gap-4 rounded-xl border border-dashed border-blue-600 bg-white p-4 transition hover:bg-gray-100",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <span className="text-sm text-slate-500">
        {file?.name ? `Selected: ${file.name}` : helperText}
      </span>
      <span className="inline-flex w-fit rounded-xl border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600">
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
