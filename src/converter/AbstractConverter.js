import {AbstractInput} from "./../input"
import {AbstractLog} from "./../log";
import {AbstractOutput} from "./../output";
import Jimp from "jimp";

/**
 * Class AbstractConverter
 *
 * @abstract
 */
class AbstractConverter {

	/**
	 * AbstractConverter constructor
	 *
	 * @param {mixed[]} data
	 *
	 * @throws {Error}
	 */
	constructor(data = this.constructor.DATA) {
		if (this.constructor === AbstractConverter) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {AbstractInput}
		 *
		 * @protected
		 */
		this.input;
		/**
		 * @type {AbstractOutput}
		 *
		 * @protected
		 */
		this.output;
		/**
		 * @type {AbstractLog}
		 *
		 * @protected
		 */
		this.log;
		/**
		 * @type {mixed[]}
		 *
		 * @protected
		 */
		this.data = data;
	}

	/**
	 * @param {AbstractInput} input
	 * @param {AbstractOutput} output
	 * @param {AbstractLog} log
	 *
	 * @returns Promise<>
	 */
	async _init(input, output, log) {
		this.input = input;
		this.output = output;
		this.log = log;
	}

	/**
	 * @param {string} file
	 *
	 * @returns {Promise<Jimp>}
	 *
	 * @throws {Error}
	 *
	 * @protected
	 */
	async readImage(file) {
		return Jimp.read(await this.output.read(file));
	}

	/**
	 * @param {string} file
	 * @param {Jimp} image
	 * @param {string} mime
	 *
	 * @returns {Promise<>}
	 *
	 * @protected
	 */
	async writeImage(file, image, mime = Jimp.MIME_PNG) {
		return this.output.write(file, await image.getBufferAsync(mime));
	}

	/**
	 * @returns {AsyncIterableIterator<*>}
	 *
	 * @throws {Error}
	 *
	 * @protected
	 */
	async* getData() {
		for (const date of this.data) {
			yield date;
		}
	}

	/**
	 * @returns {mixed[]}
	 *
	 * @protected
	 *
	 * @abstract
	 */
	static get DATA() {

	}

	/**
	 * @returns {Promise<Function<AbstractConverter>[]>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async convert() {

	}
}

export {AbstractConverter};
