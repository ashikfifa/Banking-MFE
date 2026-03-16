export function Card({ children, className = "", accent = false }) {
  return (
    <section
      className={[
        "rounded-xl bg-white p-6 shadow",
        accent ? "border border-blue-600" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
