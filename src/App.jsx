import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components";
import { Themes } from "./utils/Theme/ThemeHelper";
import { Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "./utils/Theme/ThemeContext";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FallingDonuts } from "./FallingDonuts/FallingDonuts";
import dayjs from "dayjs";

function App() {
	const { selectedTheme, updateTheme } = useContext(ThemeContext);
	const [modal, setModal] = useState(false);
	const [modalDetails, setModalDetails] = useState({ awardedTo: null, awardedDate: null, awardedReason: null });

	const { data: donutData } = useQuery({
		queryKey: ["DonutData"],
		queryFn: async () => {
			const res = await axios.get("https://bagginsdonutsapi-fa.azurewebsites.net/api/GetDonutInfo?code=316AajT8wIoy5TjKyjOEeq4Up_VOyfvug1fRcfma5MDwAzFuPvHVMw==");
			return res.data;
		},
	});

	function mapNumberToEmojis(awardArray, isCroissant = false, name) {
		const emoji = isCroissant ? "🥐" : "🍩";
		return awardArray?.map((a) => (
			<span
				style={{ cursor: "pointer" }}
				key={a?.awardId}
				onClick={() => setModal(true) + setModalDetails({ awardedDate: dayjs(a?.awardedDate).format("DD/MM/YYYY"), awardedTo: name, awardedReason: a?.awardedReason })}
			>
				{emoji}
			</span>
		));
	}

	return (
		<main className='mainContent' onClick={() => modal && setModal(false)}>
			<div className='header'>
				<span className='headerText'>
					Baggins D<span style={{ fontSize: "19px" }}>🍩</span>nuts
				</span>
				{selectedTheme === Themes.Light ? <Sun className='headerIcon' onClick={() => updateTheme(Themes.Dark)} /> : <Moon className='headerIcon' onClick={() => updateTheme(Themes.Light)} />}
			</div>
			<FallingDonuts />
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
										{mapNumberToEmojis(d?.donuts, false, d?.name)}
									</Cell>
									<Cell className={"tableCell"}>{mapNumberToEmojis(d?.croissants, true, d?.name)}</Cell>
								</Row>
							);
						})}
					</TableBody>
				</Table>
			</div>
			{modal && (
				<div id='myModal' className='modal'>
					<div className='modal-content'>
						<p>Awarded to: {modalDetails?.awardedTo}</p>
						<p>Date: {modalDetails?.awardedDate}</p>
						<p>Reason: {modalDetails?.awardedReason}</p>
					</div>
				</div>
			)}
		</main>
	);
}

export default App;
