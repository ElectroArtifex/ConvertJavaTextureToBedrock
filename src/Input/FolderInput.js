import AbstractInput from "./AbstractInput";
import path from "path";

/**
 * Class FolderInput
 */
class FolderInput extends AbstractInput {
	/**
	 * @inheritDoc
	 */
	async name() {
		return path.basename(this.path);
	}
}

export default FolderInput;
