import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";
import Jimp from "jimp";

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
				this.log.log(`Convert weather`);

				const snow_image = await this.readImage(snow);

				const rain_image = await this.readImage(rain);

				const factor = (snow_image.getWidth() / 64);

				const image = await this.createImage((32 * factor), (32 * factor));

				// Snow
				image.composite(snow_image.clone().crop(0, 0, snow_image.getWidth(), (3 * factor)).cover(image.getWidth(), (3 * factor), undefined, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, 0);

				to_delete.push(snow);

				// Rain
				image.composite(rain_image.clone().crop(0, 0, rain_image.getWidth(), (5 * factor)).cover(image.getWidth(), (5 * factor), undefined, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, (5*factor));

				to_delete.push(rain);

				await this.writeImage(to, image);
			}
		}

		return [new DeleteConverter(to_delete)];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			["textures/environment/snow.png", "textures/environment/rain.png", "textures/environment/weather.png"]
		];
	}
}

export {WeatherConverter};
