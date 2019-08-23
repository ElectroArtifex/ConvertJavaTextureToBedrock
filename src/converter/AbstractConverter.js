import AbstractOutput from "../output/AbstractOutput";
import Jimp from "jimp";
import Log from "../log/Log";

/**
 * Class AbstractConverter
 *
 * @abstract
 */
class AbstractConverter {
	/**
	 * AbstractConverter constructor
	 *
	 * @param {AbstractOutput} output
	 * @param {mixed[]} data
	 * @param {Log} log
	 *
	 * @throws {Error}
	 */
	constructor(output, data = [], log) {
		if (this.constructor === AbstractConverter) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {AbstractOutput}
		 *
		 * @protected
		 */
		this.output = output;
		/**
		 * @type {mixed[]}
		 *
		 * @protected
		 */
		this.data = data;
		/**
		 * @type {Log}
		 *
		 * @protected
		 */
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
	 * @returns {Promise<Function<AbstractConverter>[]>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 */
	async convert() {

	}

	/**
	 * @returns {AsyncIterableIterator<*>}
	 *
	 * @throws {Error}
	 *
	 * @abstract
	 *
	 * @protected
	 */
	async* getData() {

	}
}

export default AbstractConverter;
