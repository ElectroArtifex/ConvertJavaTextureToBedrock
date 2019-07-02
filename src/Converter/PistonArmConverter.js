import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class PistonArmConverter
 */
class PistonArmConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [top_1, top_2, side, to] of this.getData()) {
			const top_1_path = Utils.fromPath(top_1, this.path);
			const top_2_path = Utils.fromPath(top_2, this.path);
			const side_path = Utils.fromPath(side, this.path);
			const to_path = Utils.toPath(to, "", this.path);

			if (fs.existsSync(top_1_path) && fs.existsSync(top_2_path) && fs.existsSync(side_path)) {
				Utils.log(`Create piston arm ${to}`);

				const top_1_image = await Jimp.read(top_1_path);
				const top_2_image = await Jimp.read(top_2_path);
				const side_image = await Jimp.read(side_path);

				const factor = (top_1_image.getWidth() / 16);

				const image = await Jimp.create((128 * factor), (32 * factor));

				image.composite(top_1_image, (16 * factor), 0);
				image.composite(top_2_image, (32 * factor), 0);

				side_image.crop(0, 0, side_image.getWidth(), (4 * factor));
				image.composite(side_image, 0, (16 * factor));
				image.composite(side_image, (16 * factor), (16 * factor));
				image.composite(side_image, (32 * factor), (16 * factor));
				image.composite(side_image, (48 * factor), (16 * factor));

				// Arm top
				const side_image_2 = side_image.clone().rotate(-90).crop(1, 0, side_image.getHeight(), (8 * factor)); // TODO: Why the rotated image is 2px to large in both sides?

				image.composite(side_image_2, (64 * factor), (4 * factor));
				image.composite(side_image_2, (68 * factor), (4 * factor));
				image.composite(side_image_2, (72 * factor), (4 * factor));
				image.composite(side_image_2, (76 * factor), (4 * factor));

				// Arm bottom top
				const side_image_3 = side_image_2.clone().crop(0, (side_image_2.getHeight() - factor), side_image_2.getWidth(), factor);
				const side_image_4 = side_image.clone().crop((7 * factor), 0, factor, side_image.getHeight());
				const side_image_5 = side_image_2.clone().crop(0, (2 * factor), side_image_2.getWidth(), (4 * factor));

				image.composite(side_image_3, (70 * factor), (18 * factor));
				image.composite(side_image_3, (74 * factor), (18 * factor));
				image.composite(side_image_3, (78 * factor), (18 * factor));

				image.composite(side_image_4, (70 * factor), (19 * factor));
				image.composite(side_image_4, (75 * factor), (19 * factor));
				image.composite(side_image_4, (76 * factor), (19 * factor));
				image.composite(side_image_4, (81 * factor), (19 * factor));

				image.composite(side_image_3, (70 * factor), (23 * factor));
				image.composite(side_image_3, (74 * factor), (23 * factor));
				image.composite(side_image_3, (78 * factor), (23 * factor));

				// Arm bottom
				image.composite(side_image_3, (64 * factor), (24 * factor));
				image.composite(side_image_3, (68 * factor), (24 * factor));
				image.composite(side_image_3, (72 * factor), (24 * factor));
				image.composite(side_image_3, (76 * factor), (24 * factor));
				image.composite(side_image_3, (80 * factor), (24 * factor));
				image.composite(side_image_3, (84 * factor), (24 * factor));

				image.composite(side_image_4, (64 * factor), (25 * factor));
				image.composite(side_image_4, (64 * factor), (29 * factor));
				image.composite(side_image_4, (69 * factor), (25 * factor));
				image.composite(side_image_4, (69 * factor), (29 * factor));
				image.composite(side_image_4, (70 * factor), (25 * factor));
				image.composite(side_image_4, (70 * factor), (29 * factor));
				image.composite(side_image_4, (75 * factor), (25 * factor));
				image.composite(side_image_4, (75 * factor), (29 * factor));
				image.composite(side_image_4, (76 * factor), (25 * factor));
				image.composite(side_image_4, (76 * factor), (29 * factor));
				image.composite(side_image_4, (81 * factor), (25 * factor));
				image.composite(side_image_4, (81 * factor), (29 * factor));
				image.composite(side_image_4, (82 * factor), (25 * factor));
				image.composite(side_image_4, (82 * factor), (29 * factor));
				image.composite(side_image_4, (87 * factor), (25 * factor));
				image.composite(side_image_4, (87 * factor), (29 * factor));

				image.composite(side_image_5, (65 * factor), (25 * factor));
				image.composite(side_image_5, (65 * factor), (29 * factor));
				image.composite(side_image_5, (71 * factor), (25 * factor));
				image.composite(side_image_5, (71 * factor), (29 * factor));
				image.composite(side_image_5, (77 * factor), (25 * factor));
				image.composite(side_image_5, (77 * factor), (29 * factor));
				image.composite(side_image_5, (83 * factor), (25 * factor));
				image.composite(side_image_5, (83 * factor), (29 * factor));

				await image.writeAsync(to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/blocks/piston_top_normal.png", "textures/blocks/piston_top_normal.png", "textures/blocks/piston_side.png", "textures/entity/pistonarm/pistonArm.png"],
			["textures/blocks/piston_top_sticky.png", "textures/blocks/piston_top_normal.png", "textures/blocks/piston_side.png", "textures/entity/pistonarm/pistonArmSticky.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default PistonArmConverter;
