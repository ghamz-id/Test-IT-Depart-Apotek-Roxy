import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="navbar bg-base-100 border-b px-10 gap-4">
			<h1 className="font-bold text-xl">Master Barang</h1>
			<div className="flex">
				<ul className="menu menu-horizontal gap-2">
					<li className="border-b">
						<Link to={"/master"}>Master</Link>
					</li>
					<li className="border-b">
						<Link to={"/transaksi"}>Transaksi</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
