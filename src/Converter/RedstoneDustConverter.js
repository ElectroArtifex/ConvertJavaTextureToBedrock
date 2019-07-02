import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class RedstoneDustConverter
 */
class RedstoneDustConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [dot, line_0, line_1, to_crosss, to_line] of this.getData()) {
			const dot_path = Utils.fromPath(dot, this.path);
			const line_0_path = Utils.fromPath(line_0, this.path);
			const line_1_path = Utils.fromPath(line_1, this.path);

			const to_cross_path = Utils.toPath(to_crosss, line_0_path, this.path);
			const to_line_path = Utils.toPath(to_line, line_0_path, this.path);

			if (fs.existsSync(dot_path) && fs.existsSync(line_0_path) && fs.existsSync(line_1_path)) {
				Utils.log(`Convert redstone dust`);

				const image = await Jimp.read(line_0_path);

				image.rotate(90).crop(0, 0, (image.getWidth() - 2), (image.getHeight() - 2)); // TODO: Why the rotated image is 2px to large in both sides?

				await image.writeAsync(to_line_path);

				image.composite(await Jimp.read(line_1_path), 0, 0);

				image.composite(await Jimp.read(dot_path), 0, 0);

				await image.writeAsync(to_cross_path);
			}

			to_delete.push(dot);
			to_delete.push(line_0);
			to_delete.push(line_1);
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/blocks/redstone_dust_dot.png", "textures/blocks/redstone_dust_line0.png", "textures/blocks/redstone_dust_line1.png", "./redstone_dust_cross.png", "./redstone_dust_line.png"];

		yield date;
	}
}

export default RedstoneDustConverter;
