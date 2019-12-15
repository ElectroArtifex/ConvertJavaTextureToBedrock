import {AbstractInputEntry} from "./AbstractInputEntry";
import JSZip from "jszip";
import fs from "fs-extra";
import path from "path";

/**
 * Class BufferInputEntry
 */
class BufferInputEntry extends AbstractInputEntry {
    /**
     * @inheritDoc
     *
     * @param {Buffer|ArrayBufferOutput|Uint8Array} buffer
     */
    constructor(buffer) {
        super();

        /**
         * @type {Buffer|ArrayBufferOutput|Uint8Array}
         *
         * @protected
         */
        this.buffer = buffer;
    }

    /**
     * @inheritDoc
     */
    async applyToFolder(folder) {
        this.log.log(`Extract zip`);

        let zip = new JSZip();

        zip = await zip.loadAsync(this.buffer);

        for (const entry of Object.values(zip.files)) {
            const destPath = path.join(folder, entry.name);

            if (entry.dir) {
                await fs.ensureDir(destPath); // Empty folders
            } else {
                await fs.outputFile(destPath, await zip.file(entry.name).async("nodebuffer"));
            }
        }
    }

    /**
     * @inheritDoc
     */
    async applyToZip(zip) {
        this.log.log(`Read zip`);

        let zip2 = new JSZip();

        zip2 = await zip2.loadAsync(this.buffer);

        for (const entry of Object.values(zip2.files)) {
            const destPath = entry.name;

            if (entry.dir) {
                zip.folder(destPath); // Empty folders
            } else {
                zip.file(destPath, await zip2.file(entry.name).async("nodebuffer"));
            }
        }
    }

    /**
     * @inheritDoc
     */
    async getName() {
        return ""; // No name available from buffer
    }
}

export {BufferInputEntry};
