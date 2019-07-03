import AbstractInput from "./AbstractInput";
import decompress from "decompress";
import path from "path";
import Utils from "../Utils/Utils";

/**
 * Class ZipInput
 */
class ZipInput extends AbstractInput {
	/**
	 * @inheritDoc
	 */
	async input() {
		Utils.log(`Extract ${this.path} to ${this.temp}`);

		await decompress(this.path, this.temp);
	}

	/**
	 * @inheritDoc
	 */
	async name() {
		return path.parse(this.path).name;
	}
}

export default ZipInput;
