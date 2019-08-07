import AbstractOutput from "./AbstractOutput";
import admZip from "adm-zip";
import FolderInput from "../Input/FolderInput";
import fs from "fs-extra";
import path from "path";
import util from "util";
import Utils from "../Utils/Utils";
import ZipInput from "../Input/ZipInput";

/**
 * Class FolderOutput
 */
class FolderOutput extends AbstractOutput {
	/**
	 * @inheritDoc
	 */
	async init() {
		switch (true) {
			case (this.input instanceof FolderInput):
				Utils.log(`Copy ${this.input.path}`);

				return fs.copy(this.input.path, this.temp);

			case (this.input instanceof ZipInput):
				Utils.log(`Extract ${this.input.path}`);

				const zip = new admZip(this.input.path);

				const extractAllToAsyncPromise = util.promisify(zip.extractAllToAsync.bind(zip));

				return extractAllToAsyncPromise(this.temp, true);

			default:
				break;
		}
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

		return fs.rename(this.p(from), this.p(to)); // TODO: Fix EXDEV: cross-device link not permitted
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
		return path.join(this.temp, p);
	}
}

export default FolderOutput;
