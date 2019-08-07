import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class AtlasConverter
 */
class AtlasConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [base, count, to] of this.getData()) {
			let image = null;

			for (let i = 0; i <= count; i++) {
				const step = base + (i.toString().padStart(2, "0") + ".png");

				if (await this.output.exists(step)) {
					const image_step = await this.readImage(step);

					if (image === null) {
						Utils.log(`Create atlas ${to}`);

						image = await Jimp.create(image_step.getWidth(), (image_step.getHeight() * (count + 1)));
					}

					image.composite(image_step, 0, (image_step.getHeight() * i));

					to_delete.push(step);
				}
			}

			if (image !== null) {
				await this.writeImage(to, image);
			}
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/items/clock_", 63, "textures/items/watch_atlas.png"],
			["textures/items/compass_", 31, "textures/items/compass_atlas.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default AtlasConverter;
