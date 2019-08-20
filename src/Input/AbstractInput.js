/**
 * Class AbstractInput
 *
 * @abstract
 */
class AbstractInput {
	/**
	 * AbstractInput constructor
	 *
	 * @param {string|Buffer} input
	 *
	 * @throws {Error}
	 */
	constructor(input) {
		if (this.constructor === AbstractInput) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {string|Buffer}
		 *
		 * @protected
		 */
		this.input = input;
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
