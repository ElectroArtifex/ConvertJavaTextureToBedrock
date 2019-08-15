import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
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
			if (await this.output.exists(snow) && await this.output.exists(rain)) {
				try {
					Utils.log(`Convert weather`);

					const snow_image = await this.readImage(snow);

					const rain_image = await this.readImage(rain);

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

					await this.writeImage(to, image);
				} catch (err) {
					//  TODO: Reimplement WeatherConverter (Fix "The value of "offset" is out of range. It must be >= 0 and <= 8188. Received 10788")
					console.warn("Can't currently convert weather textures (rain and sun) properly, seems to be an other format as the default - skip it to convert the rest at least"); //
				}
			}
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/environment/snow.png", "textures/environment/rain.png", "textures/environment/weather.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default WeatherConverter;
