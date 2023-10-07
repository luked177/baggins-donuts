import { useState, useEffect } from "react";
import "./FallingDonuts.css";

// eslint-disable-next-line react/prop-types
function Donut({ id }) {
	const [animationDelay, setAnimationDelay] = useState("0s");
	const [fontSize, setFontSize] = useState("10px");

	useEffect(() => {
		generateDonut();
	}, []);

	const generateDonut = () => {
		const newDelay = `${(Math.random() * 16).toFixed(2)}s`;
		const newFontSize = `${Math.floor(Math.random() * 10) + 10}px`;
		setAnimationDelay(newDelay);
		setFontSize(newFontSize);
	};

	const style = { animationDelay, fontSize };

	return (
		<p className='Donut' id={`item${id}`} style={style}>
			{Math.random() > 0.5 ? "🥐" : "🍩"}
		</p>
	);
}

export function FallingDonuts() {
	const donut = Array.from({ length: 200 }, (_, i) => <Donut key={i} id={i} />);

	return <div className='FallingDonuts'>{donut}</div>;
}
