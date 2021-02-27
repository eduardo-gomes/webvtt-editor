const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
const seek = document.getElementById('seek') as HTMLInputElement;
const timeElapsed = document.getElementById('time-elapsed') as HTMLTimeElement;
const timeDuration = document.getElementById('duration') as HTMLTimeElement;

function updateDuration(duration: number) {
	const videoDuration = duration;
	seek.setAttribute('max', videoDuration.toString());
	progressBar.setAttribute('max', videoDuration.toString());
	const time = formatTime(videoDuration);
	timeDuration.innerText = `${time.minutes}:${time.seconds}`;
	timeDuration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}
function onPlay(play: Event) {
	if (play.target === null) return;
	if (!(play.target instanceof HTMLVideoElement)) return;
	const videoNode: HTMLVideoElement = play.target;

	startUpdater(videoNode);
}
function onPause(play: Event) {
	if (play.target === null) return;
	if (!(play.target instanceof HTMLVideoElement)) return;
	const videoNode: HTMLVideoElement = play.target;

	stopUpdater();
}
function update(videoNode: HTMLVideoElement) {
	const duration = videoNode.duration;
	const currentTime = videoNode.currentTime;

	updateDuration(duration);
	updateProgress(currentTime);
}
var updaterInterval: number;
function startUpdater(videoNode: HTMLVideoElement) {
	const INTERVAL = 75;
	updaterInterval = window.setInterval(function () {
		update(videoNode);
	}, INTERVAL);
}
function stopUpdater() {
	window.clearInterval(updaterInterval);
}

function updateProgress(currentTime: number) {
	seek.value = currentTime.toString();
	progressBar.value = currentTime;

	var time = formatTime(currentTime);
	timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
	timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

function formatTime(timeInSeconds: number) {
	try {
		const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 12);

		return {
			minutes: result.substr(3, 2),
			seconds: result.substr(6, 6)
		};
	} catch (error) {
		return {
			minutes: "NaN",
			seconds: "NaN"
		};
	}
};

export { onPause, onPlay };