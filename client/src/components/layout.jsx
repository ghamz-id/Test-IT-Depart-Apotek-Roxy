import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";

export default function MainLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
