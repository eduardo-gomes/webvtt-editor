import { displayList, subtitleEntry, subtitles } from "../subtitles.js";

const subText = document.getElementById("subtitle-textarea") as HTMLTextAreaElement;
const enterButton = document.getElementById("subtitle-ok") as HTMLButtonElement;
let startTime: number, endTime: number;

function subtitleEntryFromTextarea(): subtitleEntry {
	return {
		begin: startTime,
		end: endTime,
		text: subText.value
	};
}

function currentTextToSubtitle() {
	let newEntry = subtitleEntryFromTextarea();
	subtitles.push(newEntry);
	subText.value = "";
	displayList();
}

enterButton.addEventListener("click", currentTextToSubtitle);