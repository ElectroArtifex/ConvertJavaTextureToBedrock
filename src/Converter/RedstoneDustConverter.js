import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
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

		for await (const [dot, line_0, line_1, to_cross, to_line] of this.getData()) {
			if (await this.output.exists(dot) && await this.output.exists(line_0) && await this.output.exists(line_1)) {
				Utils.log(`Convert redstone dust`);

				const image = await this.readImage(line_0);

				image.rotate(90).crop(0, 0, (image.getWidth() - 2), (image.getHeight() - 2)); // TODO: Why the rotated image is 2px to large in both sides?

				await this.writeImage(to_line, image);

				image.composite(await this.readImage(line_1), 0, 0);

				image.composite(await this.readImage(dot), 0, 0);

				await this.writeImage(to_cross, image);
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
		const date = ["textures/blocks/redstone_dust_dot.png", "textures/blocks/redstone_dust_line0.png", "textures/blocks/redstone_dust_line1.png", "textures/blocks/redstone_dust_cross.png", "textures/blocks/redstone_dust_line.png"];

		yield date;
	}
}

export default RedstoneDustConverter;
