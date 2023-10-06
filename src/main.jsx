import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./utils/Theme/ThemeContext.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeContextProvider>
			<App />
		</ThemeContextProvider>
	</React.StrictMode>
);
