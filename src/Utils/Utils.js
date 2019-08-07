/**
 * Class Utils
 */
class Utils {
	/**
	 * @param {string} log
	 */
	static log(log) {
		if (Utils.verbose) {
			Utils.logCallback(log);
		}
	}

	/**
	 * @param {function} callback
	 */
	static setLogCallback(callback = console.log) {
		Utils.logCallback = callback;
	}

	/**
	 * @param {boolean} verbose
	 */
	static setVerbose(verbose = true) {
		Utils.verbose = verbose;
	}

	/**
	 * Utils constructor
	 */
	constructor() {
		throw new Error("Can't instantiate this class!");
	}
}

/**
 * @type {boolean}
 */
Utils.verbose = true;

/**
 * @type {function}
 */
Utils.logCallback = console.log;

export default Utils;
