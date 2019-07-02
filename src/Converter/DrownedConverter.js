import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class DrownedConverter
 */
class DrownedConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [from, overlay, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const overlay_path = Utils.toPath(overlay, from_path, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path) && fs.existsSync(overlay_path)) {
				Utils.log(`Convert drowned`);

				const image = await Jimp.read(from_path);

				const image_overlay = await Jimp.read(overlay_path);

				const factor = (image.getWidth() / 64);

				image.composite(image_overlay.clone().crop(0, 0, (32 * factor), (16 * factor)), (32 * factor), 0);

				image.composite(image_overlay.clone().crop(0, (16 * factor), (64 * factor), (16 * factor)), 0, (32 * factor));

				image.composite(image_overlay.clone().crop((16 * factor), (48 * factor), (16 * factor), (16 * factor)), 0, (48 * factor));

				image.composite(image_overlay.clone().crop((32 * factor), (48 * factor), (16 * factor), (16 * factor)), (48 * factor), (48 * factor));

				await image.writeAsync(to_path);
			}

			to_delete.push(overlay);
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/entity/zombie/drowned.png", "textures/entity/zombie/drowned_outer_layer.png", "./drowned.png"];

		yield date;
	}
}

export default DrownedConverter;
