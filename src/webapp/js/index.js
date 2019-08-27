import {download, select} from "./selector";
import path from "path";
import swal from "sweetalert";
import Worker from "./worker";
import "./../css/style.less";

document.addEventListener("DOMContentLoaded", () => {
	const selectInputFileButton = document.getElementById("selectInputFileButton");
	selectInputFileButton.addEventListener("click", selectInputFile);

	const selectInputFolderButton = document.getElementById("selectInputFolderButton");
	selectInputFolderButton.addEventListener("click", selectInputFolder);

	/**
	 * @type {Array|null}
	 */
	let input = null;

	/**
	 * @type {Worker}
	 */
	const worker = new Worker();
	worker.addEventListener("message", afterConvert);

	/**
	 * @returns {Promise<>}
	 */
	async function selectInputFile() {
		input = await select("Select zip file", [".zip"]);

		return startConvert();
	}

	/**
	 * @returns {Promise<>}
	 */
	async function selectInputFolder() {
		input = await select("Select folder", [".zip"], true); // TODO: Set filter too because directory support can't be detected because webkitdirectory is set in HTMLInputElement.prototype even on mobile browsers which not supports this :(

		return startConvert();
	}

	/**
	 * @returns {Promise<>}
	 */
	async function startConvert() {
		if (input === null) {
			return;
		}

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
			buttons: "Save"
		});

		download(output, path.parse(input[1]).name + ".mcpack", "application/zip");
	}
});
