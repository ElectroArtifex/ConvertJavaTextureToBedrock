import AbstractInput from "../Input/AbstractInput";
import AbstractOutput from "./AbstractOutput";
import FolderOutput from "./FolderOutput";
import fs from "fs-extra";
import path from "path";
import Utils from "../Utils/Utils";
import ZipOutput from "./ZipOutput";

/**
 * @param {string} output
 * @param {string} temp
 * @param {AbstractInput} input
 *
 * @returns {Promise<AbstractOutput>}
 *
 * @throws {Error}
 */
async function detectOutput(output, temp, input) {
	if (fs.existsSync(output)) {
		Utils.log(`Remove exists output ${output}`);

		try {
			await fs.remove(output);
		} catch (err) {
			// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
			console.warn(err);
		}
	}

	const ext = path.extname(output).toLowerCase().substr(1);

	switch (ext) {
		case "mcpack":
		case "zip":
			return new ZipOutput(output, temp, input);

		default:
			return new FolderOutput(output, temp, input);
	}
}

export default detectOutput;
