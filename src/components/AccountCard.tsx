
import type { Account } from "../types";
import Badge from "./ui/Badge";

interface AccountCardProps {
  account: Account;
  onSelect: (account: Account) => void;
  isSelected: boolean;
}

function AccountCard({
  account,
  onSelect,
  isSelected,
}: AccountCardProps) {
  const typeStyles = {
    savings: {
      border: "border-blue-600",
      shadow: "shadow-blue-600/20",
    },
    current: {
      border: "border-green-700",
      shadow: "shadow-green-700/20",
    },
    fixed: {
      border: "border-purple-700",
      shadow: "shadow-purple-700/20",
    },
  };

  const styles = typeStyles[account.accountType];

  return (
    <div
      onClick={() => onSelect(account)}
      className={`
        min-w-[220px] cursor-pointer rounded-xl border-2
        bg-white p-5 transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-lg
        dark:bg-gray-800
        ${
          isSelected
            ? `${styles.border} shadow-lg ${styles.shadow}`
            : "border-transparent shadow-md shadow-gray-100 dark:shadow-black/20"
        }
      `}
    >
      {/* Account type badge */}
      <div className="mb-3">
        <Badge variant="info" size="md">
          {account.accountType}
        </Badge>
      </div>

      {/* Balance */}
      <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        ₦{account.balance.toLocaleString("en-NG")}
      </div>

      {/* Account number */}
      <div className="mb-3 font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500">
        {account.accountNumber}
      </div>

      {/* Account status */}
      <div className="flex items-center gap-1.5">
        <div
          className={`h-2 w-2 rounded-full ${
            account.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {account.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

export default AccountCard;
