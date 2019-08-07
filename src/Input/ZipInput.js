import AbstractInput from "./AbstractInput";
import path from "path";

/**
 * Class ZipInput
 */
class ZipInput extends AbstractInput {
	/**
	 * @inheritDoc
	 */
	async name() {
		return path.parse(this.path).name;
	}
}

export default ZipInput;
