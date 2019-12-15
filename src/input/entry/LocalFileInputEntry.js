import {BufferInputEntry} from "./BufferInputEntry";
import fs from "fs-extra";
import path from "path";

/**
 * Class LocalFileInputEntry
 */
class LocalFileInputEntry extends BufferInputEntry {
    /**
     * @inheritDoc
     *
     * @param {string} path
     */
    constructor(path) {
        super(Buffer.alloc(0)); // `await fs.readFile(path)` not works here without change the usage of this class

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
    async applyToFolder(folder) {
        await this.read();

        return super.applyToFolder(folder);
    }

    /**
     * @inheritDoc
     */
    async applyToZip(zip) {
        await this.read();

        return super.applyToZip(zip);
    }

    /**
     * @inheritDoc
     */
    async getName() {
        return path.parse(this.path).name; // Name without file extension
    }

    /**
     * @returns {Promise<>}
     *
     * @protected
     */
    async read() {
        if (this.buffer.byteLength === 0) {
            this.log.log(`Read ${this.path}`);

            this.buffer = await fs.readFile(this.path);
        }
    }
}

export {LocalFileInputEntry};
