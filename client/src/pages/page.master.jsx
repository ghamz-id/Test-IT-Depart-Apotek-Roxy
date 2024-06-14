import { useEffect, useState } from "react";
import TableMaster from "../components/tables/table.master";

export default function PageMaster() {
	const [input, setInput] = useState({
		nm_barang: "",
		harga: 0,
		Qty: 0,
	});
	const [params, setParams] = useState({});
	const [data, setData] = useState([]);
	useEffect(() => {
		(async () => {
			let url = "http://localhost:3000/master";
			if (params.q) {
				url += "?q=" + params.q;
			}
			const res = await fetch(url);
			const data = await res.json();
			setData(data);
		})();
	}, [params]);

	const handleDelete = async (id) => {
		await fetch(`http://localhost:3000/master/${id}`, {
			method: "DELETE",
		});
		setData(data.filter((item) => item.id !== id));
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		await fetch("http://localhost:3000/master", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(input),
		});
		setInput({
			nm_barang: "",
			harga: 0,
			Qty: 0,
		});
		setData([...data, input]);
	};

	return (
		<div className="h-screen w-full flex justify-center">
			<div className="container">
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
						Add
					</button>
					<button className="btn btn-primary">Save</button>
				</div>
				<TableMaster data={data} handleDelete={handleDelete} />
			</div>
		</div>
	);
}
