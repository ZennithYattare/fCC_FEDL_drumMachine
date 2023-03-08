/** @format */

import { useState, useEffect } from "react";
import "./App.css";

// Storing the drum pads in an array of objects
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

// * DrumPad component to render each drum pad
const DrumPad = ({ drumPad, setPressedKey }) => {
	const [active, setActive] = useState(false);

	// Adding event listener to the document to listen for keypresses
	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	// Function to handle keypresses
	// If the key pressed is the same as the key of the drum pad, then play the audio
	const handleKeyPress = (event) => {
		const key = event.key.toUpperCase();
		if (key === drumPad.key) {
			playAudio();
		}
	};

	// Function to play the audio
	const playAudio = () => {
		// Getting the audio element by id
		const audio = document.getElementById(drumPad.key);
		// Using setActive to change the border color of the drum pad
		setActive(true);
		setTimeout(() => {
			setActive(false);
		}, 200);
		// Playing the audio
		audio.currentTime = 0;
		audio.play();
		// Setting the pressed key to display in the display div
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
						{/* Mapping through the drumPads array and rendering a DrumPad component for each drum pad */}
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
