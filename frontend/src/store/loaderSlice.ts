import { createSlice } from "@reduxjs/toolkit";

type LoaderState = {
  /** Видимость глобального лоадера. */
  isVisible: boolean;
};

const initialState: LoaderState = {
  isVisible: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showGlobalLoader: (state) => {
      state.isVisible = true;
    },
    hideGlobalLoader: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showGlobalLoader, hideGlobalLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
