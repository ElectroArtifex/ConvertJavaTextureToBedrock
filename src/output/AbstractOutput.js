import {AbstractInput, AbstractInputEntry} from "./../input";
import {AbstractLog} from "./../log";
import {Options} from "./../Options";

/**
 * Class AbstractOutput
 *
 * @abstract
 */
class AbstractOutput {
    /**
     * AbstractOutput constructor
     *
     * @throws {Error}
     */
    constructor() {
        if (this.constructor === AbstractOutput) {
            throw new Error("Can't instantiate abstract class!");
        }

        /**
         * @type {AbstractInput}
         *
         * @protected
         */
        this.input;
        /**
         * @type {AbstractLog}
         *
         * @protected
         */
        this.log;
        /**
         * @type {Object}
         *
         * @protected
         */
        this.options;
    }

    /**
     * @param {AbstractInput} input
     * @param {AbstractLog} log
     * @param {Options} options
     *
     * @returns Promise<>
     */
    async _init(input, log, options) {
        this.input = input;
        this.log = log;
        this.options = options;
    }

    /**
     * @param {AbstractInputEntry} entry
     *
     * @returns {Promise<>}
     *
     * @throws {Error}
     *
     * @abstract
     */
    async applyInputEntry(entry) {

    }

    /**
     * @returns {Promise<*>}
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

export {AbstractOutput};
