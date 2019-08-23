import AbstractConverter from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class FishHookConverter
 */
class FishHookConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Convert fishhook`);

				const image_from = await this.readImage(from);

				const factor = (image_from.getWidth() / 8);

				const image = await Jimp.create((24 * factor), (3 * factor));

				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), factor), 0, 0);
				image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), 0, factor);
				image.composite(image_from.clone().crop((2 * factor), (6 * factor), factor, factor), factor, factor);
				image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), (2 * factor), factor);
				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), factor), 0, (2 * factor));

				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), factor), (3 * factor), 0);
				image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), (3 * factor), factor);
				image.composite(image_from.clone().crop((2 * factor), (6 * factor), factor, factor), (4 * factor), factor);
				image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), (5 * factor), factor);
				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), factor), (3 * factor), (2 * factor));

				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (6 * factor), 0);
				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (9 * factor), 0);
				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (12 * factor), 0);
				image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (15 * factor), 0);

				image.composite(image_from.clone().crop((2 * factor), (5 * factor), (3 * factor), (3 * factor)), (18 * factor), 0);
				image.composite(image_from.clone().crop((2 * factor), (6 * factor), factor, factor), (22 * factor), (2 * factor));

				await this.writeImage(to, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/entity/fishhook.png", "textures/entity/fishhook.png"];

		yield date;
	}
}

export default FishHookConverter;
