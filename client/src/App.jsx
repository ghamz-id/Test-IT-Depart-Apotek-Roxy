import * as React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import "./index.css";
import PageMaster from "./pages/page.master";
import PageTransaksi from "./pages/page.transaksi";
import MainLayout from "./components/layout";

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/master" replace />,
			},
			{
				path: "/transaksi",
				element: <PageTransaksi />,
			},
			{
				path: "/master",
				element: <PageMaster />,
				children: [
					{
						path: ":id",
						element: <PageMaster />,
					},
				],
			},
		],
	},
]);

export default function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}
