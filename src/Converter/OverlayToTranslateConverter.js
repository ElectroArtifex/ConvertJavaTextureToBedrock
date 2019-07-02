import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class OverlayToTranslateConverter
 */
class OverlayToTranslateConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [from, overlay, to, reverse_method, not_delete_overlay] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const overlay_path = Utils.toPath(overlay, from_path, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path) && fs.existsSync(overlay_path)) {
				Utils.log(`Create translated overlay ${to}`);

				const image = await Jimp.read(from_path);

				const image_overlay = await Jimp.read(overlay_path);

				image.scan(0, 0, image.getWidth(), image.getHeight(), (x, y, idx) => {
					if (reverse_method ? (image_overlay.bitmap.data[idx + 3] === 255) : (image.bitmap.data[idx + 3] === 0)) {
						image.bitmap.data[idx] = image_overlay.bitmap.data[idx];
						image.bitmap.data[idx + 1] = image_overlay.bitmap.data[idx + 1];
						image.bitmap.data[idx + 2] = image_overlay.bitmap.data[idx + 2];
						image.bitmap.data[idx + 3] = Math.min(1, image_overlay.bitmap.data[idx + 3]);
					}
				});

				await image.writeAsync(to_path);
			}

			if (!not_delete_overlay) {
				to_delete.push(Utils.toPath(overlay, from, ""));
			}
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			// Cat
			["textures/entity/cat/graytabby_tame.png", "./allblackcat.png", "./allblackcat_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./britishshorthair.png", "./britishshorthair_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./calico.png", "./calico_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./jellie.png", "./jellie_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./ocelot.png", "./ocelot_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./persian.png", "./persian_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./ragdoll.png", "./ragdoll_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./redtabby.png", "./redtabby_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./siamesecat.png", "./siamesecat_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./tabby.png", "./tabby_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./tuxedo.png", "./tuxedo_tame.png", false, true],
			["textures/entity/cat/graytabby_tame.png", "./white.png", "./white_tame.png", false, true],

			// Enderman
			["textures/entity/enderman/enderman.png", "./enderman_eyes.png", "./enderman.png", true],

			// Firework
			["textures/items/fireworks_charge.png", "./firework_star.png", "./fireworks_charge.png", false],

			// Grass
			["textures/blocks/grass_side.png", "./grass_side_carried.png", "./grass_side.png", false, true],

			// Leather
			["textures/items/leather_boots.png", "./leather_boots_overlay.png", "./leather_boots.png", true],
			["textures/items/leather_chestplate.png", "./leather_chestplate_overlay.png", "./leather_chestplate.png", true],
			["textures/items/leather_helmet.png", "./leather_helmet_overlay.png", "./leather_helmet.png", true],
			["textures/items/leather_leggings.png", "./leather_leggings_overlay.png", "./leather_leggings.png", true],
			["textures/models/armor/leather_1.png", "./leather_1_overlay.png", "./leather_1.png", true],
			["textures/models/armor/leather_2.png", "./leather_2_overlay.png", "./leather_2.png", true],

			// Phantom
			["textures/entity/phantom.png", "./phantom_eyes.png", "./phantom.png", true],

			// Spider
			["textures/entity/spider/cave_spider.png", "textures/entity/spider_eyes.png", "./cave_spider.png", true, true],
			["textures/entity/spider/spider.png", "textures/entity/spider_eyes.png", "./spider.png", true],

			// Wolf
			["textures/entity/wolf/wolf_collar.png", "./wolf_tame.png", "./wolf_tame.png", false, true]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default OverlayToTranslateConverter;
