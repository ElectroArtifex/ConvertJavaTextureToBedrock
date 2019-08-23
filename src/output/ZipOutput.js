import AbstractOutput from "./AbstractOutput";
import BufferInput from "../input/BufferInput";
import FolderInput from "../input/FolderInput";
import fs from "fs-extra";
import JSZip from "jszip";
import readdirp from "readdirp";

/**
 * Class ZipOutput
 */
class ZipOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async init() {
		/**
		 * @type {JSZip}
		 *
		 * @protected
		 */
		this.zip = new JSZip();

		switch (true) {
			case (this.input instanceof BufferInput):
				this.log.log(`Read input`);

				this.zip = await this.zip.loadAsync(this.input.input);
				break;

			case (this.input instanceof FolderInput):
				this.log.log(`Pack input`);

				for await (const {fullPath, path, dirent} of readdirp(this.input.input, {
					type: "files_directories"
				})) {
					if (dirent.isDirectory()) {
						this.zip.folder(path.replace(/\\/g, "/")); // Empty folders
					} else {
						this.zip.file(path.replace(/\\/g, "/"), await fs.readFile(fullPath));
					}
				}
				break;

			default:
				throw new Error(`Unknown input format ${this.input}!`);
		}
	}

	/**
	 * @inheritDoc
	 */
	async generate() {
		this.log.log(`Write output`);

		await fs.writeFile(this.output, await this.generateZip());

		this.log.log(`Output: ${this.output}`);

		return this.output;
	}

	/**
	 * @param {string} type
	 *
	 * @returns {Promise<Buffer>}
	 *
	 * @protected
	 */
	async generateZip(type = "nodebuffer") {
		return this.zip.generateAsync({
			type
		})
	}

	/**
	 * @inheritDoc
	 */
	async exists(path) {
		return (path in this.zip.files);
	}

	/**
	 * @inheritDoc
	 */
	async rename(from, to) {
		for (const [key, entry] of Object.entries(this.zip.files)) {
			if (from.endsWith("/") ? entry.name.startsWith(from) : entry.name === from) {
				delete this.zip.files[key];

				entry.name = (to + entry.name.substr(from.length));

				this.zip.files[entry.name] = entry;
			}
		}
	}

	/**
	 * @inheritDoc
	 */
	async read(file) {
		return this.zip.file(file).async("nodebuffer");
	}

	/**
	 * @inheritDoc
	 */
	async write(file, data) {
		this.zip.file(file, data);
	}

	/**
	 * @inheritDoc
	 */
	async delete(path) {
		this.zip.remove(path);
	}

	/**
	 * @inheritDoc
	 */
	async copy(from, to) {
		for (const entry of Object.values(this.zip.files)) {
			if (from.endsWith("/") ? entry.name.startsWith(from) : entry.name === from) {
				// https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance#answer-41474987
				const clonedEntry = Object.assign({}, entry);
				Object.setPrototypeOf(clonedEntry, entry.__proto__);

				clonedEntry.name = (to + clonedEntry.name.substr(from.length));

				this.zip.files[clonedEntry.name] = clonedEntry;
			}
		}
	}
}

export default ZipOutput;
