/**
 * Class AbstractInput
 *
 * @abstract
 */
class AbstractInput {
	/**
	 * AbstractInput constructor
	 *
	 * @param {string|Buffer|ArrayBuffer|Uint8Array} input
	 * @param {string} filename
	 *
	 * @throws {Error}
	 */
	constructor(input, filename) {
		if (this.constructor === AbstractInput) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {string|Buffer|ArrayBuffer|Uint8Array}
		 *
		 * @protected
		 */
		this.input = input;
		/**
		 * @type {string}
		 *
		 * @protected
		 */
		this.filename = filename;
	}
}

export default AbstractInput;
