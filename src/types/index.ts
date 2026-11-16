
export interface Account {
  id: number;
  accountType: "savings" | "current" | "fixed";
  balance: number;
  accountNumber: string;
  isActive: boolean;
}

export interface Transaction {
  id: number;
  type: "deposit" | "withdrawal";
  description: string;
  amount: number;
  date: string;
}
