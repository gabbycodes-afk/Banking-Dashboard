
import { useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  Settings,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: ReceiptText,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-700 text-white"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-white p-4 shadow-lg transition-all duration-300
          dark:bg-gray-900
          md:static md:z-auto md:translate-x-0
          ${isExpanded ? "md:w-64" : "md:w-20"}
          w-64
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Wallstreet branding */}
        <div className="mb-10 flex h-12 items-center justify-center">
          <div
            className={`flex items-center justify-center rounded-xl font-extrabold ${
              isExpanded
                ? "h-11 w-full bg-blue-700 text-2xl text-white md:bg-transparent md:text-blue-700 dark:md:text-blue-400"
                : "h-11 w-11 bg-blue-700 text-lg text-white"
            }`}
          >
            {isExpanded ? (
              <span>Wallstreet</span>
            ) : (
              <span className="hidden md:inline">WS</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                title={!isExpanded ? item.name : undefined}
                className={navLinkClass}
              >
                <Icon size={21} className="shrink-0" />

                <span className={!isExpanded ? "md:hidden" : ""}>
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          title={!isExpanded ? "Logout" : undefined}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/40"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center font-bold">
            ↪
          </span>

          <span className={!isExpanded ? "md:hidden" : ""}>
            Logout
          </span>
        </button>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-between bg-white px-4 py-5 shadow-sm dark:bg-gray-900 md:px-6">
          <div className="flex items-center gap-4">
            {/* Desktop toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
              className="hidden rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:block"
            >
              ☰
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open sidebar"
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
            >
              ☰
            </button>

            <h2 className="font-semibold text-gray-800 dark:text-white">
              Welcome to Wallstreet
            </h2>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/40 md:hidden"
          >
            Logout
          </button>
        </header>

        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
