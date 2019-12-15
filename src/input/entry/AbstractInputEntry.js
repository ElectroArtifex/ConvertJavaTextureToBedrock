import {AbstractLog} from "./../../log";
import JSZip from "jszip";

/**
 * Class AbstractInputEntry
 *
 * @abstract
 */
class AbstractInputEntry {
    /**
     * AbstractInputEntry constructor
     *
     * @throws {Error}
     */
    constructor() {
        if (this.constructor === AbstractInputEntry) {
            throw new Error("Can't instantiate abstract class!");
        }

        /**
         * @type {AbstractLog}
         *
         * @protected
         */
        this.log;
    }

    /**
     * @param {AbstractLog} log
     *
     * @returns Promise<>
     */
    async _init(log) {
        this.log = log;
    }

    /**
     * @param {string} folder
     *
     * @returns {Promise<>}
     *
     * @abstract
     */
    async applyToFolder(folder) {

    }

    /**
     * @param {JSZip} zip
     *
     * @returns {Promise<>}
     *
     * @abstract
     */
    async applyToZip(zip) {

    }

    /**
     * @returns {Promise<string>}
     *
     * @abstract
     */
    async getName() {

    }
}

export {AbstractInputEntry};
