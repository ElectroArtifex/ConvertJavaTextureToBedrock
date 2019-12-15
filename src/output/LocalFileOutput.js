import {BufferOutput} from "./BufferOutput";
import fs from "fs-extra";

/**
 * Class LocalFileOutput
 */
class LocalFileOutput extends BufferOutput {
    /**
     * @inheritDoc
     *
     * @param {string} path
     */
    constructor(path) {
        super();

        /**
         * @type {string}
         *
         * @protected
         */
        this.path = path;
    }

    /**
     * @inheritDoc
     */
    async generate() {
        const data = await super.generate();

        this.log.log(`Write ${this.path}`);

        await fs.outputFile(this.path, data);

        return this.path;
    }
}

export {LocalFileOutput};
