import AbstractOutput from "./AbstractOutput";
import FolderOutput from "./FolderOutput";
import fs from "fs-extra";
import OutputError from "./OutputError";
import path from "path";
import Utils from "../Utils/Utils";
import ZipOutput from "./ZipOutput";

/**
 * @param {string} output
 * @param {string} temp
 *
 * @returns {Promise<AbstractOutput>}
 *
 * @throws {OutputError}
 */
async function detectOutput(output, temp) {
	if (fs.existsSync(output)) {
		Utils.log(`Remove exists output ${output}`);

		try {
			await fs.remove(output);
		} catch (err) {
			// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
		}
	}

	const ext = path.extname(output).toLowerCase().substr(1);

	switch (ext) {
		case "mcpack":
		case "zip":
			return new ZipOutput(output, temp);

		default:
			return new FolderOutput(output, temp);
	}
}

export default detectOutput;
