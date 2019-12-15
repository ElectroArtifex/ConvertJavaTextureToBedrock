import {addAdditionalConverters, getConverters} from "./converter";
import {AbstractInput} from "./input";
import {AbstractLog} from "./log";
import {AbstractOutput} from "./output";

/**
 * Class ConvertJavaTextureToBedrock
 */
class ConvertJavaTextureToBedrock {
    /**
     * ConvertJavaTextureToBedrock constructor
     *
     * @param {AbstractInput} input
     * @param {AbstractOutput} output
     * @param {AbstractLog} log
     */
    constructor(input, output, log) {
        /**
         * @type {AbstractInput}
         *
         * @protected
         */
        this.input = input;
        /**
         * @type {AbstractOutput}
         *
         * @protected
         */
        this.output = output;
        /**
         * @type {AbstractLog}
         *
         * @protected
         */
        this.log = log;
    }

    /**
     * @returns {Promise<*>}
     */
    async convert() {
        try {
            await this.output._init(this.input, this.log);

            for await (const entry of this.input.getEntries()) {
                await entry._init(this.log);

                await this.output.applyInputEntry(entry);
            }

            for await (const converter of getConverters()) {
                await converter._init(this.input, this.output, this.log);

                await addAdditionalConverters(...await converter.convert());
            }

            return await this.output.generate();
        } catch (err) {
            this.log.error(err.message);
            throw err;
        }
    }
}

export default ConvertJavaTextureToBedrock;

//export {AbstractConverter, addAdditionalConverters} from "./converter";
export {AbstractInput, ArrayInput, Input} from "./input";
export {
    AbstractInputEntry, BufferInputEntry, FileInputEntry, LocalFileInputEntry, LocalFolderInputEntry
}from "./input";
export {AbstractLog, ConsoleLog, SilentLog} from "./log";
export {
    AbstractOutput,
    ArrayBufferOutput,
    BlobOutput,
    BufferOutput,
    FileOutput,
    LocalFileOutput,
    LocalFolderOutput,
    Uint8ArrayOutput
} from "./output";
