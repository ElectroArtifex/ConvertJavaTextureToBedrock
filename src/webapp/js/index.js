import {downloadFile, selectFile} from "./selector";
import path from "path";
import swal from "sweetalert";
import Worker from "./worker";
import "./../css/style.less";

document.addEventListener("DOMContentLoaded", () => {
	const selectInputFileButton = document.getElementById("selectInputFileButton");
	selectInputFileButton.addEventListener("click", selectInputFile);

	/**
	 * @type {Array|null}
	 */
	let input = null;

	const worker = Worker();
	worker.addEventListener("message", afterConvert);

	/**
	 * @returns {Promise<>}
	 */
	async function selectInputFile() {
		input = await selectFile("Select input file", {
			name: "Input files (*.zip)",
			extensions: ["zip"]
		});
		if (input === null) {
			return;
		}

		await startConvert(input);
	}

	/**
	 * @param {Array} input
	 *
	 * @returns {Promise<>}
	 */
	async function startConvert(input) {
		swal({
			text: "Start conversion ...",
			buttons: false,
			closeOnClickOutside: false,
			closeOnEsc: false
		});

		worker.postMessage(input);
	}

	/**
	 * @param {Event} e
	 *
	 * @returns {Promise<>}
	 */
	async function afterConvert(e) {
		const {log, err, output} = e.data;

		if (log) {
			swal({
				text: log,
				buttons: false,
				closeOnClickOutside: false,
				closeOnEsc: false
			});
			return;
		}

		if (err) {
			swal({
				text: `Conversion was failed\n\nError:\n${err}`,
				icon: "error"
			});
			return;
		}

		await swal({
			text: "Conversion was successfully",
			icon: "success",
			buttons: {
				download: "Download"
			}
		});

		downloadFile(output, path.parse(input[1]).name + ".mcpack");
	}
});
