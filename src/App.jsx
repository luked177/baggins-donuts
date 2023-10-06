import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components";
import { Themes } from "./utils/Theme/ThemeHelper";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./utils/Theme/ThemeContext";
import "./App.css";

const donutData = [
	{ name: "Luke", donuts: 2, croissants: 5 },
	{ name: "Cal", donuts: 6, croissants: 4 },
	{ name: "Jordan", donuts: 3, croissants: 6 },
	{ name: "Chris", donuts: 0, croissants: 2 },
	{ name: "Jamie", donuts: 1, croissants: 3 },
	{ name: "Feargus", donuts: 0, croissants: 1 },
];

function mapNumberToEmojis(number, isCroissant = false) {
	if (typeof number !== "number" || number < 0) {
		return "Input is not a valid non-negative number.";
	}
	const emoji = isCroissant ? "🥐" : "🍩";
	const emojisArray = new Array(number).fill(emoji);
	return emojisArray.join("");
}

function App() {
	const { selectedTheme, updateTheme } = useContext(ThemeContext);
	return (
		<main className='mainContent'>
			<div className='header'>
				<span className='headerText'>Baggins D🍩nuts</span>
				{selectedTheme === Themes.Light ? <Sun className='headerIcon' onClick={() => updateTheme(Themes.Dark)} /> : <Moon className='headerIcon' onClick={() => updateTheme(Themes.Light)} />}
			</div>
			<div className='table'>
				<Table aria-describedby='donutTable' aria-label='donutTable'>
					<TableHeader>
						<Column className={"columnHeader"} isRowHeader>
							Name
						</Column>
						<Column className={"columnHeader"}>Donuts</Column>
						<Column className={"columnHeader"}>Croissants</Column>
					</TableHeader>
					<TableBody>
						{donutData?.map((d, i) => (
							<Row key={i}>
								<Cell className={"tableCellName"}>{d?.name}</Cell>
								<Cell className={"tableCell"}>{mapNumberToEmojis(d?.donuts)}</Cell>
								<Cell className={"tableCell"}>{mapNumberToEmojis(d?.croissants, true)}</Cell>
							</Row>
						))}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}

export default App;
