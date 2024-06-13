import { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		(async () => {
			const res = await fetch("http://localhost:3000/master");
			const data = await res.json();
			setData(data);
		})();
	}, []);

	return (
		<div className="h-screen w-full flex justify-center">
			<div className="container">
				{/* FORM */}
				<div>
					<h1>Master Barang</h1>
					<div className="w-full">
						<label htmlFor="search">Search</label>
						<input type="text" id="search" name="q" className="border" />
						<div>
							<div>
								<label htmlFor="id_barang">Id Barang</label>
								<input
									type="text"
									id="id_barang"
									name="id"
									disabled
									className="border"
								/>
								<label htmlFor="id_barang">Nama Barang</label>
								<input
									type="text"
									id="id_barang"
									name="id"
									className="border"
								/>
							</div>
							<div>
								<label htmlFor="id_barang">Harga</label>
								<input
									type="text"
									id="id_barang"
									name="id"
									className="border"
								/>
								<label htmlFor="id_barang">Qty</label>
								<input
									type="text"
									id="id_barang"
									name="id"
									className="border"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* TABLE */}
				<div className="overflow-x-auto">
					<table className="table">
						<thead>
							<tr>
								<th>Id Barang</th>
								<th>Nama Barang</th>
								<th>Harga</th>
								<th>Quantity</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, i) => (
								<tr className="hover" key={i}>
									<td>BR-000{item.id}</td>
									<td>{item.nm_barang}</td>
									<td>{item.harga.toLocaleString()}</td>
									<td>{item.Qty}</td>
									<td>
										<button className="btn btn-sm border">Edit</button>
										<a href={`/${item.id}`} className="btn btn-sm border">
											Hapus
										</a>
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

export default App;
