import fileToArrayBuffer from "file-to-array-buffer";
import fileSaver from "file-saver";

/**
 * @type {HTMLInputElement|null}
 */
let selector = null;
/**
 * @type {function|null}
 */
let selectorLastChangeListener = null;

/**
 * @param {ArrayBuffer} output
 * @param {string} filename
 *
 * @returns {Promise<>}
 */
async function downloadFile(output, filename) {
	fileSaver(new Blob([output]), filename);
}

/**
 * @param {string} title
 * @param {Object} filter
 * @returns {Promise<Array|null>}
 */
async function selectFile(title, filter) {
	return new Promise((resolve, reject) => {
		resetFileSelector();

		selector = document.createElement("input");

		selector.type = "file";

		selector.style.display = "none";

		if (selectorLastChangeListener !== null) {
			selector.removeEventListener("change", selectorLastChangeListener);
			selectorLastChangeListener = null;
		}

		selector.title = title;

		selector.accept = filter.extensions.map((ext) => {
			return ("." + ext);
		}).join(" ");

		selectorLastChangeListener = async () => {
			if (selector.files.length === 0) {
				resolve(null);
				return;
			}

			const file = selector.files[0];

			resetFileSelector();

			const buffer = await fileToArrayBuffer(file);

			resolve([buffer, file.name]);
		};

		selector.addEventListener("change", selectorLastChangeListener);

		document.body.appendChild(selector);

		selector.click();
	});
}

/**
 *
 */
function resetFileSelector() {
	if (selector !== null) {
		if (selectorLastChangeListener !== null) {
			selector.removeEventListener("change", selectorLastChangeListener);
			selectorLastChangeListener = null;
		}

		document.body.removeChild(selector);

		selector = null;
	}
}

export {downloadFile, selectFile};
