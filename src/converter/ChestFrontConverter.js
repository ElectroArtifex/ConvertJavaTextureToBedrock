import {AbstractConverter} from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class ChestFrontConverter
 */
class ChestFrontConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Create chest front ${to}`);

				const image_from = await this.readImage(from);

				const factor = (image_from.getWidth() / 64);

				const image = await Jimp.create((14 * factor), (14 * factor));

				image.composite(image_from.clone().crop((14 * factor), (14 * factor), (14 * factor), (5 * factor)), 0, 0);

				image.composite(image_from.clone().crop((14 * factor), (34 * factor), (14 * factor), (9 * factor)), 0, (5 * factor));
				image.composite(image_from.clone().crop(factor, factor, (2 * factor), (4 * factor)), (6 * factor), (3 * factor));

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
			["textures/entity/chest/normal.png", "textures/blocks/chest_front.png"],
			["textures/entity/chest/trapped.png", "textures/blocks/trapped_chest_front.png"],
			["textures/entity/chest/ender.png", "textures/blocks/ender_chest_front.png"],
		];
	}
}

export {ChestFrontConverter};
