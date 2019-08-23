import ConvertMinecraftJavaTextureToBedrock from "../../../src";

addEventListener("message", async (e) => {
	const input = e.data;

	let output;
	try {
		output = {
			output: await ConvertMinecraftJavaTextureToBedrock(input, new ArrayBuffer(0), {
				logCallback: (log) => {
					postMessage({log})
				}
			})
		};
	} catch (err) {
		output = {
			err: err.message
		};
	}

	postMessage(output);
});
