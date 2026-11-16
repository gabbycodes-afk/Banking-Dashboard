
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountCard from "../components/AccountCard";
import TransactionList from "../components/TransactionList";
import TransferForm from "../components/TransferForm";

import type { Transaction } from "../types";
import type { RootState, AppDispatch } from "../store/store";

import { fetchAccounts, debitAccount } from "../store/accountsSlice";
import {fetchTransactions, addTransaction} from "../store/transactionsSlice"

function Dashboard() {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();

  const { accounts, loading, error } = useSelector(
    (state: RootState) => state.accounts
  );

  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const handleTransfer = (transfer: {
    fromAccount: string;
    recipientName: string;
    recipientAccount: string;
    amount: number;
  }) => {
    const account = accounts.find(
      (item) => item.accountNumber === transfer.fromAccount
    );

    if (!account) {
      throw new Error("The selected account could not be found.");
    }

    if (!account.isActive) {
      throw new Error("This account is currently inactive.");
    }

    if (account.balance < transfer.amount) {
      throw new Error("Insufficient funds in the selected account.");
    }

    dispatch(
      debitAccount({
        accountNumber: transfer.fromAccount,
        amount: transfer.amount,
      })
    );

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "withdrawal",
      description: `Transfer to ${transfer.recipientName}`,
      amount: transfer.amount,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    dispatch(addTransaction(newTransaction));
  };

  const handleTransferAction = () => {
    document.getElementById("transfer-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const quickActions = [
    {
      id: 1,
      title: "Transfer",
      description: "Send money to another account",
      icon: "↗",
      onClick: handleTransferAction,
      disabled: false,
    },
    {
      id: 2,
      title: "Deposit",
      description: "Add money to your account",
      icon: "↓",
      onClick: undefined,
      disabled: true,
    },
    {
      id: 3,
      title: "Withdraw",
      description: "Withdraw money from your account",
      icon: "↑",
      onClick: undefined,
      disabled: true,
    },
  ];

  return (
    <div className="p-2 sm:p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good evening, Kolade
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Here's what's happening with your accounts today.
        </p>
      </div>

      <div className="mt-8 rounded-xl bg-blue-700 p-6 text-white shadow-lg">
        <p className="text-sm text-blue-100">Total Balance</p>

        {loading ? (
          <p className="mt-3 text-xl font-semibold">Loading balance...</p>
        ) : error ? (
          <p className="mt-3 text-sm text-red-100">
            Unable to load balance.
          </p>
        ) : (
          <h2 className="mt-3 text-3xl font-bold">
            ₦
            {totalBalance.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
            })}
          </h2>
        )}

        <p className="mt-2 text-sm text-blue-100">
          Across all your accounts
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          My Accounts
        </h2>

        {loading && (
          <p className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
            Loading your accounts...
          </p>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && accounts.length === 0 && (
          <p className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
            No accounts available.
          </p>
        )}

        {!loading && !error && accounts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onSelect={(selectedAccount) =>
                  setSelectedAccountId(selectedAccount.id)
                }
                isSelected={selectedAccountId === account.id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              title={action.disabled ? "Not available in this demo" : undefined}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                {action.icon}
              </span>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div id="transfer-form" className="mt-10 scroll-mt-6">
        {loading ? (
          <p className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
            Preparing your accounts...
          </p>
        ) : !error && accounts.length > 0 ? (
          <TransferForm
            accountNumbers={accounts.map((account) => account.accountNumber)}
            onTransfer={handleTransfer}
          />
        ) : null}
      </div>

      <div className="mt-10">
        {transactionsLoading ? (
          <p className="rounded-xl bg-white p-6 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
            Loading transactions...
          </p>
        ) : transactionsError ? (
          <p className="rounded-xl bg-red-50 p-5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {transactionsError}
          </p>
        ) : (
          <TransactionList
            transactions={transactions}
            accountNumber="All Accounts"
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
