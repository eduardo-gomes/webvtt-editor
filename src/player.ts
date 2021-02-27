import { onPlay, onPause } from "./player/time.js"

const URL = window.URL || window.webkitURL;

function logMessage(message: string, isError: boolean) {
	if (isError)
		console.error(message);
	else
		console.info(message);
}
const videoNode = document.getElementById("video") as HTMLVideoElement;
function playSelectedFile(event: Event) {
	var fileInput = document.getElementById("fileInput") as HTMLInputElement;
	var files = fileInput.files;
	if (null === files)
		return console.error("files is null");
	var file: File = files[0];
	var type = file.type;
	var canPlay = videoNode.canPlayType(type);
	var isError = canPlay === "";
	var message = 'Can play type "' + type + '": ' + (isError ? "no" : canPlay);
	logMessage(message, isError);

	if (isError) {
		return;
	}

	var fileURL = URL.createObjectURL(file);
	videoNode.src = fileURL;
	console.log(fileURL);
	videoNode.load();

	videoNode.play();
}
var inputNode = document.getElementById("fileInput") as HTMLInputElement;

function setupVideoPlayer() {
	inputNode.addEventListener("change", playSelectedFile, false);
}


videoNode.addEventListener("play", onPlay);
videoNode.addEventListener("pause", onPause);


export default setupVideoPlayer;