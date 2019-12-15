import {AbstractInputEntry} from "./entry";

/**
 * Class AbstractInput
 *
 * @abstract
 */
class AbstractInput {
    /**
     * AbstractInput constructor
     *
     * @throws {Error}
     */
    constructor() {
        if (this.constructor === AbstractInput) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    /**
     * @returns {AsyncIterableIterator<AbstractInputEntry>}
     *
     * @abstract
     */
    async* getEntries() {

    }

    /**
     * @returns {Promise<string>}
     *
     * @abstract
     */
    async getName() {

    }
}

export {AbstractInput};
