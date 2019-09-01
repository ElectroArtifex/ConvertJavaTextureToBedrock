import fileSaver from "file-saver";
import {select} from "./selector";
import swal from "sweetalert";
import Worker from "./worker";
import "./../css/style.less";

document.addEventListener("DOMContentLoaded", () => {
	const logs = document.createElement("ul");
	logs.classList.add("log");

	const selectInputFileButton = document.getElementById("selectInputFileButton");
	selectInputFileButton.addEventListener("click", selectInputFile);

	const selectInputFolderButton = document.getElementById("selectInputFolderButton");
	selectInputFolderButton.addEventListener("click", selectInputFolder);

	const worker = new Worker();
	worker.addEventListener("message", afterConvert);

	/**
	 * @returns {Promise<>}
	 */
	async function selectInputFile() {
		return startConvert(await select("Select zip file", [".zip"]));
	}

	/**
	 * @returns {Promise<>}
	 */
	async function selectInputFolder() {
		// TODO: Set filter too because directory support can't be detected because webkitdirectory is set in HTMLInputElement.prototype even on mobile browsers which not supports this! :(
		return startConvert(await select("Select folder", [".zip"], true));
	}

	/**
	 * @param {FileList} input
	 *
	 * @returns {Promise<>}
	 */
	async function startConvert(input) {
		if (input.length === 0) {
			return;
		}

		logs.innerHTML = "";

		swal({
			title: "Conversion",
			content: logs,
			buttons: {
				save: {
					text: "Save",
					className: "swal-button--loading"
				}
			},
			closeOnClickOutside: false,
			closeOnEsc: false
		});
		document.querySelector(".swal-button--loading").disabled = true;

		_log("Start conversion");

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
			_log(log);
			return;
		}

		if (err) {
			swal({
				title: "Conversion was failed",
				content: logs,
				icon: "error"
			});

			_log("Conversion failed");
			return;
		}

		const savePopup = swal({
			title: "Conversion was successfully",
			content: logs,
			icon: "success",
			buttons: "Save"
		});

		_log("Conversion finished");

		if (await savePopup) {
			if (output instanceof File) {
				fileSaver(output);
			} else {
				// TODO: Bug iOS `File` is undefined in worker?
				fileSaver(output.data, output.name);
			}
		}
	}

	/**
	 * @param {string} log
	 */
	function _log(log) {
		const li = document.createElement("li");

		li.innerText = log;

		logs.appendChild(li);

		logs.scrollTop = logs.scrollHeight; // Scroll to bottom
	}
});
