import { useEffect, useState } from "react";
import TableMaster from "../components/tables/table.master";
import Swal from "sweetalert2";
import {
	addMaster,
	masterFetch,
	masterFetchId,
} from "../redux/slices/masterSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function PageMaster() {
	const [params, setParams] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(masterFetch(params));
	}, [params]);

	const [input, setInput] = useState({
		nm_barang: "",
		harga: 0,
		Qty: 0,
	});

	const { id } = useParams();
	const navigate = useNavigate();
	const handleAdd = async (e) => {
		e.preventDefault();
		if (input.Qty !== 0) {
			dispatch(addMaster(input, id));
			navigate("/master");
			dispatch(masterFetch());
		} else {
			Swal.fire("Minimun Qty 1 per-Barang");
		}
	};

	useEffect(() => {
		dispatch(masterFetchId(id, setInput));
		setInput({
			nm_barang: "",
			harga: 0,
			Qty: 0,
		});
	}, [id]);

	return (
		<div className="h-screen w-full flex justify-center">
			<div className="container mt-24">
				<h1 className="font-bold">MASTER BARANG</h1>
				<div>
					<div className="w-full">
						{/* SEARCH INPUT */}
						<div className="flex flex-col">
							<label htmlFor="search">Search</label>
							<input
								type="text"
								id="search"
								name="q"
								className="input input-bordered"
								onChange={(e) => setParams({ q: e.target.value })}
							/>
						</div>
						{/* FORM */}
						<form action={handleAdd}>
							<div className="w-full flex gap-10">
								<div className="flex flex-col">
									<label htmlFor="id_barang">Id Barang:</label>
									<input
										type="text"
										id="id_barang"
										placeholder="auto generate"
										name="id"
										disabled
										className="border"
										value={
											id
												? id >= 10
													? `BR-00${id}`
													: id >= 100
													? `BR-0${id}`
													: id >= 1000
													? `BR-${id}`
													: `BR-000${id}`
												: ""
										}
									/>
									<label htmlFor="id_barang">Nama Barang:</label>
									<input
										type="text"
										id="id_barang"
										name="nm_barang"
										className="border"
										onChange={(e) =>
											setInput({ ...input, nm_barang: e.target.value })
										}
										value={input.nm_barang}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="id_barang">Harga:</label>
									<input
										type="text"
										id="id_barang"
										name="harga"
										className="border"
										onChange={(e) =>
											setInput({ ...input, harga: e.target.value })
										}
										value={input.harga}
									/>
									<label htmlFor="id_barang">Qty:</label>
									<input
										type="text"
										id="id_barang"
										name="Qty"
										className="border"
										onChange={(e) =>
											setInput({ ...input, Qty: e.target.value })
										}
										value={input.Qty}
									/>
								</div>
							</div>
						</form>
						{/* END FORM */}
					</div>
				</div>
				{/* BUTTON HANDLER */}
				<div className="flex gap-4 py-2">
					<button type="submit" onClick={handleAdd} className="btn btn-primary">
						{id ? "Save" : "Add"}
					</button>
				</div>
				{/* TABLE MASTER */}
				<TableMaster />
			</div>
		</div>
	);
}
