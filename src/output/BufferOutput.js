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

		return this.generateZip(Buffer.isBuffer(this.output) ? undefined : this.output.constructor.name.toLowerCase());
	}
}

export default BufferOutput;
