import {AbstractInput} from "./AbstractInput";
import {AbstractInputEntry} from "./entry";

/**
 * Class ArrayInput
 */
class ArrayInput extends AbstractInput {
    /**
     * @inheritDoc
     *
     * @param {AbstractInputEntry[]} entries
     */
    constructor(entries) {
        super();

        /**
         * @type {AbstractInputEntry[]}
         *
         * @protected
         */
        this.entries = entries;
    }

    /**
     * @inheritDoc
     */
    async* getEntries() {
        for (const entry of this.entries) {
            yield entry;
        }
    }

    /**
     * @inheritDoc
     */
    async getName() {
        for (const entry of this.entries) {
            const name = await entry.getName();

            if (name) {
                return name;
            }
        }

        return "";
    }
}

export {ArrayInput};
