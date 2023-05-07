import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSilce";

export const store = configureStore( {
	reducer: {
		ui: uiSlice.reducer
	}
} )