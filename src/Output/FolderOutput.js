import AbstractOutput from "./AbstractOutput";
import fs from "fs-extra";
import Utils from "../Utils/Utils";

/**
 * Class FolderOutput
 */
class FolderOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async output() {
		Utils.log(`Move ${this.temp} to ${this.path}`);

		await fs.rename(this.temp, this.path);
	}
}

export default FolderOutput;
