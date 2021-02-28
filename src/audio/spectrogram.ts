const spectrumCanvas = document.getElementById("demo-canvas") as HTMLCanvasElement;//document.createElement("canvas");
const spectrumContext = spectrumCanvas.getContext("2d") as CanvasRenderingContext2D;

const audioContext = new window.AudioContext;

var offlineContext: OfflineAudioContext;

function setupSource(media: File) {
	fileToAudioBuffer(media);
}
function fileToAudioBuffer(media: File) {
	media.arrayBuffer().then(
		function (arrayBuffer) {
			audioContext.decodeAudioData(arrayBuffer, (buffer) => {
				console.log(buffer);
				generate(buffer);
			}).catch((e) => { console.error(`Fail to decode audio data, type: ${media.type}, error: ${e}`) });
		}
	);
}

function generate(buffer: AudioBuffer) {
	offlineContext = new OfflineAudioContext(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
	let analyser = offlineContext.createAnalyser();
	analyser.fftSize = 1024;
	let audioBuffer = offlineContext.createBufferSource();
	audioBuffer.connect(analyser)
	audioBuffer.buffer = buffer;
	const SAMPLES_PER_FTT = 4096;
	let scp = offlineContext.createScriptProcessor(SAMPLES_PER_FTT, 0, 1);
	scp.connect(offlineContext.destination);

	var FTTSample = 0;
	function grabFFT() {
		analyser.getByteFrequencyData(DATA);
		DATA.forEach(drawn);
		FTTSample++;
	}
	scp.onaudioprocess = grabFFT;

	const DATA = new Uint8Array(analyser.frequencyBinCount);
	const H = spectrumCanvas.height = 255;
	const W = spectrumCanvas.width = buffer.length / SAMPLES_PER_FTT;

	const h = H / DATA.length;
	const lineWidth = 1;

	offlineContext.oncomplete = () => { console.log("complete"); }

	spectrumContext.fillStyle = "hsl(280, 100%, 0%)";
	spectrumContext.fillRect(0, 0, W, H);
	function drawn(value: number, index: number) {
		const x = FTTSample;
		function getStyleFromValue() {
			let rat = value / 255;
			let hue = ((rat * 120) + 280 % 360), sat = "100%", lit = 10 + (90 * rat);
			return `hsl(${hue}, ${sat}, ${lit}%)`;
		}
		spectrumContext.beginPath();
		spectrumContext.strokeStyle = getStyleFromValue();
		spectrumContext.lineWidth = lineWidth;
		spectrumContext.moveTo(x, H - (index * h));
		spectrumContext.lineTo(x, H - (index * h + h));
		spectrumContext.stroke();
	}
	offlineContext.startRendering();
	audioBuffer.start(0);
}

export { setupSource };