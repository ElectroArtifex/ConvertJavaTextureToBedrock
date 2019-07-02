import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Utils from "../Utils/Utils";

/**
 * Class DeleteStaticConverter
 */
class DeleteStaticConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const from of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Delete ${from}`);

				await fs.remove(from_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			"assets",

			"textures/blocks/conduit.png",
			"textures/entity/conduit/break_particle.png",

			"textures/blocks/dried_kelp_bottom.png",
			"textures/blocks/water_overlay.png",

			"textures/entity/cat/cat_collar.png",

			"textures/entity/wolf/wolf_collar.png",

			"bedrock_textures"
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default DeleteStaticConverter;
