import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Dashboard" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/loan", label: "Loan" }
];

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 p-4 md:px-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            App Shell
          </p>
          <p className="text-lg font-semibold text-slate-900">Retail Banking Platform</p>
        </div>

        <nav className="ml-auto flex flex-wrap gap-4 rounded-xl bg-gray-100 p-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-xl px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-blue-600 shadow"
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
