
import type { Transaction } from "../types";
import Badge from "./ui/Badge";

interface TransactionListProps {
  transactions: Transaction[];
  accountNumber: string;
}

function TransactionList({
  transactions,
  accountNumber,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
        No transactions found for this account.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white">
          Recent Transactions
        </h3>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {accountNumber}
        </span>
      </div>

      {/* Transaction rows */}
      {transactions.map((transaction) => {
        const isCredit = transaction.type === "deposit";

        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 p-5 last:border-0 dark:border-gray-700"
          >
            {/* Transaction information */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-xl ${
                  isCredit
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                }`}
              >
                {isCredit ? "↓" : "↑"}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {transaction.description}
                </h4>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {transaction.date}
                </p>

                <div className="mt-2">
                  <Badge
                    variant={isCredit ? "success" : "error"}
                    size="sm"
                  >
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Transaction amount */}
            <p
              className={`whitespace-nowrap text-sm font-bold ${
                isCredit
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {isCredit ? "+" : "-"}₦
              {transaction.amount.toLocaleString("en-NG")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionList;
