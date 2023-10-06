import { createContext, useState } from "react";
import { Themes } from "./ThemeHelper";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeContextProvider = ({ children }) => {
	const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem(Themes.Name) ?? Themes.Light);

	const updateTheme = (themeType) => {
		setSelectedTheme(themeType);
		localStorage.setItem(Themes.Name, themeType);
		document.documentElement.className = themeType;
	};

	if (document.documentElement.className?.length === 0) {
		updateTheme(selectedTheme);
	}
	return (
		<ThemeContext.Provider
			value={{
				selectedTheme,
				updateTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
