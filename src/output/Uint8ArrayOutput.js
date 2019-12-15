import {BufferOutput} from "./BufferOutput";

/**
 * Class Uint8ArrayOutput
 */
class Uint8ArrayOutput extends BufferOutput {
    /**
     * @inheritDoc
     */
    async generate() {
        this.log.log(`Generate ${Uint8Array.name} zip`);

        return this.generateZip("uint8array");
    }
}

export {Uint8ArrayOutput};
