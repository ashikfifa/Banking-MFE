import { NavLink, Link } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Dashboard" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/loan", label: "Loan" }
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 p-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/">
            <img src="/logo.svg" alt="BRAC Bank PLC" className="h-10 w-auto" />
          </Link>

        </div>

        <nav className="ml-auto flex items-center gap-1 rounded-full bg-blue-50 p-1.5">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-600"
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
