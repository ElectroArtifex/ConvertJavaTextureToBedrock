import AbstractInput from "./AbstractInput";
import FolderInput from "./FolderInput";
import fs from "fs-extra";
import InputError from "./InputError";
import path from "path";
import ZipInput from "./ZipInput";

/**
 * @param {string} input
 * @param {string} temp
 *
 * @returns {Promise<AbstractInput>}
 *
 * @throws {InputError}
 */
async function detectInput(input, temp) {
	if (!fs.existsSync(input)) {
		throw new InputError(`The input ${input} does not exists!`);
	}

	const ext = path.extname(input).toLowerCase().substr(1);

	switch (ext) {
		case "zip":
			return new ZipInput(input, temp);

		default:
			return new FolderInput(input, temp);
	}
}

export default detectInput;
