import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Utils from "../Utils/Utils";

/**
 * Class CopyConverter
 */
class CopyConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Copy ${from} to ${to}`);

				await fs.copy(from_path, to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			// Cat
			["textures/entity/cat/redtabby.png", "./red.png"],
			["textures/entity/cat/siamesecat.png", "./siamese.png"],
			["textures/entity/cat/tuxedo.png", "./blackcat.png"],

			// Command block
			["textures/blocks/command_block_back_mipmap.png", "./command_block.png"],

			// Fire
			["textures/blocks/fire_0.png", "textures/flame_atlas.png"],

			// Kelp
			["textures/blocks/kelp_a.tga", "./kelp_b.tga"],
			["textures/blocks/kelp_a.tga", "./kelp_c.tga"],
			["textures/blocks/kelp_a.tga", "./kelp_d.tga"],
			["textures/blocks/kelp_top.tga", "./kelp_top_bulb.tga"],

			// Lever
			["textures/blocks/lever.png", "textures/items/lever.png"],

			// Llama
			["textures/entity/llama/llama_creamy.png", "./llama.png"],

			// Pattern
			["textures/items/skull_banner_pattern.png", "./banner_pattern.png"],

			// Sign
			["textures/ui/sign.png", "textures/gui/sign.png"],

			// Skull
			["textures/entity/creeper/creeper.png", "textures/entity/skulls/creeper.png"],
			["textures/entity/skeleton/skeleton.png", "textures/entity/skulls/skeleton.png"],
			["textures/entity/skeleton/wither_skeleton.png", "textures/entity/skulls/wither_skeleton.png"],
			["textures/entity/zombie/zombie.png", "textures/entity/skulls/zombie.png"],

			// UI
			["textures/blocks/brick.png", "textures/ui/icon_recipe_construction.png"],
			["textures/blocks/grass_side_carried.png", "textures/ui/icon_recipe_nature.png"],
			["textures/items/bed_red.png", "textures/ui/icon_recipe_item.png"],
			["textures/items/diamond_sword.png", "textures/ui/icon_recipe_equipment.png"],
			["textures/gui/background/panorama_0.png", ".textures/ui/panorama_0.png"],
			["textures/gui/background/panorama_1.png", ".textures/ui/panorama_1.png"],
			["textures/gui/background/panorama_2.png", ".textures/ui/panorama_2.png"],
			["textures/gui/background/panorama_3.png", ".textures/ui/panorama_3.png"],
			["textures/gui/background/panorama_4.png", ".textures/ui/panorama_4.png"],
			["textures/gui/background/panorama_5.png", ".textures/ui/panorama_5.png"],

			["bedrock_textures", "./textures"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default CopyConverter;
