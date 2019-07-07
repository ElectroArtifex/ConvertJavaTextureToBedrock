import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class BannerPatternConverter
 */
class BannerPatternConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [base, patterns, to] of this.getData()) {
			const base_path = Utils.fromPath(base, this.path);
			const to_path = Utils.toPath(to, base_path, this.path);

			if (fs.existsSync(base_path)) {
				let image = null;

				for (const [pattern, color] of patterns) {
					const pattern_path = Utils.fromPath(pattern, this.path);

					if (fs.existsSync(pattern_path)) {
						const image_pattern = await Jimp.read(pattern_path);

						if (image === null) {
							Utils.log(`Convert pattern banner ${to}`);

							image = await Jimp.read(base_path);

							const factor = (image.getWidth() / 64);

							image.composite(image.clone().crop((44 * factor), 0, (8 * factor), (44 * factor)), (52 * factor), 0);
							image.composite(image.clone().crop((44 * factor), (5 * factor), (8 * factor), (20 * factor)), (52 * factor), (44 * factor));
						}

						image_pattern.scan(0, 0, image_pattern.getWidth(), image_pattern.getHeight(), (x, y, idx) => {
							if (image_pattern.bitmap.data[idx] > 0 && image_pattern.bitmap.data[idx + 3] === 255) {
								image.bitmap.data[idx] = color[0];
								image.bitmap.data[idx + 1] = color[1];
								image.bitmap.data[idx + 2] = color[2];
							}
						});
					}

					if (image !== null) {
						await image.writeAsync(to_path);
					}
				}
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/entity/banner_base.png", [
				// https://www.planetminecraft.com/banner/pillager-banner-199281/
				["textures/entity/banner/base.png", [255, 255, 255]],
				["textures/entity/banner/rhombus.png", [0, 190, 190]],
				["textures/entity/banner/stripe_bottom.png", [190, 190, 190]],
				["textures/entity/banner/stripe_center.png", [63, 63, 63]],
				["textures/entity/banner/stripe_middle.png", [0, 0, 0]],
				["textures/entity/banner/half_horizontal.png", [190, 190, 190]],
				["textures/entity/banner/circle.png", [190, 190, 190]],
				["textures/entity/banner/border.png", [0, 0, 0]]
			], "textures/entity/banner/banner_pattern_illager.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default BannerPatternConverter;
