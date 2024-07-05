import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { createSearchParams, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { FallingDonuts } from "./FallingDonuts/FallingDonuts";
import { SuggestDonutModal } from "./suggestDonutModal/suggestDonutModal";
import { ThemeContext } from "./utils/Theme/ThemeContext";
import { Themes } from "./utils/Theme/ThemeHelper";

function App() {
	const { selectedTheme, updateTheme } = useContext(ThemeContext);
	const navigate = useNavigate()
	const search = useLocation().search
	const showSuggestDonut = createSearchParams(search).get("suggestDonut")

	return (
		<main className='mainContent'>
			<div className='header'>
				<span className='headerText'>
					Baggins D<span style={{ fontSize: "19px" }}>🍩</span>nuts
				</span>
				<div style={{display: 'flex', gap: '32px'}}>
					<NavLink className='headerLink' to={'/'}>Donuts Leaderboard</NavLink>
					<NavLink className='headerLink' to={'/suggestions'}>Suggestions</NavLink>
				</div>
				{selectedTheme === Themes.Light ? <Sun className='headerIcon' onClick={() => updateTheme(Themes.Dark)} /> : <Moon className='headerIcon' onClick={() => updateTheme(Themes.Light)} />}
			</div>
			<FallingDonuts />
			<Outlet />
			<button onClick={(e) => {
				e.stopPropagation()
				navigate({search: createSearchParams({suggestDonut: 'true'}).toString()})}} className="suggestTitle">Suggest a donut</button>
			{showSuggestDonut && <SuggestDonutModal />}
		</main>
	);
}

export default App;
