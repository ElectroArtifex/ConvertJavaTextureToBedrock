/**
 * @type {HTMLInputElement|null}
 */
let selector = null;
/**
 * @type {function|null}
 */
let selectorLastChangeListener = null;

/**
 * @param {string} title
 * @param {Object} filter
 * @param {boolean} folder
 *
 * @returns {Promise<FileList>}
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
			resolve(selector.files);
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

export {select};
