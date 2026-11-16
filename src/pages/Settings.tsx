
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  User,
  Bell,
  ShieldCheck,
  Moon,
  Sun,
  Lock,
} from "lucide-react";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [emailNotifications, setEmailNotifications] = useState(
    () => localStorage.getItem("emailNotifications") !== "false"
  );

  const [transactionAlerts, setTransactionAlerts] = useState(
    () => localStorage.getItem("transactionAlerts") !== "false"
  );

  useEffect(() => {
    localStorage.setItem(
      "emailNotifications",
      String(emailNotifications)
    );
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem(
      "transactionAlerts",
      String(transactionAlerts)
    );
  }, [transactionAlerts]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile Settings */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <User className="text-blue-600" size={22} />
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Profile Information
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your account details.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Account Name
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              Wallstreet Administrator
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Email Address
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              admin@wallstreet.com
            </p>
          </div>
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          {theme === "dark" ? (
            <Moon className="text-blue-600" size={22} />
          ) : (
            <Sun className="text-blue-600" size={22} />
          )}

          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Customize how Wallstreet looks.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Dark Mode
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between light and dark appearance.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={theme === "dark"}
            className={`relative h-7 w-14 rounded-full transition-colors ${
              theme === "dark" ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                theme === "dark" ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Current theme: {theme === "dark" ? "Dark" : "Light"}
        </p>
      </section>

      {/* Notification Settings */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="text-blue-600" size={22} />
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your notification preferences.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <label className="flex items-center justify-between gap-4">
            <span>
              <span className="block font-medium text-gray-900 dark:text-white">
                Email Notifications
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Receive account updates through email.
              </span>
            </span>

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(event) =>
                setEmailNotifications(event.target.checked)
              }
              className="h-5 w-5 accent-blue-600"
            />
          </label>

          <label className="flex items-center justify-between gap-4">
            <span>
              <span className="block font-medium text-gray-900 dark:text-white">
                Transaction Alerts
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Receive alerts about account transactions.
              </span>
            </span>

            <input
              type="checkbox"
              checked={transactionAlerts}
              onChange={(event) =>
                setTransactionAlerts(event.target.checked)
              }
              className="h-5 w-5 accent-blue-600"
            />
          </label>
        </div>
      </section>

      {/* Security Settings */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck className="text-blue-600" size={22} />
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Security
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Account security information.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Lock size={20} className="text-gray-500" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Password Protection
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your account is protected by login authentication.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
