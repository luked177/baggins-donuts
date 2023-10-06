import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./utils/Theme/ThemeContext.jsx";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
