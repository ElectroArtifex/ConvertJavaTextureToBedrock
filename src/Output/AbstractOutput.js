import OutputError from "./OutputError";

/**
 * Class AbstractOutput
 *
 * @abstract
 */
class AbstractOutput {
	/**
	 * AbstractOutput constructor
	 *
	 * @param {string} path
	 * @param {string} temp
	 *
	 * @throws {OutputError}
	 */
	constructor(path, temp) {
		if (this.constructor === AbstractOutput) {
			throw new OutputError("Can't instantiate abstract class!");
		}

		/**
		 * @type {string}
		 *
		 * @protected
		 */
		this.path = path;
		/**
		 * @type {string}
		 *
		 * @protected
		 */
		this.temp = temp;
	}

	/**
	 * @returns {Promise<string>}
	 */
	async getPath() {
		return this.path;
	}

	/**
	 * @returns {Promise<>}
	 *
	 * @throws {OutputError}
	 *
	 * @abstract
	 */
	async output() {

	}
}

export default AbstractOutput;
