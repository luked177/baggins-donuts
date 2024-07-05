import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components";
import "../App.css";
import { DonutInfo } from "./donutInfo";

// eslint-disable-next-line react/prop-types
export const DonutsTable = () => {
    const [modal, setModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({ awardedTo: null, awardedDate: null, awardedReason: null });

    const { data: donutData } = useQuery({
		queryKey: ["DonutData"],
		queryFn: async () => {
			const res = await axios.get("https://bagginsdonutsapi-fa.azurewebsites.net/api/GetDonutInfo?code=316AajT8wIoy5TjKyjOEeq4Up_VOyfvug1fRcfma5MDwAzFuPvHVMw==");
			// const res = await axios.get("http://localhost:7199/api/GetDonutInfo");
			return res.data;
		},
	});

	function mapNumberToEmojis(awardArray, isCroissant = false, name) {
		const emoji = isCroissant ? "🥐" : "🍩";
		return awardArray?.map((a) => (
			<span
				style={{ cursor: "pointer" }}
				key={a?.awardId}
				onClick={(e) => e.stopPropagation() + setModal(true) + setModalDetails([{ awardedDate: dayjs(a?.awardedDate).format("DD/MM/YYYY"), awardedTo: name, awardedReason: a?.awardedReason }])}
			>
				{a.isChristmas ? "🍪" : emoji}
			</span>
		));
	}
    return(
        <>
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
						<Column className={"columnHeader"}>Score</Column>
					</TableHeader>
					<TableBody>
						{donutData?.map((d, i) => {
							return (
								<Row key={i}>
									<Cell className={"tableCellName"}>{d?.name}</Cell>
									<Cell style={{ paddingRight: "16px", display: 'flex' }} className={"tableCell"}>
										{Array.from({length: d.archivedBoxes.length}).map((_,i) => {
											const donuts = d.archivedBoxes[i].donuts.map(a => ({ awardedDate: dayjs(a?.awardedDate).format("DD/MM/YYYY"), awardedTo: d?.name, awardedReason: a?.awardedReason }))

											return <img style={{height: '32px', width: '32px', cursor: 'pointer'}} src="./archiveDonuts.png" alt="archive donuts box" key={`archiveBox-${i}`} 
											onClick={(e) => {
												e.stopPropagation()
												setModal(true)
												setModalDetails(donuts)
											
											}
											} />
											})}
										{mapNumberToEmojis(d?.donuts, false, d?.name)}
									</Cell>
									<Cell className={"tableCell"}>{mapNumberToEmojis(d?.croissants, true, d?.name)}</Cell>
									<Cell className={"tableCell scoreCell"}>{d?.score}</Cell>
								</Row>
							);
						})}
					</TableBody>
				</Table>
			</div>
			{modal && (
				<DonutInfo modalDetails={modalDetails} setModal={setModal} />
			)}
            </>
    )
}