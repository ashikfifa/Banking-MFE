import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Dashboard" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/loan", label: "Loan" }
];

export function AppHeader() {
  return (
    <header className="border-b border-white/60 bg-white/75 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
            App Shell
          </p>
          <p className="text-lg font-semibold text-slate-900">Retail Banking Platform</p>
        </div>

        <nav className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-xl px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-primary-700 shadow"
                    : "text-slate-600 hover:text-slate-900"
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
