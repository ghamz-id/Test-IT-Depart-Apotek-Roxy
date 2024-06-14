export default function TableTransaksi() {
	return (
		<>
			<div className="overflow-y-auto border">
				<table className="table">
					<thead className="bg-blue-300 text-sm">
						<tr>
							<th>Id Barang</th>
							<th>Nama Barang</th>
							<th>Harga</th>
							<th>Quantity</th>
							<th>Option</th>
						</tr>
					</thead>
					<tbody>
						<tr className="hover">
							<td className="font-bold">{`BR-0001`}</td>
							<td>{`Amoxsan`}</td>
							<td>
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
								}).format(20000)}
							</td>
							<td>{`15`}</td>
							<td className="flex gap-2">
								<button className="btn btn-warning btn-sm">Edit</button>
								<button className="btn btn-error btn-sm">Hapus</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
