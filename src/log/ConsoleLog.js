import {AbstractLog} from "./AbstractLog";

/**
 * Class ConsoleLog
 */
class ConsoleLog extends AbstractLog {
	/**
	 * @inheritDoc
	 */
	log(log) {
		console.log(log);
	}

	/**
	 * @inheritDoc
	 */
	warn(log) {
		console.warn(log);
	}

	/**
	 * @inheritDoc
	 */
	error(log) {
		console.error(log);
	}
}

export {ConsoleLog};
