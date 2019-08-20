import AbstractConverter from "./AbstractConverter";
import Jimp from "jimp";
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
			if (await this.output.exists(sheep) && await this.output.exists(sheep_fur)) {
				this.log.log(`Convert sheep`);

				const image_sheep = await this.readImage(sheep);
				const image_fur = await this.readImage(sheep_fur);

				const image = await Jimp.create(image_sheep.getWidth(), image_sheep.getHeight() + image_fur.getHeight());

				image.composite(image_sheep, 0, 0);

				image.composite(image_fur, 0, image_sheep.getHeight());

				image.scan(0, 0, image.getWidth(), image_sheep.getHeight(), (x, y, idx) => {
					if (image.bitmap.data[idx + 3] === 255) {
						image.bitmap.data[idx + 3] = 1;
					}
				});

				await this.writeImage(sheep, image);
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
