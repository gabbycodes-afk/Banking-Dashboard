
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "../types";

interface AccountsState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
};

const demoAccounts: Account[] = [
  {
    id: 1,
    accountType: "savings",
    balance: 850000,
    accountNumber: "0123456789",
    isActive: true,
  },
  {
    id: 2,
    accountType: "current",
    balance: 1200000,
    accountNumber: "0987654321",
    isActive: true,
  },
  {
    id: 3,
    accountType: "fixed",
    balance: 400000,
    accountNumber: "0112233445",
    isActive: true,
  },
];

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    return demoAccounts;
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    debitAccount: (
      state,
      action: PayloadAction<{ accountNumber: string; amount: number }>
    ) => {
      const account = state.accounts.find(
        (item) => item.accountNumber === action.payload.accountNumber
      );

      if (account && account.balance >= action.payload.amount) {
        account.balance -= action.payload.amount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load accounts";
      });
  },
});

export const { debitAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
