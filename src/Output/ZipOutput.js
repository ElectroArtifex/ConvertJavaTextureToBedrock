import AbstractOutput from "./AbstractOutput";
import fs from "fs-extra";
import util from "util";
import Utils from "../Utils/Utils";
import zipFolder from "zip-folder";

const zipFolderPromise = util.promisify(zipFolder);

/**
 * Class ZipOutput
 */
class ZipOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async output() {
		Utils.log(`Pack ${this.temp} to ${this.path}`);
		await zipFolderPromise(this.temp, this.path);

		Utils.log(`Clean ${this.temp}`);
		await fs.remove(this.temp);
	}
}

export default ZipOutput;
