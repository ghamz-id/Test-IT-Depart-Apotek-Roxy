import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PageMaster from "./pages/page.master";
import PageTransaksi from "./pages/page.transaksi";

const router = createBrowserRouter([
	{
		path: "/transaksi",
		element: <PageTransaksi />,
	},
	{
		path: "/master",
		element: <PageMaster />,
	},
]);

export default function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}
