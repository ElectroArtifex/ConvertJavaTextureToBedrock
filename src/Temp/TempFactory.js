import fs from "fs-extra";
import os from "os";
import PACKAGE from "../../package";
import TempError from "./TempError";
import Utils from "../Utils/Utils";

/**
 * @param {string} temp
 *
 * @returns {Promise<string>}
 */
async function detectTemp(temp = os.tmpdir()) {
	Utils.log(`Init temp folder`);

	if (!fs.existsSync(temp)) {
		throw new TempError(`The temp ${temp} does not exists!`);
	}

	temp = Utils.fromPath(PACKAGE.productName/* + Date.now().toString()*/, temp);

	try {
		await fs.remove(temp);
	} catch (err) {
		// TODO: Bug on Windows? (EPERM: operation not permitted (rmdir))
	}

	await fs.mkdirs(temp);

	return temp;
}

export default detectTemp;
