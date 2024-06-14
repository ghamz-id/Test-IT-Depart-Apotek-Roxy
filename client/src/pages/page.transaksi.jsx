import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { masterFetch } from "../redux/slices/masterSlice";

export default function PageTransaksi() {
	// ----------------- HANDLE INPUT -----------------
	const [result, setResult] = useState([]);
	const [input, setInput] = useState({
		id: 0,
		count: 0,
	});

	const handleSave = async (e) => {
		e.preventDefault();

		try {
			if (input.count > 0) {
				const check = result.find((item) => item.id === input.id);
				if (!check) {
					setResult([...result, input]);
				}
			} else {
				Swal.fire("Minimal transaksi 1 barang");
			}
			const post = {
				transaksi: result.map((item) => ({ id: item.id, count: item.count })),
			};

			if (post.transaksi.length !== 0) {
				const response = await axios({
					method: "post",
					url: "http://localhost:3000/transaksi",
					data: post,
				});
				Swal.fire(response.data.message);
				setRows([
					{
						id: 0,
						name: "",
						price: 0,
						quantity: 1,
					},
				]);
			}
		} catch (error) {
			console.error("Error while saving:", error);
		}
	};

	// ----------------- LOGIC DISPLAY -----------------
	const { dataMaster } = useSelector((item) => item.data);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(masterFetch());
	}, []);
	const [rows, setRows] = useState([
		{
			id: 0,
			name: "",
			price: 0,
			quantity: 0,
		},
	]);
	const [total, setTotal] = useState(0);
	const [transactionDate, setTransactionDate] = useState("");

	useEffect(() => {
		const currentDate = new Date().toLocaleDateString("id-ID");
		setTransactionDate(currentDate);
	}, []);

	useEffect(() => {
		const newTotal = rows.reduce(
			(acc, row) => acc + row.price * row.quantity,
			0
		);
		setTotal(newTotal);
	}, [rows]);

	const handleAddRow = () => {
		const newRow = {
			id: 0,
			name: "",
			price: 0,
			quantity: 0,
		};
		setRows([...rows, newRow]);
	};

	const handleDeleteRow = (index) => {
		const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
		setRows(updatedRows);
	};

	const handleSelectChange = (index, newId) => {
		const updatedRows = rows.map((row, rowIndex) => {
			if (rowIndex === index) {
				const selectedItem = dataMaster.find((item) => item.id === +newId);
				return {
					...row,
					id: newId,
					name: selectedItem ? selectedItem.nm_barang : row.name,
					price: selectedItem ? selectedItem.harga : row.price,
				};
			}
			return row;
		});
		setRows(updatedRows);
	};

	return (
		<div className="h-screen w-full flex justify-center">
			<div className="container mt-24">
				<h1 className="font-bold text-xl">TRANSAKSI</h1>
				<div className="flex gap-10">
					<div className="flex flex-col gap-2 py-4">
						<div>
							<p>Id Transaksi:</p>
							<input
								type="text"
								className="border"
								disabled
								placeholder="auto generate"
							/>
						</div>
						<div>
							<p>Tanggal Transaksi:</p>
							<input
								type="text"
								className="border"
								disabled
								value={transactionDate}
							/>
						</div>
					</div>
					<div className="py-4">
						<p>Total:</p>
						<input
							type="text"
							disabled
							className="border h-7"
							value={new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
							}).format(total)}
						/>
					</div>
				</div>
				<div className="flex gap-4 py-2">
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleAddRow}
					>
						Add
					</button>
					<button onClick={handleSave} className="btn btn-primary">
						Save
					</button>
				</div>
				<div className="overflow-x-auto max-h-96 border">
					<table className="table table-pin-rows">
						<thead className="text-sm">
							<tr className="bg-blue-300">
								<th>Id Barang</th>
								<th>Nama Barang</th>
								<th>Harga</th>
								<th>Quantity</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row, i) => (
								<tr key={i} className="hover">
									<td className="font-bold">
										{row.id >= 10
											? `BR-00${row.id}`
											: row.id >= 100
											? `BR-0${row.id}`
											: row.id >= 1000
											? `BR-${row.id}`
											: `BR-000${row.id}`}
									</td>
									<td>
										<select
											name="id"
											value={row.id}
											onChange={(e) => {
												handleSelectChange(i, e.target.value);
												setInput({ ...input, [e.target.name]: e.target.value });
											}}
										>
											<option disabled value={0}>
												-
											</option>
											{dataMaster.map((item) => (
												<option value={item.id} key={item.id}>
													{item.nm_barang}
												</option>
											))}
										</select>
									</td>
									<td>
										{new Intl.NumberFormat("id-ID", {
											style: "currency",
											currency: "IDR",
										}).format(row.price)}
									</td>
									<td>
										<input
											type="number"
											placeholder={row.quantity}
											onChange={(e) => {
												const updatedRows = rows.map((row, rowIndex) => {
													if (rowIndex === i) {
														return { ...row, quantity: +e.target.value };
													}
													return row;
												});
												setRows(updatedRows);
												setInput({ ...input, [e.target.name]: e.target.value });
											}}
											name="count"
										/>
									</td>
									<td className="flex gap-2">
										<button className="btn btn-disabled btn-sm">Edit</button>
										<button
											className="btn btn-error btn-sm"
											onClick={() => handleDeleteRow(i)}
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
