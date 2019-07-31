import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class FireworksConverter
 */
class FireworksConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Convert fireworks`);

				const image_from = await Jimp.read(from_path);

				const factor = (image_from.getWidth() / 16);

				const image = await Jimp.create((32 * factor), (32 * factor));

				image.composite(image_from.clone().crop((6 * factor), (2 * factor), (5 * factor), (12 * factor)).rotate(-90).crop(1, 0, (12 * factor), (5 * factor)), (3 * factor), (6 * factor)); // TODO: Why the rotated image is 2px to large in both sides?

				image.composite(image_from.clone().crop((8 * factor), (6 * factor), factor, factor), (3 * factor), (8 * factor)); // One pixel is wrong (Fuze)

				await image.writeAsync(to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/items/fireworks.png", "textures/entity/fireworks.png"];

		yield date;
	}
}

export default FireworksConverter;
