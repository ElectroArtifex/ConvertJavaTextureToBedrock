import {AbstractConverter} from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class BedConverter
 */
class BedConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const block of this.getData()) {
			if (await this.output.exists(block)) {
				this.log.log(`Convert bed ${block}`);

				const bed_image = await this.readImage(block);

				const factor = (bed_image.getWidth() / 64);

				const image = await Jimp.create(bed_image.getWidth(), bed_image.getHeight());

				// Top part
				image.composite(bed_image.clone().crop(0, 0, (44 * factor), (22 * factor)), 0, 0);

				// Bottom part
				image.composite(bed_image.clone().crop(0, (28 * factor), (44 * factor), (16 * factor)), 0, (22 * factor));

				// Bottom side
				image.composite(bed_image.clone().crop((22 * factor), (22 * factor), (16 * factor), (6 * factor)), (22 * factor), 0);

				// Feed 1
				image.composite(bed_image.clone().crop((50 * factor), 0, (12 * factor), (12 * factor)), 0, (38 * factor));

				// Feed 2
				image.composite(bed_image.clone().crop((50 * factor), (12 * factor), (12 * factor), (12 * factor)), (12 * factor), (38 * factor));

				await this.writeImage(block, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			"textures/entity/bed/black.png",
			"textures/entity/bed/blue.png",
			"textures/entity/bed/brown.png",
			"textures/entity/bed/cyan.png",
			"textures/entity/bed/gray.png",
			"textures/entity/bed/green.png",
			"textures/entity/bed/light_blue.png",
			"textures/entity/bed/lime.png",
			"textures/entity/bed/magenta.png",
			"textures/entity/bed/orange.png",
			"textures/entity/bed/pink.png",
			"textures/entity/bed/purple.png",
			"textures/entity/bed/red.png",
			"textures/entity/bed/silver.png",
			"textures/entity/bed/white.png",
			"textures/entity/bed/yellow.png"
		];
	}
}

export {BedConverter};
