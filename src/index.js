import {addAdditionalConverters, getConverters} from "./Converter";
import detectInput from "./Input";
import detectOutput from "./Output";
import detectTemp from "./Temp";
import Utils from "./Utils/Utils";

/**
 * @param {string} input
 * @param {string} output
 * @param {Object} options
 *
 * @returns {Promise<string>}
 *
 * @throws {Error}
 */
async function ConvertMinecraftJavaTextureToBedrock(input, output, options = {}) {
	Utils.setVerbose(options.verbose);
	Utils.setLogCallback(options.logCallback);

	const temp = await detectTemp(options.temp);
	const inputProcessor = await detectInput(input);

	const outputProcessor = await detectOutput(output, temp, inputProcessor);

	await outputProcessor.init();

	for await (const converter of getConverters(outputProcessor)) {
		await addAdditionalConverters(...await converter.convert());
	}

	await outputProcessor.store();

	return outputProcessor.path;
}

export default ConvertMinecraftJavaTextureToBedrock;
