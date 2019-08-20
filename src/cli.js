import ConvertMinecraftJavaTextureToBedrock from "./index";
import PACKAGE from "../package";
import yargs from "yargs";

(async () => {
	const argv = yargs(process.argv)
		.options({
			i: {
				alias: "input",
				demand: true,
				describe: "Input folder or archive path",
				type: "string"
			},
			o: {
				alias: "output",
				demand: true,
				describe: "Output folder or archive path",
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

	try {
		await ConvertMinecraftJavaTextureToBedrock(argv.input, argv.output, {
			verbose: argv.verbose
		});
	} catch (err) {
		console.error(err);
	}
})();
