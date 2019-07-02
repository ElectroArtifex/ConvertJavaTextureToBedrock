import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class SideRotateConverter
 */
class SideRotateConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Create side rotate ${to}`);

				const image = await Jimp.read(from_path);

				image.flip(true, false);

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
			["textures/blocks/dried_kelp_side_a.png", "./dried_kelp_side_b.png"],
			["textures/blocks/seagrass_doubletall_top_a.png", "./seagrass_doubletall_top_b.png"],
			["textures/blocks/seagrass_doubletall_bottom_a.png", "./seagrass_doubletall_bottom_b.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default SideRotateConverter;
