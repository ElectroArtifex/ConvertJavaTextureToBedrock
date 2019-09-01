import {AbstractConverter} from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class WaterConverter
 */
class WaterConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to, to_small_size] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Convert water ${from}`);

				const image = await this.readImage(from);

				image.grayscale(); // Fix cauldron water (Some texture packs still using a colored water texture but it's just a grayscale texture)

				if (image.getWidth() === to_small_size) {
					image.scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR); // Bedrock version has doubled pixels as the Java version
				}

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
			["textures/blocks/water_flow_grey.png", "textures/blocks/water_flow_grey.png", 16],
			["textures/blocks/water_still_grey.png", "textures/blocks/water_still_grey.png", 8]
		];
	}
}

export {WaterConverter};
