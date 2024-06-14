import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
const BASE_URL = "http://localhost:3000";

// --------------------------- CREATE REDUCER -------------------------------
const masterSlice = createSlice({
	name: "master_barang",
	initialState: {
		dataMaster: [],
	},
	reducers: {
		dataMaster: (state, action) => {
			state.dataMaster = action.payload;
		},
	},
});
export const { dataMaster } = masterSlice.actions;
export default masterSlice.reducer;

// --------------------------- CREATE ASYNC FUNCTION -------------------------------
export function masterFetch(params) {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "GET",
				url: `${BASE_URL}/master`,
				params: params,
			});
			dispatch(dataMaster(data));
		} catch (error) {
			Swal.fire(error.data.message);
		}
	};
}

export function masterFetchId(id, setInput) {
	return async () => {
		try {
			const { data } = await axios({
				method: "GET",
				url: `${BASE_URL}/master/${id}`,
			});
			setInput({
				nm_barang: data.nm_barang,
				harga: data.harga,
				Qty: data.Qty,
			});
		} catch (error) {
			Swal.fire(error.data.message);
		}
	};
}

export function addMaster(input, id) {
	return async () => {
		try {
			if (id) {
				await axios({
					method: "PUT",
					url: `${BASE_URL}/master/${id}`,
					data: input,
				});
				Swal.fire("Success Edited");
			} else {
				await axios({
					method: "POST",
					url: `${BASE_URL}/master`,
					data: input,
				});
				Swal.fire("Success Added");
			}
		} catch (error) {
			Swal.fire(error.data.message);
		}
	};
}
