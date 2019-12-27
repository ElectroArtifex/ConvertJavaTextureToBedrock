import ConvertJavaTextureToBedrock, {AbstractLog, ArrayInput, FileInputEntry, FileOutput} from "./../..";

addEventListener("message", async (e) => {
    try {
        const files = e.data;

        const output = {
            output: await new ConvertJavaTextureToBedrock(
                new ArrayInput(Array.prototype.map.call(files, file => new FileInputEntry(file))),
                new FileOutput(),
                new class extends AbstractLog {
                    /**
                     * @inheritDoc
                     */
                    log(log) {
                        postMessage({log})
                    }

                    /**
                     * @inheritDoc
                     */
                    warn(log) {
                        this.log(`WARNING: ${log}`);
                    }
                }()
            ).convert()
        };

        postMessage(output);
    } catch (err) {
        // https://stackoverflow.com/questions/39992417/how-to-bubble-a-web-worker-error-in-a-promise-via-worker-onerror#answer-40081158
        setTimeout(() => {
            throw err;
        })
    }
});
