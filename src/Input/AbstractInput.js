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
	 *
	 * @throws {Error}
	 */
	constructor(path) {
		if (this.constructor === AbstractInput) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {string}
		 */
		this.path = path;
	}

	/**
	 * @returns {Promise<string>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async name() {

	}
}

export default AbstractInput;
