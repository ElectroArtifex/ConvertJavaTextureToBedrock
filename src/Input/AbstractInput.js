import InputError from "./InputError";

/**
 * Class AbstractInput
 *
 * @abstract
 */
class AbstractInput {
	/**
	 * AbstractInput constructor
	 *
	 * @param {string} path
	 * @param {string} temp
	 *
	 * @throws {InputError}
	 */
	constructor(path, temp) {
		if (this.constructor === AbstractInput) {
			throw new InputError("Can't instantiate abstract class!");
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
	 * @returns {Promise<>}
	 *
	 * @throws {InputError}
	 *
	 * @abstract
	 */
	async input() {

	}

	/**
	 * @returns {Promise<string>}
	 *
	 * @throws {InputError}
	 *
	 * @abstract
	 */
	async name() {

	}
}

export default AbstractInput;
