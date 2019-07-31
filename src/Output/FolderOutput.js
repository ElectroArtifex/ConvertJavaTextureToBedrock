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

		try {
			await fs.rename(this.temp, this.path);
		} catch (err) {
			// TODO: Fix EXDEV: cross-device link not permitted
			console.warn(err);

			Utils.log(`Copy ${this.temp} to ${this.path}`);
			await fs.copy(this.temp, this.path);

			Utils.log(`Clean ${this.temp}`);
			try {
				await fs.remove(this.temp);
			} catch (err) {
				// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
				console.warn(err);
			}
		}
	}
}

export default FolderOutput;
