import {BufferInputEntry} from "./BufferInputEntry";
import fs from "fs-extra";
import path from "path";

/**
 * Class FileInputEntry
 */
class FileInputEntry extends BufferInputEntry {
    /**
     * @inheritDoc
     */
    async applyToFolder(folder) {
        if (this.buffer.webkitRelativePath) {
            // File is part of selected folder
            this.log.log(`Extract`);

            let destPath = this.buffer.webkitRelativePath.split(path.sep);
            destPath.shift();
            destPath = path.join([folder, ...destPath]);

            await fs.outputFile(destPath, this.buffer);
        } else {
            // File is a normal Buffer
            return super.applyToFolder(folder);
        }
    }

    /**
     * @inheritDoc
     */
    async applyToZip(zip) {
        if (this.buffer.webkitRelativePath) {
            // File is part of selected folder
            let destPath = this.buffer.webkitRelativePath.split(path.sep);
            destPath.shift();
            destPath = destPath.join(path.sep);

            this.log.log(`Pack ${destPath}`);

            zip.file(destPath, this.buffer);
        } else {
            // File is a normal Blob
            return super.applyToZip(zip);
        }
    }

    /**
     * @inheritDoc
     */
    async getName() {
        if (this.buffer.webkitRelativePath) {
            return this.buffer.webkitRelativePath.split(path.sep).shift(); // First folder is the name of selected folder
        } else {
            return path.parse(this.buffer.name).name; // Name without file extension
        }
    }
}

export {FileInputEntry};
