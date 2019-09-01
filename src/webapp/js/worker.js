import ConvertMinecraftJavaTextureToBedrock, {AbstractLog, ArrayInput, FileInputEntry, FileOutput} from "./../..";

addEventListener("message", async (e) => {
	const files = e.data;

	let output;
	try {
		output = {
			output: await new ConvertMinecraftJavaTextureToBedrock(
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

					/**
					 * @inheritDoc
					 */
					error(log) {
						this.log(`ERROR: ${log}`);
					}
				}
			).convert()
		};
	} catch (err) {
		output = {
			err: err.message,
		};
	}

	postMessage(output);
});
