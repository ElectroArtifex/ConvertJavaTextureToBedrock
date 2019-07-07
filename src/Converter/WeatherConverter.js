import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class WeatherConverter
 */
class WeatherConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [snow, rain, to] of this.getData()) {
			const snow_path = Utils.fromPath(snow, this.path);
			const rain_path = Utils.toPath(rain, snow_path, this.path);
			const to_path = Utils.toPath(to, snow_path, this.path);

			if (fs.existsSync(snow_path) && fs.existsSync(rain_path)) {
				Utils.log(`Convert weather`);

				const snow_image = await Jimp.read(snow_path);

				const rain_image = await Jimp.read(rain_path);

				const factor = (snow_image.getWidth() / 64);

				const image = await Jimp.create((32 * factor), (32 * factor));

				// Snow
				image.composite(snow_image.clone().crop((55 * factor), (15 * factor), (3 * factor), (3 * factor)), 0, 0);
				image.composite(snow_image.clone().crop((42 * factor), 0, (3 * factor), (3 * factor)), (4 * factor), 0);
				image.composite(snow_image.clone().crop((36 * factor), (14 * factor), (3 * factor), (3 * factor)), (8 * factor), 0);

				image.composite(snow_image.clone().crop((55 * factor), (15 * factor), (3 * factor), (3 * factor)), (12 * factor), 0);
				image.composite(snow_image.clone().crop((42 * factor), 0, (3 * factor), (3 * factor)), (16 * factor), 0);
				image.composite(snow_image.clone().crop((36 * factor), (14 * factor), (3 * factor), (3 * factor)), (20 * factor), 0);

				image.composite(snow_image.clone().crop((55 * factor), (15 * factor), (3 * factor), (3 * factor)), (24 * factor), 0);
				image.composite(snow_image.clone().crop((42 * factor), 0, (3 * factor), (3 * factor)), (28 * factor), 0);

				to_delete.push(snow);

				// Rain
				image.composite(rain_image.clone().crop((3 * factor), 0, factor, (20 * factor)), factor, (5 * factor));

				image.composite(rain_image.clone().crop((22 * factor), 0, factor, (3 * factor)), (5 * factor), (6 * factor));
				image.composite(rain_image.clone().crop(0, (7 * factor), factor, (5 * factor)), (5 * factor), (12 * factor));

				image.composite(rain_image.clone().crop((59 * factor), (65 * factor), factor, (10 * factor)), (9 * factor), (7 * factor));

				image.composite(rain_image.clone().crop((12 * factor), (85 * factor), factor, (9 * factor)), (13 * factor), (8 * factor));

				image.composite(rain_image.clone().crop(0, (23 * factor), factor, factor), (17 * factor), (6 * factor));
				image.composite(rain_image.clone().crop((17 * factor), (168 * factor), factor, (11 * factor)), (17 * factor), (8 * factor));

				image.composite(rain_image.clone().crop((59 * factor), (65 * factor), factor, (10 * factor)), (21 * factor), (7 * factor));

				image.composite(rain_image.clone().crop(0, (7 * factor), factor, (5 * factor)), (25 * factor), (9 * factor));

				image.composite(rain_image.clone().crop((59 * factor), (65 * factor), factor, (10 * factor)), (29 * factor), (5 * factor));
				image.composite(rain_image.clone().crop((10 * factor), (19 * factor), (2 * factor), (2 * factor)), (29 * factor), (18 * factor));

				to_delete.push(rain);

				await image.writeAsync(to_path);
			}
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/environment/snow.png", "textures/environment/rain.png", "./weather.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default WeatherConverter;
