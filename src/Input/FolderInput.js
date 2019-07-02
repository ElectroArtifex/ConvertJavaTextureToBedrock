import AbstractInput from "./AbstractInput";
import fs from "fs-extra";
import path from "path";
import Utils from "../Utils/Utils";

/**
 * Class FolderInput
 */
class FolderInput extends AbstractInput {
	/**
	 * @inheritDoc
	 */
	async input() {
		Utils.log(`Copy folder ${this.path} to ${this.temp}`);

		await fs.copy(this.path, this.temp);
	}

	/**
	 * @inheritDoc
	 */
	async name() {
		return path.basename(this.path);
	}
}

export default FolderInput;
