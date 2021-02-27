interface subtitleEntry {
	begin: number,
	end: number,
	text: string
};

const subtitles: Array<subtitleEntry> = [];
const subContainer = document.getElementById("entryList") as HTMLDivElement;

function displayList(){
	while (subContainer.lastChild !== null) {
		subContainer.removeChild(subContainer.lastChild);
	}

	subtitles.forEach((entry) => {
		let newNode = subtitleEntryToDivElement(entry);
		subContainer.appendChild(newNode);
	});
}
function subtitleEntryToDivElement(sub: subtitleEntry){
	const newNode = document.createElement("div");
	newNode.innerHTML = `Start:${sub.begin}, end:${sub.end}: ${sub.text}`;
	return newNode;
}

export { subtitleEntry, subtitles, displayList };