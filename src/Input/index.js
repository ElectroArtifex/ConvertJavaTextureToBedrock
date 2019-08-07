import AbstractInput from "./AbstractInput";
import FolderInput from "./FolderInput";
import fs from "fs-extra";
import path from "path";
import ZipInput from "./ZipInput";

/**
 * @param {string} input
 *
 * @returns {Promise<AbstractInput>}
 *
 * @throws {Error}
 */
async function detectInput(input) {
	if (!fs.existsSync(input)) {
		throw new Error(`The input ${input} does not exists!`);
	}

	const ext = path.extname(input).toLowerCase().substr(1);

	switch (ext) {
		case "zip":
			return new ZipInput(input);

		default:
			return new FolderInput(input);
	}
}

export default detectInput;
