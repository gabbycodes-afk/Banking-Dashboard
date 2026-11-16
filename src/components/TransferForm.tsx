
import { useState, type FormEvent } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface TransferFormProps {
  accountNumbers: string[];
  onTransfer: (transfer: {
    fromAccount: string;
    recipientName: string;
    recipientAccount: string;
    amount: number;
  }) => void;
}

function TransferForm({ accountNumbers, onTransfer }: TransferFormProps) {
  const [fromAccount, setFromAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const numericAmount = Number(amount);

    if (!fromAccount) {
      setError("Please select a source account.");
      return;
    }

    if (!recipientName.trim()) {
      setError("Please enter the recipient's name.");
      return;
    }

    if (!/^\d{10}$/.test(recipientAccount)) {
      setError("Recipient account number must contain 10 digits.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid transfer amount.");
      return;
    }

    setIsLoading(true);

    try {
      onTransfer({
        fromAccount,
        recipientName: recipientName.trim(),
        recipientAccount,
        amount: numericAmount,
      });

      setSuccess("Transfer completed successfully.");
      setRecipientName("");
      setRecipientAccount("");
      setAmount("");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Transfer failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        Make a Transfer
      </h2>

      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Enter the recipient details and transfer amount.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Source Account
          </label>

          <select
            value={fromAccount}
            onChange={(event) => setFromAccount(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select an account</option>
            {accountNumbers.map((accountNumber) => (
              <option key={accountNumber} value={accountNumber}>
                {accountNumber}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Recipient Name"
          placeholder="Enter recipient name"
          value={recipientName}
          onChange={(event) => setRecipientName(event.target.value)}
          required
        />

        <Input
          label="Recipient Account Number"
          placeholder="Enter 10-digit account number"
          value={recipientAccount}
          onChange={(event) =>
            setRecipientAccount(
              event.target.value.replace(/\D/g, "").slice(0, 10)
            )
          }
          inputMode="numeric"
          maxLength={10}
          required
        />

        <Input
          label="Amount (₦)"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          min="1"
          step="0.01"
          required
        />

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-400">
            {success}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Transfer Funds
        </Button>
      </form>
    </div>
  );
}

export default TransferForm;
