import ZipInput from "./ZipInput";
import path from "path";

/**
 * Class BufferInput
 */
class BufferInput extends ZipInput {
	/**
	 * @inheritDoc
	 *
	 * @param {string} filename
	 */
	constructor(input, filename = "") {
		super(input);

		/**
		 * @type {string}
		 *
		 * @protected
		 */
		this.filename = filename;
	}

	/**
	 * @inheritDoc
	 */
	async name() {
		return path.parse(this.filename).name;
	}
}

export default BufferInput;
