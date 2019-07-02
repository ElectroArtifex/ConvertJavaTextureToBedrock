import AbstractInput from "./AbstractInput";
import extractZip from "extract-zip";
import path from "path";
import util from "util";
import Utils from "../Utils/Utils";

const extractZipPromise = util.promisify(extractZip);

/**
 * Class ZipInput
 */
class ZipInput extends AbstractInput {
	/**
	 * @inheritDoc
	 */
	async input() {
		Utils.log(`Extract ${this.path} to ${this.temp}`);

		await extractZipPromise(this.path, {dir: path.resolve(this.temp)});
	}

	/**
	 * @inheritDoc
	 */
	async name() {
		return path.parse(this.path).name;
	}
}

export default ZipInput;
