import AbstractOutput from "./AbstractOutput";
import BufferInput from "../Input/BufferInput";
import FolderInput from "../Input/FolderInput";
import fs from "fs-extra";
import JSZip from "jszip";
import path from "path";

/**
 * Class FolderOutput
 */
class FolderOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async init() {
		switch (true) {
			case (this.input instanceof BufferInput):
				this.log.log(`Extract input`);

				let zip = new JSZip();
				zip = await zip.loadAsync(this.input.input);
				for (const entry of Object.values(zip.files)) {
					if (entry.dir) {
						if (!fs.existsSync(this.p(entry.name))) {
							await fs.mkdirs(this.p(entry.name)); // Empty folders
						}
					} else {
						await this.write(entry.name, await zip.file(entry.name).async("nodebuffer"));
					}
				}
				break;

			case (this.input instanceof FolderInput):
				this.log.log(`Copy input`);

				return fs.copy(this.input.input, this.output);

			default:
				throw new Error(`Unknown input format ${this.input}!`);
		}
	}

	/**
	 * @inheritDoc
	 */
	async generate() {
		this.log.log(`Output: ${this.output}`);

		return this.output;
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
		if (!fs.existsSync(this.p(path.dirname(to)))) {
			await fs.mkdirs(this.p(path.dirname(to)));
		}

		return fs.rename(this.p(from), this.p(to));
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
		if (!fs.existsSync(this.p(path.dirname(file)))) {
			await fs.mkdirs(this.p(path.dirname(file)));
		}

		return fs.writeFile(this.p(file), data);
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
		if (!fs.existsSync(this.p(path.dirname(to)))) {
			await fs.mkdirs(this.p(path.dirname(to)));
		}

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
		return path.join(this.output, p);
	}
}

export default FolderOutput;
