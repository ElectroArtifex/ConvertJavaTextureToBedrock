import AbstractInput from "../Input/AbstractInput";
import fs from "fs-extra";
import Utils from "../Utils/Utils";

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
	 * @param {AbstractInput} input
	 *
	 * @throws {Error}
	 */
	constructor(path, temp, input) {
		if (this.constructor === AbstractOutput) {
			throw new Error("Can't instantiate abstract class!");
		}

		/**
		 * @type {string}
		 */
		this.path = path;
		/**
		 * @type {string}
		 *
		 * @protected
		 */
		this.temp = temp;
		/**
		 * @type {AbstractInput}
		 */
		this.input = input;
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
	 * @returns {Promise<>}
	 *
	 * @throws {Error}
	 */
	async store() {
		Utils.log(`Move to ${this.path}`);

		try {
			await fs.rename(this.temp, this.path);
		} catch (err) {
			// TODO: Fix EXDEV: cross-device link not permitted
			console.warn(err);

			Utils.log(`Copy to ${this.path}`);
			await fs.copy(this.temp, this.path);

			Utils.log(`Clean`);
			try {
				await fs.remove(this.temp);
			} catch (err) {
				// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
				console.warn(err);
			}
		}
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
