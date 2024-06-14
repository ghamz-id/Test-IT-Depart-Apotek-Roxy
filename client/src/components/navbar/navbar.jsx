import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="navbar bg-base-100 border-b px-10 gap-4 fixed">
			<div className="flex">
				<ul className="menu menu-horizontal gap-2">
					<li className="font-bold">
						<Link to={"/master"}>Master</Link>
					</li>
					<li className="font-bold">
						<Link to={"/transaksi"}>Transaksi</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
