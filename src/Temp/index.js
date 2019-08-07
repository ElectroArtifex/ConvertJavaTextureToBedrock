import fs from "fs-extra";
import os from "os";
import path from "path";
import PACKAGE from "../../package";
import Utils from "../Utils/Utils";

/**
 * @param {string} temp
 *
 * @returns {Promise<string>}
 */
async function detectTemp(temp = os.tmpdir()) {
	Utils.log(`Init temp folder`);

	temp = path.join(temp, PACKAGE.productName + Date.now().toString());

	if (fs.existsSync(temp)) {
		try {
			await fs.remove(temp);
		} catch (err) {
			// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
			console.warn(err);
		}
	}

	return temp;
}

export default detectTemp;
