
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../types";

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

const demoTransactions: Transaction[] = [
  {
    id: 1,
    type: "deposit",
    description: "Salary Payment",
    amount: 350000,
    date: "October 28, 2026",
  },
  {
    id: 2,
    type: "withdrawal",
    description: "Shopping",
    amount: 45000,
    date: "October 27, 2026",
  },
  {
    id: 3,
    type: "deposit",
    description: "Transfer Received",
    amount: 120000,
    date: "October 26, 2026",
  },
  {
    id: 4,
    type: "withdrawal",
    description: "Electricity Bill",
    amount: 25000,
    date: "October 25, 2026",
  },
];

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return demoTransactions;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;

        if (state.transactions.length === 0) {
          state.transactions = action.payload;
        }
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to load transactions";
      });
  },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
