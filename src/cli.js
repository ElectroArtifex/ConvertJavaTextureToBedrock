import ConvertMinecraftJavaTextureToBedrock from "./index";
import os from "os";
import PACKAGE from "../package";
import yargs from "yargs";

(async () => {
	const argv = yargs(process.argv)
		.options({
			i: {
				alias: "input",
				demand: true,
				describe: "Input",
				type: "string"
			},
			o: {
				alias: "output",
				demand: true,
				describe: "Output",
				type: "string"
			},
			t: {
				alias: "temp",
				default: os.tmpdir(),
				describe: "Temp directory",
				type: "string"
			},
			l: {
				alias: "verbose",
				default: true,
				describe: "Verbose log",
				type: "boolean"
			}
		})
		.help("help").alias("h", "help")
		.version("version", PACKAGE.version).alias("v", "version")
		.argv;

	return await ConvertMinecraftJavaTextureToBedrock(argv.input, argv.output, {
		temp: argv.temp,
		verbose: argv.verbose
	});
})().then((outputPath) => {
	console.log(`Output: ${outputPath}`);
}).catch((err) => {
	console.error(err);
});
