import { configureStore } from "@reduxjs/toolkit";
import masterReducer from "./slices/masterSlice";

const store = configureStore({
	reducer: { data: masterReducer },
});

export default store;
