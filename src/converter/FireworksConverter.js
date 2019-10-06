import {AbstractConverter} from "./AbstractConverter";

/**
 * Class FireworksConverter
 */
class FireworksConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Convert fireworks`);

				const image_from = await this.readImage(from);

				const factor = (image_from.getWidth() / 16);

				const image = await this.createImage((32 * factor), (32 * factor));

				image.composite(image_from.clone().crop((6 * factor), (2 * factor), (5 * factor), (12 * factor)).rotate(-90).crop(1, 0, (12 * factor), (5 * factor)), (3 * factor), (6 * factor)); // TODO: Why the rotated image is 2px to large in both sides?

				image.composite(image_from.clone().crop((8 * factor), (6 * factor), factor, factor), (3 * factor), (8 * factor)); // One pixel is wrong (Fuze)

				await this.writeImage(to, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			["textures/items/fireworks.png", "textures/entity/fireworks.png"]
		];
	}
}

export {FireworksConverter};
