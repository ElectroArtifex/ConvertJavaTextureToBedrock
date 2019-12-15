import {BlobOutput} from "./BlobOutput";

/**
 * Class FileOutput
 */
class FileOutput extends BlobOutput {
    /**
     * @inheritDoc
     */
    async generate() {
        const data = await super.generate();

        const name = ((await this.input.getName()) + ".mcpack");

        if (typeof File !== "undefined") {
            this.log.log(`Generate ${File.name} zip`);

            return new File([data], name, {
                type: data.type
            });
        } else {
            // TODO: Bug iOS `File` is undefined in worker?
            // data.name = name; // Not work

            return {data, name};
        }
    }
}

export {FileOutput};
