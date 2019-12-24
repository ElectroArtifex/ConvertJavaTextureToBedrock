import {AbstractOutput} from "./AbstractOutput";
import fs from "fs-extra";
import path from "path";

/**
 * Class LocalFolderOutput
 */
class LocalFolderOutput extends AbstractOutput {
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
    async _init(input, log) {
        await super._init(input, log);

        if (await this.exists(".")) {
            this.log.log(`Remove exists output`);

            try {
                return this.delete(".");
            } catch (err) {
                // TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
                this.log.warn(err);
            }
        }
    }

    /**
     * @inheritDoc
     */
    async applyInputEntry(entry) {
        return entry.applyToFolder(this.path);
    }

    /**
     * @inheritDoc
     */
    async generate() {
        this.log.log(`Output: ${this.path}`);

        return this.path;
    }

    /**
     * @inheritDoc
     */
    async exists(path) {
        return fs.existsSync(this.p(path));
    }

    /**
     * @inheritDoc
     */
    async rename(from, to) {
        return fs.move(this.p(from), this.p(to), {
            overwrite: true
        });
    }

    /**
     * @inheritDoc
     */
    async read(file) {
        return fs.readFile(this.p(file));
    }

    /**
     * @inheritDoc
     */
    async write(file, data) {
        return fs.outputFile(this.p(file), data);
    }

    /**
     * @inheritDoc
     */
    async delete(path) {
        return fs.remove(this.p(path));
    }

    /**
     * @inheritDoc
     */
    async copy(from, to) {
        return fs.copy(this.p(from), this.p(to));
    }

    /**
     * @param {string} p
     *
     * @returns {string}
     *
     * @protected
     */
    p(p) {
        return path.join(this.path, p);
    }
}

export {LocalFolderOutput};
