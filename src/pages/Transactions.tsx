
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

import TransactionList from "../components/TransactionList";
import Badge from "../components/ui/Badge";

import type { RootState, AppDispatch } from "../store/store";
import { fetchTransactions } from "../store/transactionsSlice";

type FilterType = "all" | "deposit" | "withdrawal";

function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const dispatch = useDispatch<AppDispatch>();

  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (transactions.length === 0 && !loading && !error) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, transactions.length, loading, error]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, filter]);

  const totalDeposits = transactions
    .filter((transaction) => transaction.type === "deposit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalWithdrawals = transactions
    .filter((transaction) => transaction.type === "withdrawal")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage your account transaction history.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
          Loading transactions...
        </div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 p-5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
          <button
            type="button"
            onClick={() => dispatch(fetchTransactions())}
            className="ml-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          {/* Transaction Summary */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Deposits
                </p>
                <ArrowDownLeft className="text-green-600" size={22} />
              </div>
              <h2 className="mt-3 text-2xl font-bold text-green-600">
                {formatCurrency(totalDeposits)}
              </h2>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Withdrawals
                </p>
                <ArrowUpRight className="text-red-600" size={22} />
              </div>
              <h2 className="mt-3 text-2xl font-bold text-red-600">
                {formatCurrency(totalWithdrawals)}
              </h2>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Transactions
                </p>
                <Wallet className="text-blue-600" size={22} />
              </div>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                {transactions.length}
              </h2>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["all", "deposit", "withdrawal"] as FilterType[]).map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                      filter === option
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {option === "all" ? "All" : option}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Transaction History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Transaction History
              </h2>
              <Badge variant="info">
                {filteredTransactions.length} Records
              </Badge>
            </div>

            <TransactionList
              transactions={filteredTransactions}
              accountNumber="All Accounts"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Transactions;
