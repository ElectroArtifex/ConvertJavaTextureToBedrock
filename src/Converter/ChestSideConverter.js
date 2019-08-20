import AbstractConverter from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class ChestSideConverter
 */
class ChestSideConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Create chest side ${to}`);

				const image_from = await this.readImage(from);

				const factor = (image_from.getWidth() / 64);

				const image = await Jimp.create((14 * factor), (14 * factor));

				image.composite(image_from.clone().crop((28 * factor), (14 * factor), (14 * factor), (5 * factor)), 0, 0);

				image.composite(image_from.clone().crop((28 * factor), (34 * factor), (14 * factor), (9 * factor)), 0, (5 * factor));

				await this.writeImage(to, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/entity/chest/normal.png", "textures/blocks/chest_side.png"],
			["textures/entity/chest/ender.png", "textures/blocks/ender_chest_side.png"],
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default ChestSideConverter;
