import AbstractInput from "../Input/AbstractInput";
import Log from "../Log/Log";

/**
 * Class AbstractOutput
 *
 * @abstract
 */
class AbstractOutput {
	/**
	 * AbstractOutput constructor
	 *
	 * @param {string|Buffer|ArrayBuffer|Uint8Array} output
	 * @param {AbstractInput} input
	 * @param {Log} log
	 *
	 * @throws {Error}
	 */
	constructor(output, input, log) {
		if (this.constructor === AbstractOutput) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {string|Buffer|ArrayBuffer|Uint8Array}
		 *
		 * @protected
		 */
		this.output = output;
		/**
		 * @type {AbstractInput}
		 *
		 * @protected
		 */
		this.input = input;
		/**
		 * @type {Log}
		 *
		 * @protected
		 */
		this.log = log;
	}

	/**
	 * @returns {Promise<>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async init() {

	}

	/**
	 * @returns {Promise<string|Buffer|ArrayBuffer|Uint8Array>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async generate() {

	}

	/**
	 * @param {string} path
	 *
	 * @returns {Promise<boolean>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async exists(path) {

	}

	/**
	 * @param {string} from
	 * @param {string} to
	 *
	 * @returns {Promise<>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async rename(from, to) {

	}

	/**
	 * @param {string} file
	 *
	 * @returns {Promise<Buffer>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async read(file) {

	}

	/**
	 * @param {string} file
	 * @param {Buffer} data
	 *
	 * @returns {Promise<>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async write(file, data) {

	}

	/**
	 * @param {string} path
	 *
	 * @returns {Promise<>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async delete(path) {

	}

	/**
	 * @param {string} from
	 * @param {string} to
	 *
	 * @returns {Promise<>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async copy(from, to) {

	}
}

export default AbstractOutput;
