import admZip from "adm-zip";
import FolderOutput from "./FolderOutput";
import util from "util";
import Utils from "../Utils/Utils";

/**
 * Class ZipOutput
 *
 * TODO: Sometime replace with `ZipOutputAdmZipTry` - but is buggy at the moment
 */
class ZipOutput extends FolderOutput {

	/**
	 * @inheritDoc
	 */
	async store() {
		Utils.log(`Pack`);

		this.zip = new admZip();

		this.zip.addLocalFolder(this.temp, "");

		const writeZipPromise = util.promisify(this.zip.writeZip.bind(this.zip));

		await this.delete(""); // Removes the temp folder to make it possible to write the file (Same name)

		await writeZipPromise(this.temp);

		return super.store();
	}
}

export default ZipOutput;
