import AbstractInput from "../input/AbstractInput";
import AbstractOutput from "./AbstractOutput";
import BufferOutput from "./BufferOutput";
import FolderOutput from "./FolderOutput";
import fs from "fs-extra";
import isBuffer from "./isBuffer";
import Log from "../log/Log";
import path from "path";
import ZipOutput from "./ZipOutput";

/**
 * @param {string|Buffer|ArrayBuffer|Uint8Array} output
 * @param {AbstractInput} input
 * @param {Log} log
 *
 * @returns {Promise<AbstractOutput>}
 *
 * @throws {Error}
 */
async function detectOutput(output, input, log) {
	if (isBuffer(output)) {
		return new BufferOutput(output, input, log);
	}

	if (!fs) {
		throw new Error(`Browser only supports Buffer output!`);
	}

	if (fs.existsSync(output)) {
		log.log(`Remove exists output`);

		try {
			await fs.remove(output);
		} catch (err) {
			// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
			log.warn(err);
		}
	}

	const ext = path.extname(output).toLowerCase().substr(1);

	switch (ext) {
		case "mcpack":
		case "zip":
			return new ZipOutput(output, input, log);

		default:
			return new FolderOutput(output, input, log);
	}
}

export default detectOutput;
