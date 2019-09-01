import {AbstractConverter} from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class OpaqueConverter
 */
class OpaqueConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Create opaque ${to}`);

				/*const image = await this.readImage(from);

				image.opaque();

				await this.writeImage(to, image);*/
				const image = await this.readImage(from);

				const background_image = await Jimp.create(image.getWidth(), image.getHeight(), "#000000");

				background_image.composite(image, 0, 0);

				await this.writeImage(to, background_image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			// Leaves
			["textures/blocks/leaves_acacia.png", "textures/blocks/leaves_acacia_opaque.png"],
			["textures/blocks/leaves_big_oak.png", "textures/blocks/leaves_big_oak_opaque.png"],
			["textures/blocks/leaves_birch.png", "textures/blocks/leaves_birch_opaque.png"],
			["textures/blocks/leaves_jungle.png", "textures/blocks/leaves_jungle_opaque.png"],
			["textures/blocks/leaves_oak.png", "textures/blocks/leaves_oak_opaque.png"],
			["textures/blocks/leaves_spruce.png", "textures/blocks/leaves_spruce_opaque.png"]
		];
	}
}

export {OpaqueConverter};
