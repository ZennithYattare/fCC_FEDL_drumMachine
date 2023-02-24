/** @format */

import { useState, useEffect } from "react";
import "./App.css";

const drumPads = [
	{
		key: "Q",
		id: "Heater-1",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	{
		key: "W",
		id: "Heater-2",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	{
		key: "E",
		id: "Heater-3",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	{
		key: "A",
		id: "Heater-4",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	{
		key: "S",
		id: "Clap",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	{
		key: "D",
		id: "Open-High-Hat",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	{
		key: "Z",
		id: "Kick-n-Hat",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	{
		key: "X",
		id: "Kick",
		src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	{
		key: "C",
		id: "Closed-High-Hat",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

const DrumPad = ({ drumPad, setPressedKey }) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	const handleKeyPress = (event) => {
		const key = event.key.toUpperCase();
		if (key === drumPad.key) {
			playAudio();
		}
	};

	const playAudio = () => {
		const audio = document.getElementById(drumPad.key);
		setActive(true);
		setTimeout(() => {
			setActive(false);
		}, 200);
		audio.currentTime = 0;
		audio.play();
		setPressedKey(drumPad.id.replace(/-/g, " "));
	};

	return (
		<div
			onClick={playAudio}
			className={`drum-pad m-2 inline-block w-20 p-4 text-center font-mono text-2xl font-semibold shadow-[2px_2px_2px_black] hover:bg-zinc-400 sm:m-4 ${
				active
					? "border-2 border-zinc-700"
					: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
			}`}
			id={drumPad.id}
		>
			<audio src={drumPad.src} className="clip" id={drumPad.key}></audio>
			{drumPad.key}
		</div>
	);
};

function App() {
	const [pressedKey, setPressedKey] = useState("Start drumming!");

	return (
		<div className="App">
			<div
				id="drum-machine"
				className="flex h-screen w-screen place-items-center bg-[url('./assets/vaporwave.jpg')] bg-cover bg-center"
			>
				<div
					id="drumMachineDiv"
					className="mx-auto max-w-xl border-4 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc] bg-[#dcd5d5] shadow-[5px_5px_5px_black] 2xl:w-1/5"
				>
					<div className="bg-gradient-to-r from-[#66a1d2] to-[#b252a1] p-1 font-mono text-lg font-bold text-gray-50">
						freeCodeCamp: Drum Machine
					</div>
					<h3
						id="display"
						className="mx-auto my-4 h-16 w-4/5 p-3 text-center font-mono text-2xl sm:text-3xl"
					>
						{pressedKey}
					</h3>
					<div className="mx-auto mb-4 grid w-max grid-cols-3">
						{drumPads.map((drumPad) => {
							return (
								<DrumPad
									key={drumPad.id}
									drumPad={drumPad}
									setPressedKey={setPressedKey}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
