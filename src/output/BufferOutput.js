import {AbstractOutput} from "./AbstractOutput";
import JSZip from "jszip";

/**
 * Class BufferOutput
 */
class BufferOutput extends AbstractOutput {
    /**
     * @inheritDoc
     */
    constructor() {
        super();

        /**
         * @type {JSZip}
         *
         * @protected
         */
        this.zip = new JSZip();
    }

    /**
     * @inheritDoc
     */
    async applyInputEntry(entry) {
        return entry.applyToZip(this.zip);
    }

    /**
     * @inheritDoc
     */
    async generate() {
        this.log.log(`Generate ${Buffer.name} zip`);

        return this.generateZip("nodebuffer");
    }

    /**
     * @param {string} type
     *
     * @returns {Promise<Buffer>}
     *
     * @protected
     */
    async generateZip(type) {
        return this.zip.generateAsync({type})
    }

    /**
     * @inheritDoc
     */
    async exists(path) {
        return (path in this.zip.files);
    }

    /**
     * @inheritDoc
     */
    async rename(from, to) {
        // https://github.com/Stuk/jszip/pull/622
        for (const [key, entry] of Object.entries(this.zip.files)) {
            if (from.endsWith("/") ? entry.name.startsWith(from) : entry.name === from) {
                delete this.zip.files[key];

                entry.name = (to + entry.name.substr(from.length));

                this.zip.files[entry.name] = entry;
            }
        }
    }

    /**
     * @inheritDoc
     */
    async read(file) {
        return this.zip.file(file).async("nodebuffer");
    }

    /**
     * @inheritDoc
     */
    async write(file, data) {
        this.zip.file(file, data);
    }

    /**
     * @inheritDoc
     */
    async delete(path) {
        this.zip.remove(path);
    }

    /**
     * @inheritDoc
     */
    async copy(from, to) {
        // https://github.com/Stuk/jszip/pull/622
        for (const entry of Object.values(this.zip.files)) {
            if (from.endsWith("/") ? entry.name.startsWith(from) : entry.name === from) {
                // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance#answer-41474987
                const clonedEntry = Object.assign({}, entry);
                Object.setPrototypeOf(clonedEntry, entry.__proto__);

                clonedEntry.name = (to + clonedEntry.name.substr(from.length));

                this.zip.files[clonedEntry.name] = clonedEntry;
            }
        }
    }
}

export {BufferOutput};
