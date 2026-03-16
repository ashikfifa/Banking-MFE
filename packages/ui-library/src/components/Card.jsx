export function Card({ children, className = "", accent = false }) {
  return (
    <section
      className={[
        "rounded-xl bg-white p-6 shadow",
        accent ? "border border-primary-100 bg-gradient-to-br from-white to-primary-50" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
