/**
 * Class Log
 */
class Log {
	/**
	 * Log constructor
	 *
	 * @param {function} callback
	 * @param {boolean} verbose
	 */
	constructor(callback = console.log, verbose = true) {
		/**
		 * @type {function}
		 *
		 * @protected
		 */
		this.callback = callback;
		/**
		 * @type {boolean}
		 *
		 * @protected
		 */
		this.verbose = verbose;
	}

	/**
	 * @param {string} log
	 */
	log(log) {
		if (this.verbose) {
			this.callback(log);
		}
	}

	/**
	 * @param {string} log
	 */
	warn(log) {
		if (this.verbose) {
			console.warn(log);
		}
	}
}

export default Log;
