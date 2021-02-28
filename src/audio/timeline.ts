import { getVideoTime } from "../player.js";
import { getSpectrum } from "./spectrogram.js";

const timeline = document.getElementById("demo-canvas") as HTMLCanvasElement;
const timelineContest = timeline.getContext("2d") as CanvasRenderingContext2D;

function updateCanvasSize() {
	const width = timeline.clientWidth;
	const height = timeline.clientHeight;
	timeline.width = width;
	timeline.height = height;
}

function updateTimeline() {
	window.requestAnimationFrame(updateTimeline);
	const { image } = getSpectrum();

	const sourceStart = { w: 0, h: image.height / 2 }, sourceSize = { w: image.width, h: image.height / 2 };
	timelineContest.drawImage(image, sourceStart.w, sourceStart.h, sourceSize.w, sourceSize.h, 0, 0, timeline.width, timeline.height);
	drawPos();
}

function drawPos() {
	const { duration, currentTime } = getVideoTime();
	const currentTimeInPixel = Math.round(timeline.width * currentTime / duration);

	timelineContest.beginPath();
	timelineContest.strokeStyle = "blue";
	timelineContest.lineWidth = 1;
	timelineContest.moveTo(currentTimeInPixel, 0);
	timelineContest.lineTo(currentTimeInPixel, timeline.height);
	timelineContest.stroke();
}

updateCanvasSize();
timelineContest.fillRect(0, 0, timeline.width, timeline.height);

export { updateTimeline };