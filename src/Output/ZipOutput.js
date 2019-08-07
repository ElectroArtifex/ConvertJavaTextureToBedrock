import AbstractOutput from "./AbstractOutput";
import admZip from "adm-zip";
import FolderInput from "../Input/FolderInput";
import path from "path";
import util from "util";
import Utils from "../Utils/Utils";
import ZipInput from "../Input/ZipInput";

/**
 * Class ZipOutput
 */
class ZipOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async init() {
		/**
		 * @type {admZip}
		 *
		 * @protected
		 */
		this.zip;

		switch (true) {
			case (this.input instanceof FolderInput):
				Utils.log(`Pack ${this.input.path}`);

				this.zip = new admZip();

				this.zip.addLocalFolder(this.input.path, "");
				break;

			case (this.input instanceof ZipInput):
				this.zip = new admZip(this.input.path);
				break;

			default:
				throw new Error(`Unknown input format ${this.input}!`);
		}
	}

	/**
	 * @inheritDoc
	 */
	async store() {
		const writeZipPromise = util.promisify(this.zip.writeZip.bind(this.zip));

		await writeZipPromise(this.temp);

		return super.store();
	}

	/**
	 * @inheritDoc
	 */
	async exists(path) {
		return (this.zip.getEntry(path) !== null);
	}

	/**
	 * @inheritDoc
	 */
	async rename(from, to) {
		const delete_directories = [];

		for (const entry of Array.from(this.zip.getEntries())) {
			if (from.endsWith("/") ? entry.entryName.startsWith(from) : entry.entryName === from) {
				const to_ = to + entry.entryName.substr(from.length);

				if (entry.isDirectory) {
					// Create parent directory
					if (this.zip.getEntry(to_) === null) {
						this.zip.addFile(to_, "")
					}
					delete_directories.push(entry.entryName);
				} else {
					const data = await this.read(entry.entryName);

					await this.delete(entry.entryName);

					await this.write(to_, data);
				}
			}
		}

		for (const entry of delete_directories) {
			await this.delete(entry);
		}
	}

	/**
	 * @inheritDoc
	 */
	async read(file) {
		return this.zip.readFile(file);
	}

	/**
	 * @inheritDoc
	 */
	async write(file, data) {
		if (await this.exists(file)) {
			this.zip.updateFile(file, data);
		} else {
			// Create parent directory
			let parent = path.dirname(file);
			if (parent === ".") {
				parent = "";
			}
			parent += "/";
			if (this.zip.getEntry(parent) === null) {
				this.zip.addFile(parent, "")
			}

			this.zip.addFile(file, data);
		}
	}

	/**
	 * @inheritDoc
	 */
	async delete(path) {
		this.zip.deleteFile(path);
	}

	/**
	 * @inheritDoc
	 */
	async copy(from, to) {
		for (const entry of Array.from(this.zip.getEntries())) {
			if (from.endsWith("/") ? entry.entryName.startsWith(from) : entry.entryName === from) {
				const to_ = to + entry.entryName.substr(from.length);

				if (entry.isDirectory) {
					// Create parent directory
					if (this.zip.getEntry(to_) === null) {
						this.zip.addFile(to_, "")
					}
				} else {
					await this.write(to + entry.entryName.substr(from.length), await this.read(entry.entryName));
				}
			}
		}
	}
}

export default ZipOutput;
