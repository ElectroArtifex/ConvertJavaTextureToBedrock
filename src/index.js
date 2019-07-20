import {addAdditionalConverters, getConverters} from "./Converter/ConvertFactory";
import BaseError from "./BaseError";
import detectInput from "./Input/InputFactory";
import detectOutput from "./Output/OutputFactory";
import detectTemp from "./Temp/TempFactory";
import Utils from "./Utils/Utils";

/**
 * @param {string} input
 * @param {string} output
 * @param {Object} options
 *
 * @returns {Promise<string>}
 *
 * @throws {BaseError}
 */
async function ConvertMinecraftJavaTextureToBedrock(input, output, options = {}) {
	Utils.setVerbose(options.verbose);
	Utils.setLogCallback(options.logCallback);

	const temp = await detectTemp(options.temp);
	const inputProcessor = detectInput(input, temp);
	const outputProcessor = detectOutput(output, temp);

	await inputProcessor.input();

	for await (const converter of getConverters(temp, inputProcessor)) {
		await addAdditionalConverters(...await converter.convert());
	}

	await outputProcessor.output();

	return await outputProcessor.getPath();
}

export default ConvertMinecraftJavaTextureToBedrock;
