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
        console.warn(`WARNING: ${log}`);
    }
}

export {ConsoleLog};
