import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components";
import { Themes } from "./utils/Theme/ThemeHelper";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./utils/Theme/ThemeContext";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
	const { data: donutData } = useQuery({
		queryKey: ["DonutData"],
		queryFn: async () => {
			const res = await axios.get("https://bagginsdonutsapi-fa.azurewebsites.net/api/GetDonutInfo?code=316AajT8wIoy5TjKyjOEeq4Up_VOyfvug1fRcfma5MDwAzFuPvHVMw==");
			return res.data;
		},
	});
	return (
		<main className='mainContent'>
			<div className='header'>
				<span className='headerText'>Baggins D🍩nuts</span>
				{selectedTheme === Themes.Light ? <Sun className='headerIcon' onClick={() => updateTheme(Themes.Dark)} /> : <Moon className='headerIcon' onClick={() => updateTheme(Themes.Light)} />}
			</div>
			<div className='table'>
				<Table aria-describedby='donutTable' aria-label='donutTable'>
					<TableHeader>
						<Column style={{ paddingRight: "16px" }} className={"columnHeader"} isRowHeader>
							Name
						</Column>
						<Column className={"columnHeader"} style={{ paddingRight: "16px" }}>
							Donuts
						</Column>
						<Column className={"columnHeader"}>Croissants</Column>
					</TableHeader>
					<TableBody>
						{donutData?.map((d, i) => {
							return (
								<Row key={i}>
									<Cell className={"tableCellName"}>{d?.name}</Cell>
									<Cell style={{ paddingRight: "16px" }} className={"tableCell"}>
										{mapNumberToEmojis(d?.donuts)}
									</Cell>
									<Cell className={"tableCell"}>{mapNumberToEmojis(d?.croissants, true)}</Cell>
								</Row>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}

export default App;
