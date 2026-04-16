import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum EWelcomeKind {
  Login = "login",
  Register = "register",
}

type WelcomeState = {
  open: boolean;
  displayName: string | null;
  kind: EWelcomeKind | null;
};

const initialState: WelcomeState = {
  open: false,
  displayName: null,
  kind: null,
};

const welcomeSlice = createSlice({
  name: "welcome",
  initialState,
  reducers: {
    openWelcome: (
      state,
      action: PayloadAction<{ name: string; kind: EWelcomeKind }>
    ) => {
      state.open = true;
      state.displayName = action.payload.name.trim();
      state.kind = action.payload.kind;
    },
    closeWelcome: () => initialState,
  },
});

export const { openWelcome, closeWelcome } = welcomeSlice.actions;
export default welcomeSlice.reducer;
