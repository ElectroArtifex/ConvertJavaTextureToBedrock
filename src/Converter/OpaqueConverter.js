import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class OpaqueConverter
 */
class OpaqueConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Create opaque ${to}`);

				/*const image = await Jimp.read(from_path);

				image.opaque();

				await image.writeAsync(to_path);*/
				const image = await Jimp.read(from_path);

				const background_image = await Jimp.create(image.getWidth(), image.getHeight(), "#000000");

				background_image.composite(image, 0, 0);

				await background_image.writeAsync(to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			// Leaves
			["textures/blocks/leaves_acacia.png", "./leaves_acacia_opaque.png"],
			["textures/blocks/leaves_big_oak.png", "./leaves_big_oak_opaque.png"],
			["textures/blocks/leaves_birch.png", "./leaves_birch_opaque.png"],
			["textures/blocks/leaves_jungle.png", "./leaves_jungle_opaque.png"],
			["textures/blocks/leaves_oak.png", "./leaves_oak_opaque.png"],
			["textures/blocks/leaves_spruce.png", "./leaves_spruce_opaque.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default OpaqueConverter;
