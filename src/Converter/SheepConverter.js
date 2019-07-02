import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";
import DeleteConverter from "./DeleteConverter";

/**
 * Class SheepConverter
 */
class SheepConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [sheep, sheep_fur] of this.getData()) {
			const sheep_path = Utils.fromPath(sheep, this.path);
			const sheep_fur_path = Utils.fromPath(sheep_fur, this.path);

			if (fs.existsSync(sheep_path) && fs.existsSync(sheep_fur_path)) {
				Utils.log(`Convert sheep`);

				const image_sheep = await Jimp.read(sheep_path);
				const image_fur = await Jimp.read(sheep_fur_path);

				const image = await Jimp.create(image_sheep.getWidth(), image_sheep.getHeight() + image_fur.getHeight());

				image.composite(image_sheep, 0, 0);

				image.composite(image_fur, 0, image_sheep.getHeight());

				image.scan(0, 0, image.getWidth(), image_sheep.getHeight(), (x, y, idx) => {
					if (image.bitmap.data[idx + 3] === 255) {
						image.bitmap.data[idx + 3] = 1;
					}
				});

				await image.writeAsync(sheep_path);
			}

			to_delete.push(sheep_fur);
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/entity/sheep/sheep.png", "textures/entity/sheep/sheep_fur.png"];

		yield date;
	}
}

export default SheepConverter;
