import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./utils/Theme/ThemeContext.jsx";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DonutsTable } from "./donutsTable/donutsTable.jsx";
import { Suggestions } from "./suggestions/suggestions.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
		children: [{
			path: '*',
			element: <DonutsTable />
		},
	{
		path: 'suggestions',
		element: <Suggestions />
	}]
	}
])

const AppRouter = () => {
	return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeContextProvider>
				<AppRouter />
			</ThemeContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
