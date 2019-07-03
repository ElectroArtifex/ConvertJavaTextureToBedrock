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
		await fs.remove(this.temp);
	}
}

export default ZipOutput;
