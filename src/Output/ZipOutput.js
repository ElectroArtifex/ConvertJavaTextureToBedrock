import AbstractOutput from "./AbstractOutput";
import fs from "fs-extra";
import Utils from "../Utils/Utils";
import {zip} from "zip-a-folder";

/**
 * Class ZipOutput
 */
class ZipOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async output() {
		Utils.log(`Pack ${this.temp} to ${this.path}`);
		await zip(this.temp, this.path);

		Utils.log(`Clean ${this.temp}`);
		try {
			await fs.remove(this.temp);
		} catch (err) {
			// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
			console.warn(err);
		}
	}
}

export default ZipOutput;
