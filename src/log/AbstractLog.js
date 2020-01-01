/**
 * Class AbstractLog
 *
 * @abstract
 */
class AbstractLog {
    /**
     * AbstractLog constructor
     *
     * @throws {Error}
     */
    constructor() {
        if (this.constructor === AbstractLog) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    /**
     * @param {string} log
     *
     * @abstract
     */
    log(log) {

    }

    /**
     * @param {string} log
     *
     * @abstract
     */
    warn(log) {

    }
}

export {AbstractLog};
