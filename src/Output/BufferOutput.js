import ZipOutput from "./ZipOutput";

/**
 * Class BufferOutput
 */
class BufferOutput extends ZipOutput {
	/**
	 * @inheritDoc
	 */
	async generate() {
		this.log.log(`Pack output`);

		return this.generateZip();
	}
}

export default BufferOutput;
