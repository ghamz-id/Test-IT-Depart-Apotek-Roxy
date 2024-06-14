export default function TableMaster({ data, handleDelete }) {
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
						{data.map((item, i) => (
							<tr className="hover" key={i}>
								<td className="font-bold">
									{item.id >= 10
										? `BR-00${item.id}`
										: item.id >= 100
										? `BR-0${item.id}`
										: item.id >= 1000
										? `BR-${item.id}`
										: `BR-000${item.id}`}
								</td>
								<td>{item.nm_barang}</td>
								<td>
									{new Intl.NumberFormat("id-ID", {
										style: "currency",
										currency: "IDR",
									}).format(item.harga)}
								</td>
								<td>{item.Qty}</td>
								<td className="flex gap-2">
									<button className="btn btn-warning btn-sm">Edit</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="btn btn-error btn-sm"
									>
										Hapus
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
