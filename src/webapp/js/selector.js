import fileToArrayBuffer from "file-to-array-buffer";
import fileSaver from "file-saver";
import JSZip from "jszip";
import path from "path";
import swal from "sweetalert";

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
 * @param {string} type
 *
 * @returns {Promise<>}
 */
async function download(output, filename, type) {
	fileSaver(new File([output], filename, {type}));
}

/**
 * @param {string} title
 * @param {Object} filter
 * @param {boolean} folder
 *
 * @returns {Promise<Array|null>}
 */
async function select(title, filter, folder = false) {
	return new Promise((resolve, reject) => {
		resetSelector(); // Allows select same file again without reset files/value

		selector = document.createElement("input");

		selector.type = "file";

		if (folder) {
			selector.webkitdirectory = folder;
		}

		selector.style.display = "none";

		selector.title = title;

		selector.accept = filter.join(" ");

		selectorLastChangeListener = async () => {
			const files = selector.files;

			if (files.length === 0) {
				resolve(null);

				return;
			}

			let buffer, name = "";

			// TODO: Add this somehow to a worker
			if (files.length > 1) {
				swal({
					text: "Pack",
					buttons: false,
					closeOnClickOutside: false,
					closeOnEsc: false
				});

				const zip = new JSZip();

				for (const file of files) {
					const paths = file.webkitRelativePath.split(path.sep);

					name = paths.shift();

					zip.file(paths.join(path.sep), await fileToArrayBuffer(file));
				}

				buffer = await zip.generateAsync({
					type: "arraybuffer"
				});
			} else {
				const file = files[0];

				buffer = await fileToArrayBuffer(file);

				name = file.name;
			}

			resolve([buffer, name]);
		};

		selector.addEventListener("change", selectorLastChangeListener);

		document.body.appendChild(selector);

		selector.click();
	});
}

/**
 *
 */
function resetSelector() {
	if (selector !== null) {
		if (selectorLastChangeListener !== null) {
			selector.removeEventListener("change", selectorLastChangeListener);
			selectorLastChangeListener = null;
		}

		document.body.removeChild(selector);

		selector = null;
	}
}

export {download, select};
