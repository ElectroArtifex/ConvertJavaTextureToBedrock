import AbstractOutput from "./AbstractOutput";
import FolderOutput from "./FolderOutput";
import fs from "fs-extra";
import OutputError from "./OutputError";
import path from "path";
import ZipOutput from "./ZipOutput";

/**
 * @param {string} output
 * @param {string} temp
 *
 * @returns {AbstractOutput}
 *
 * @throws {OutputError}
 */
function detectOutput(output, temp) {
	if (fs.existsSync(output)) {
		throw new OutputError(`The output ${output} exists already!`);
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
