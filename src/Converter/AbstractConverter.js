import AbstractInput from "../Input/AbstractInput";
import ConverterError from "./ConverterError";

/**
 * Class AbstractConverter
 *
 * @abstract
 */
class AbstractConverter {
	/**
	 * AbstractConverter constructor
	 *
	 * @param {string} path
	 * @param {AbstractInput} input
	 * @param {mixed[]} data
	 *
	 * @throws {ConverterError}
	 */
	constructor(path, input, data = []) {
		if (this.constructor === AbstractConverter) {
			throw new ConverterError("Can't instantiate abstract class!");
		}

		/**
		 * @type {string}
		 *
		 * @protected
		 */
		this.path = path;

		/**
		 * @type {AbstractInput}
		 *
		 * @protected
		 */
		this.input = input;

		/**
		 * @type {mixed[]}
		 *
		 * @protected
		 */
		this.data = data;
	}

	/**
	 * @returns {Promise<Function<AbstractConverter>[]>}
	 *
	 * @throws {ConverterError}
	 *
	 * @abstract
	 */
	async convert() {

	}

	/**
	 * @returns {AsyncIterableIterator<*>}
	 *
	 * @throws {ConverterError}
	 *
	 * @abstract
	 *
	 * @protected
	 */
	async* getData() {

	}
}

export default AbstractConverter;
