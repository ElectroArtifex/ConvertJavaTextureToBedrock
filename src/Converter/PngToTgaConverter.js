import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import fs from "fs-extra"
import Jimp from "jimp";
import TGA from "tga";
import Utils from "../Utils/Utils";

/**
 * Class PngToTgaConverter
 */
class PngToTgaConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [from, to, not_delete] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Create tga ${to}`);

				const image = await Jimp.read(from_path);

				const tga_image = TGA.createTgaBuffer(image.getWidth(), image.getHeight(), image.bitmap.data);

				await fs.writeFile(to_path, tga_image);

				if (!not_delete) {
					to_delete.push(from);
				}
			}
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/blocks/cactus_bottom.png", "./cactus_bottom.tga"],
			["textures/blocks/cactus_side.png", "./cactus_side.tga"],
			["textures/blocks/cactus_top.png", "./cactus_top.tga"],
			["textures/blocks/double_plant_fern_bottom.png", "./double_plant_fern_bottom.tga"],
			["textures/blocks/double_plant_fern_top.png", "./double_plant_fern_top.tga"],
			["textures/blocks/double_plant_grass_bottom.png", "./double_plant_grass_bottom.tga"],
			["textures/blocks/double_plant_grass_top.png", "./double_plant_grass_top.tga"],
			["textures/blocks/double_plant_syringa_bottom.png", "./double_plant_syringa_bottom.tga"],
			["textures/blocks/double_plant_syringa_top.png", "./double_plant_syringa_top.tga"],
			["textures/blocks/fern.png", "./fern.tga"],
			["textures/blocks/fern_carried.png", "./fern_carried.tga"],
			["textures/blocks/grass_side.png", "./grass_side.tga"],
			["textures/blocks/grass_side_snowed.png", "./grass_side_snowed.tga", true],
			["textures/blocks/grindstone_pivot.png", "./grindstone_pivot.tga"],
			["textures/blocks/grindstone_round.png", "./grindstone_round.tga"],
			["textures/blocks/grindstone_side.png", "./grindstone_side.tga"],
			["textures/blocks/kelp_a.png", "./kelp_a.tga"],
			["textures/blocks/kelp_b.png", "./kelp_b.tga"],
			["textures/blocks/kelp_c.png", "./kelp_c.tga"],
			["textures/blocks/kelp_d.png", "./kelp_d.tga"],
			["textures/blocks/kelp_top.png", "./kelp_top.tga"],
			["textures/blocks/kelp_top_bulb.png", "./kelp_top_bulb.tga"],
			["textures/blocks/leaves_acacia.png", "./leaves_acacia.tga"],
			["textures/blocks/leaves_acacia_carried.png", "./leaves_acacia_carried.tga"],
			["textures/blocks/leaves_big_oak.png", "./leaves_big_oak.tga"],
			["textures/blocks/leaves_big_oak_carried.png", "./leaves_big_oak_carried.tga"],
			["textures/blocks/leaves_birch.png", "./leaves_birch.tga"],
			["textures/blocks/leaves_birch_carried.png", "./leaves_birch_carried.tga"],
			["textures/blocks/leaves_jungle.png", "./leaves_jungle.tga"],
			["textures/blocks/leaves_jungle_carried.png", "./leaves_jungle_carried.tga"],
			["textures/blocks/leaves_oak.png", "./leaves_oak.tga"],
			["textures/blocks/leaves_oak_carried.png", "./leaves_oak_carried.tga"],
			["textures/blocks/leaves_spruce.png", "./leaves_spruce.tga"],
			["textures/blocks/leaves_spruce_carried.png", "./leaves_spruce_carried.tga"],
			["textures/blocks/reeds.png", "./reeds.tga"],
			["textures/blocks/scaffolding_bottom.png", "./scaffolding_bottom.tga"],
			["textures/blocks/scaffolding_side.png", "./scaffolding_side.tga"],
			["textures/blocks/scaffolding_top.png", "./scaffolding_top.tga"],
			["textures/blocks/seagrass_doubletall_bottom_a.png", "./seagrass_doubletall_bottom_a.tga"],
			["textures/blocks/seagrass_doubletall_bottom_b.png", "./seagrass_doubletall_bottom_b.tga"],
			["textures/blocks/seagrass_doubletall_top_a.png", "./seagrass_doubletall_top_a.tga"],
			["textures/blocks/seagrass_doubletall_top_b.png", "./seagrass_doubletall_top_b.tga"],
			["textures/blocks/stonecutter2_saw.png", "./stonecutter2_saw.tga"],
			["textures/blocks/tallgrass.png", "./tallgrass.tga", true],
			["textures/blocks/tallgrass_carried.png", "./tallgrass_carried.tga"],
			["textures/entity/blaze.png", "./blaze.tga"],
			["textures/entity/phantom.png", "./phantom.tga"],
			["textures/entity/banner/banner.png", "./banner.tga"],
			["textures/entity/banner/banner_pattern_illager.png", "./banner_pattern_illager.tga"],
			["textures/entity/cat/allblackcat_tame.png", "./allblackcat_tame.tga"],
			["textures/entity/cat/britishshorthair_tame.png", "./britishshorthair_tame.tga"],
			["textures/entity/cat/calico_tame.png", "./calico_tame.tga"],
			["textures/entity/cat/graytabby_tame.png", "./graytabby_tame.tga"],
			["textures/entity/cat/jellie_tame.png", "./jellie_tame.tga"],
			["textures/entity/cat/ocelot_tame.png", "./ocelot_tame.tga"],
			["textures/entity/cat/persian_tame.png", "./persian_tame.tga"],
			["textures/entity/cat/ragdoll_tame.png", "./ragdoll_tame.tga"],
			["textures/entity/cat/redtabby_tame.png", "./redtabby_tame.tga"],
			["textures/entity/cat/siamesecat_tame.png", "./siamesecat_tame.tga"],
			["textures/entity/cat/tabby_tame.png", "./tabby_tame.tga"],
			["textures/entity/cat/tuxedo_tame.png", "./tuxedo_tame.tga"],
			["textures/entity/cat/white_tame.png", "./white_tame.tga"],
			["textures/entity/dragon/dragon.png", "./dragon.tga"],
			["textures/entity/enderman/enderman.png", "./enderman.tga"],
			["textures/entity/ghast/ghast_shooting.png", "./ghast_shooting.tga"],
			["textures/entity/horse/armor/horse_armor_leather.png", "./horse_armor_leather.tga"],
			["textures/entity/horse2/armor/horse_armor_leather.png", "./horse_armor_leather.tga"],
			["textures/entity/sheep/sheep.png", "./sheep.tga"],
			["textures/entity/slime/magmacube.png", "./magmacube.tga"],
			["textures/entity/spider/cave_spider.png", "./cave_spider.tga"],
			["textures/entity/spider/spider.png", "./spider.tga"],
			["textures/entity/villager2/professions/armorer.png", "./armorer.tga"],
			["textures/entity/villager2/professions/butcher.png", "./butcher.tga"],
			["textures/entity/villager2/professions/cartographer.png", "./cartographer.tga"],
			["textures/entity/villager2/professions/cleric.png", "./cleric.tga"],
			["textures/entity/villager2/professions/farmer.png", "./farmer.tga"],
			["textures/entity/villager2/professions/fisherman.png", "./fisherman.tga"],
			["textures/entity/villager2/professions/fletcher.png", "./fletcher.tga"],
			["textures/entity/villager2/professions/leatherworker.png", "./leatherworker.tga"],
			["textures/entity/villager2/professions/librarian.png", "./librarian.tga"],
			["textures/entity/villager2/professions/nitwit.png", "./nitwit.tga"],
			["textures/entity/villager2/professions/shepherd.png", "./shepherd.tga"],
			["textures/entity/villager2/professions/stonemason.png", "./stonemason.tga"],
			["textures/entity/villager2/professions/toolsmith.png", "./toolsmith.tga"],
			["textures/entity/villager2/professions/unskilled.png", "./unskilled.tga"],
			["textures/entity/villager2/professions/weaponsmith.png", "./weaponsmith.tga"],
			["textures/entity/wolf/wolf_tame.png", "./wolf_tame.tga"],
			["textures/entity/zombie/drowned.png", "./drowned.tga"],
			["textures/entity/zombie_villager2/professions/armorer.png", "./armorer.tga"],
			["textures/entity/zombie_villager2/professions/butcher.png", "./butcher.tga"],
			["textures/entity/zombie_villager2/professions/cartographer.png", "./cartographer.tga"],
			["textures/entity/zombie_villager2/professions/cleric.png", "./cleric.tga"],
			["textures/entity/zombie_villager2/professions/farmer.png", "./farmer.tga"],
			["textures/entity/zombie_villager2/professions/fisherman.png", "./fisherman.tga"],
			["textures/entity/zombie_villager2/professions/fletcher.png", "./fletcher.tga"],
			["textures/entity/zombie_villager2/professions/leatherworker.png", "./leatherworker.tga"],
			["textures/entity/zombie_villager2/professions/librarian.png", "./librarian.tga"],
			["textures/entity/zombie_villager2/professions/nitwit.png", "./nitwit.tga"],
			["textures/entity/zombie_villager2/professions/shepherd.png", "./shepherd.tga"],
			["textures/entity/zombie_villager2/professions/stonemason.png", "./stonemason.tga"],
			["textures/entity/zombie_villager2/professions/toolsmith.png", "./toolsmith.tga"],
			["textures/entity/zombie_villager2/professions/weaponsmith.png", "./weaponsmith.tga"],
			["textures/items/fireworks_charge.png", "./fireworks_charge.tga"],
			["textures/items/leather_boots.png", "./leather_boots.tga"],
			["textures/items/leather_helmet.png", "./leather_helmet.tga"],
			["textures/items/leather_horse_armor.png", "./leather_horse_armor.tga"],
			["textures/items/leather_leggings.png", "./leather_leggings.tga"],
			["textures/models/armor/leather_1.png", "./leather_1.tga"],
			["textures/models/armor/leather_2.png", "./leather_2.tga"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default PngToTgaConverter;
