import {AbstractInputEntry} from "./AbstractInputEntry";
import fs from "fs-extra";
import path from "path";
import readdirp from "readdirp";

/**
 * Class LocalFolderInputEntry
 */
class LocalFolderInputEntry extends AbstractInputEntry {
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
    async applyToFolder(folder) {
        this.log.log(`Copy ${this.path}`);

        return fs.copy(this.path, folder);
    }

    /**
     * @inheritDoc
     */
    async applyToZip(zip) {
        this.log.log(`Pack ${this.path}`);

        for await (const {fullPath, path, dirent} of readdirp(this.path, {
            type: "files_directories"
        })) {
            const destPath = path.replace(/\\/g, "/");

            if (dirent.isDirectory()) {
                zip.folder(destPath); // Empty folders
            } else {
                zip.file(destPath, await fs.readFile(fullPath));
            }
        }
    }

    /**
     * @inheritDoc
     */
    async getName() {
        return path.parse(this.path).name; // Name without file extension
    }
}

export {LocalFolderInputEntry};
