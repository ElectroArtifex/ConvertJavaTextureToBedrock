import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class FishHookConverter
 */
class FishHookConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Convert fishhook`);

				const image_from = await Jimp.read(from_path);

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

				await image.writeAsync(to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/entity/fishhook.png", "./fishhook.png"];

		yield date;
	}
}

export default FishHookConverter;
