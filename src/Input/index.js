import AbstractInput from "./AbstractInput";
import BufferInput from "./BufferInput";
import FolderInput from "./FolderInput";
import fs from "fs-extra";
import MetadataConverter from "../Converter/MetadataConverter";
import path from "path";
import ZipInput from "./ZipInput";

/**
 * @param {string|Buffer|Array} input
 *
 * @returns {Promise<AbstractInput>}
 *
 * @throws {Error}
 */
async function detectInput(input) {
	if (Buffer.isBuffer(input)) {
		return new BufferInput(input);
	}

	if (Array.isArray(input)) {
		if (Buffer.isBuffer(input[0])) {
			return new BufferInput(input[0], input[1]);
		}

		throw new Error(`Invalid array input!`);
	}

	if (typeof input !== "string") {
		throw new Error(`Invalid string input!`);
	}

	if (!fs.existsSync(input)) {
		throw new Error(`The input ${input} does not exists!`);
	}

	if (fs.statSync(input).isDirectory()) {
		if (!fs.existsSync(path.join(input, MetadataConverter.PACK_MCMETA))) { // Prevents copy whole wrong folders
			throw new Error(`Invalid folder input ${input} - Missing ${MetadataConverter.PACK_MCMETA}!`);
		}

		return new FolderInput(input);
	}


	const ext = path.extname(input).toLowerCase().substr(1);

	switch (ext) {
		case "zip":
			return new ZipInput(input);

		default:
			throw new Error(`The input ${input} is no zip archive or folder!`);
	}
}

export default detectInput;
