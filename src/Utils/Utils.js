import path from "path";
import UtilsError from "./UtilsError";

/**
 * Class Utils
 */
class Utils {
	/**
	 * @param {string} from
	 * @param {string} temp
	 *
	 * @returns {string}
	 */
	static fromPath(from, temp) {
		return path.join(temp, from);
	}

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
		Utils.logCallback = console.log;
	}

	/**
	 * @param {boolean} verbose
	 */
	static setVerbose(verbose = true) {
		Utils.verbose = verbose;
	}

	/**
	 * @param {string} to
	 * @param {string} from_path
	 * @param {string} temp
	 *
	 * @returns {string}
	 */
	static toPath(to, from_path, temp) {
		return to.startsWith("./") ? path.join(path.dirname(from_path), to.substr(2)) : path.join(temp, to);
	}

	/**
	 * Utils constructor
	 */
	constructor() {
		throw new UtilsError("Can't instantiate this class!");
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
