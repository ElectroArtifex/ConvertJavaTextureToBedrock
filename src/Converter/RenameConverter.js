import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import path from "path";
import Utils from "../Utils/Utils";

/**
 * Class RenameConverter
 */
class RenameConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Rename ${from} to ${to}`);

				if (!fs.existsSync(path.dirname(to_path))) {
					await fs.mkdir(path.dirname(to_path));
				}

				await fs.rename(from_path, to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
				// Icon
				["pack.png", "./pack_icon.png"],

				// Base folder
				["assets/minecraft/textures", "textures"],

				// Folder
				["textures/block", "./blocks"],
				["textures/item", "./items"],

				// Andesite
				["textures/blocks/andesite.png", "./stone_andesite.png"],
				["textures/blocks/polished_andesite.png", "./stone_andesite_smooth.png"],

				// Anvil
				["textures/blocks/anvil.png", "./anvil_base.png"],
				["textures/blocks/anvil_top.png", "./anvil_top_damaged_0.png"],
				["textures/blocks/chipped_anvil_top.png", "./anvil_top_damaged_1.png"],
				["textures/blocks/damaged_anvil_top.png", "./anvil_top_damaged_2.png"],

				// Apple
				["textures/items/golden_apple.png", "./apple_golden.png"],

				// Armor & tool
				["textures/entity/armorstand/wood.png", "textures/entity/armor_stand.png"],
				["textures/entity/elytra.png", "textures/models/armor/elytra.png"],
				["textures/items/golden_axe.png", "./gold_axe.png"],
				["textures/items/golden_boots.png", "./gold_boots.png"],
				["textures/items/golden_chestplate.png", "./gold_chestplate.png"],
				["textures/items/golden_helmet.png", "./gold_helmet.png"],
				["textures/items/golden_hoe.png", "./gold_hoe.png"],
				["textures/items/golden_horse_armor.png", "./gold_horse_armor.png"],
				["textures/items/golden_leggings.png", "./gold_leggings.png"],
				["textures/items/golden_pickaxe.png", "./gold_pickaxe.png"],
				["textures/items/golden_shovel.png", "./gold_shovel.png"],
				["textures/items/golden_sword.png", "./gold_sword.png"],
				["textures/items/wooden_axe.png", "./wood_axe.png"],
				["textures/items/wooden_hoe.png", "./wood_hoe.png"],
				["textures/items/wooden_pickaxe.png", "./wood_pickaxe.png"],
				["textures/items/wooden_shovel.png", "./wood_shovel.png"],
				["textures/items/wooden_sword.png", "./wood_sword.png"],
				["textures/models/armor/chainmail_layer_1.png", "./chain_1.png"],
				["textures/models/armor/chainmail_layer_2.png", "./chain_2.png"],
				["textures/models/armor/diamond_layer_1.png", "./diamond_1.png"],
				["textures/models/armor/diamond_layer_2.png", "./diamond_2.png"],
				["textures/models/armor/gold_layer_1.png", "./gold_1.png"],
				["textures/models/armor/gold_layer_2.png", "./gold_2.png"],
				["textures/models/armor/iron_layer_1.png", "./iron_1.png"],
				["textures/models/armor/iron_layer_2.png", "./iron_2.png"],
				["textures/models/armor/leather_layer_1.png", "./leather_1.png"],
				["textures/models/armor/leather_layer_1_overlay.png", "./leather_1_overlay.png"],
				["textures/models/armor/leather_layer_2.png", "./leather_2.png"],
				["textures/models/armor/leather_layer_2_overlay.png", "./leather_2_overlay.png"],
				["textures/models/armor/turtle_layer_1.png", "./turtle_1.png"],

				// Arrow
				["textures/entity/arrow.png", "./arrows.png"],

				// Bamboo
				["textures/blocks/bamboo_large_leaves.png", "./bamboo_leaf.png"],
				["textures/blocks/bamboo_small_leaves.png", "./bamboo_small_leaf.png"],
				["textures/blocks/bamboo_stage0.png", "./bamboo_sapling.png"],
				["textures/blocks/bamboo_stalk.png", "./bamboo_stem.png"],

				// Barrier
				["textures/items/barrier.png", "textures/blocks/barrier.png"],

				// Bear
				["textures/entity/bear/polarbear.png", "textures/entity/polarbear.png"],

				// Bed
				["textures/entity/bed/light_gray.png", "./silver.png"],

				// Beetroot
				["textures/blocks/beetroots_stage0.png", "./beetroots_stage_0.png"],
				["textures/blocks/beetroots_stage1.png", "./beetroots_stage_1.png"],
				["textures/blocks/beetroots_stage2.png", "./beetroots_stage_2.png"],
				["textures/blocks/beetroots_stage3.png", "./beetroots_stage_3.png"],

				// Bell
				["textures/entity/bell/bell_body.png", "./bell.png"],
				["textures/items/bell.png", "./villagebell.png"],

				// Boat
				["textures/entity/boat/acacia.png", "./boat_acacia.png"],
				["textures/entity/boat/birch.png", "./boat_birch.png"],
				["textures/entity/boat/dark_oak.png", "./boat_darkoak.png"],
				["textures/entity/boat/jungle.png", "./boat_jungle.png"],
				["textures/entity/boat/oak.png", "./boat_oak.png"],
				["textures/entity/boat/spruce.png", "./boat_spruce.png"],
				["textures/items/acacia_boat.png", "./boat_acacia.png"],
				["textures/items/birch_boat.png", "./boat_birch.png"],
				["textures/items/dark_oak_boat.png", "./boat_darkoak.png"],
				["textures/items/jungle_boat.png", "./boat_jungle.png"],
				["textures/items/oak_boat.png", "./boat_oak.png"],
				["textures/items/spruce_boat.png", "./boat_spruce.png"],

				// Bone
				["textures/items/bone_meal.png", "./dye_powder_white.png"],

				// Book
				["textures/items/book.png", "./book_normal.png"],
				["textures/items/enchanted_book.png", "./book_enchanted.png"],
				["textures/items/knowledge_book.png", "./book_knowledge.png"],
				["textures/items/writable_book.png", "./book_writable.png"],
				["textures/items/written_book.png", "./book_written.png"],

				// Bow
				["textures/items/bow.png", "./bow_standby.png"],

				// Brick
				["textures/blocks/bricks.png", "./brick.png"],

				// Bucket
				["textures/items/bucket.png", "./bucket_empty.png"],
				["textures/items/cod_bucket.png", "./bucket_cod.png"],
				["textures/items/lava_bucket.png", "./bucket_lava.png"],
				["textures/items/milk_bucket.png", "./bucket_milk.png"],
				["textures/items/pufferfish_bucket.png", "./bucket_pufferfish.png"],
				["textures/items/salmon_bucket.png", "./bucket_salmon.png"],
				["textures/items/tropical_fish_bucket.png", "./bucket_tropical.png"],
				["textures/items/water_bucket.png", "./bucket_water.png"],

				// Campfire
				["textures/blocks/campfire_fire.png", "./campfire.png"],

				// Carrot
				["textures/blocks/carrots_stage0.png", "./carrots_stage_0.png"],
				["textures/blocks/carrots_stage1.png", "./carrots_stage_1.png"],
				["textures/blocks/carrots_stage2.png", "./carrots_stage_2.png"],
				["textures/blocks/carrots_stage3.png", "./carrots_stage_3.png"],
				["textures/items/golden_carrot.png", "./carrot_golden.png"],

				// Cat
				["textures/entity/cat/all_black.png", "./allblackcat.png"],
				["textures/entity/cat/black.png", "./tuxedo.png"],
				["textures/entity/cat/british_shorthair.png", "./britishshorthair.png"],
				["textures/entity/cat/cat_collar.png", "./graytabby_tame.png"],
				["textures/entity/cat/red.png", "./redtabby.png"],
				["textures/entity/cat/siamese.png", "./siamesecat.png"],

				// Chest
				["textures/entity/chest/normal_double.png", "./double_normal.png"],

				// Chorus fruit
				["textures/items/popped_chorus_fruit.png", "./chorus_fruit_popped.png"],

				// Cobblestone
				["textures/blocks/mossy_cobblestone.png", "./cobblestone_mossy.png"],

				// Cobweb
				["textures/blocks/cobweb.png", "./web.png"],

				// Cocoa
				["textures/blocks/cocoa_stage0.png", "./cocoa_stage_0.png"],
				["textures/blocks/cocoa_stage1.png", "./cocoa_stage_1.png"],
				["textures/blocks/cocoa_stage2.png", "./cocoa_stage_2.png"],
				["textures/items/cocoa_beans.png", "./dye_powder_brown.png"],

				// Comparator
				["textures/blocks/comparator.png", "./comparator_off.png"],

				// Composter
				["textures/blocks/composter_compost.png", "./compost.png"],
				["textures/blocks/composter_ready.png", "./compost_ready.png"],

				// Concrete
				["textures/blocks/black_concrete.png", "./concrete_black.png"],
				["textures/blocks/blue_concrete.png", "./concrete_blue.png"],
				["textures/blocks/brown_concrete.png", "./concrete_brown.png"],
				["textures/blocks/cyan_concrete.png", "./concrete_cyan.png"],
				["textures/blocks/gray_concrete.png", "./concrete_gray.png"],
				["textures/blocks/green_concrete.png", "./concrete_green.png"],
				["textures/blocks/light_blue_concrete.png", "./concrete_light_blue.png"],
				["textures/blocks/light_gray_concrete.png", "./concrete_silver.png"],
				["textures/blocks/lime_concrete.png", "./concrete_lime.png"],
				["textures/blocks/magenta_concrete.png", "./concrete_magenta.png"],
				["textures/blocks/orange_concrete.png", "./concrete_orange.png"],
				["textures/blocks/pink_concrete.png", "./concrete_pink.png"],
				["textures/blocks/purple_concrete.png", "./concrete_purple.png"],
				["textures/blocks/red_concrete.png", "./concrete_red.png"],
				["textures/blocks/white_concrete.png", "./concrete_white.png"],
				["textures/blocks/yellow_concrete.png", "./concrete_yellow.png"],

				// Concrete powder
				["textures/blocks/black_concrete_powder.png", "./concrete_powder_black.png"],
				["textures/blocks/blue_concrete_powder.png", "./concrete_powder_blue.png"],
				["textures/blocks/brown_concrete_powder.png", "./concrete_powder_brown.png"],
				["textures/blocks/cyan_concrete_powder.png", "./concrete_powder_cyan.png"],
				["textures/blocks/gray_concrete_powder.png", "./concrete_powder_gray.png"],
				["textures/blocks/green_concrete_powder.png", "./concrete_powder_green.png"],
				["textures/blocks/light_blue_concrete_powder.png", "./concrete_powder_light_blue.png"],
				["textures/blocks/light_gray_concrete_powder.png", "./concrete_powder_silver.png"],
				["textures/blocks/lime_concrete_powder.png", "./concrete_powder_lime.png"],
				["textures/blocks/magenta_concrete_powder.png", "./concrete_powder_magenta.png"],
				["textures/blocks/orange_concrete_powder.png", "./concrete_powder_orange.png"],
				["textures/blocks/pink_concrete_powder.png", "./concrete_powder_pink.png"],
				["textures/blocks/purple_concrete_powder.png", "./concrete_powder_purple.png"],
				["textures/blocks/red_concrete_powder.png", "./concrete_powder_red.png"],
				["textures/blocks/white_concrete_powder.png", "./concrete_powder_white.png"],
				["textures/blocks/yellow_concrete_powder.png", "./concrete_powder_yellow.png"],

				// Conduit
				["textures/entity/conduit/base.png", "textures/blocks/conduit_base.png"],
				["textures/entity/conduit/cage.png", "textures/blocks/conduit_cage.png"],
				["textures/entity/conduit/closed_eye.png", "textures/blocks/conduit_closed.png"],
				["textures/entity/conduit/open_eye.png", "textures/blocks/conduit_open.png"],
				["textures/entity/conduit/wind.png", "textures/blocks/conduit_wind_horizontal.png"],
				["textures/entity/conduit/wind_vertical.png", "textures/blocks/conduit_wind_vertical.png"],
				["textures/items/heart_of_the_sea.png", "./heartofthesea_closed.png"],

				// Coral
				["textures/blocks/brain_coral.png", "./coral_plant_pink.png"],
				["textures/blocks/bubble_coral.png", "./coral_plant_purple.png"],
				["textures/blocks/fire_coral.png", "./coral_plant_red.png"],
				["textures/blocks/horn_coral.png", "./coral_plant_yellow.png"],
				["textures/blocks/tube_coral.png", "./coral_plant_blue.png"],
				["textures/blocks/brain_coral_block.png", "./coral_pink.png"],
				["textures/blocks/bubble_coral_block.png", "./coral_purple.png"],
				["textures/blocks/fire_coral_block.png", "./coral_red.png"],
				["textures/blocks/horn_coral_block.png", "./coral_yellow.png"],
				["textures/blocks/tube_coral_block.png", "./coral_blue.png"],
				["textures/blocks/brain_coral_fan.png", "./coral_fan_pink.png"],
				["textures/blocks/bubble_coral_fan.png", "./coral_fan_purple.png"],
				["textures/blocks/fire_coral_fan.png", "./coral_fan_red.png"],
				["textures/blocks/horn_coral_fan.png", "./coral_fan_yellow.png"],
				["textures/blocks/tube_coral_fan.png", "./coral_fan_blue.png"],
				["textures/blocks/dead_brain_coral_block.png", "./coral_pink_dead.png"],
				["textures/blocks/dead_bubble_coral_block.png", "./coral_purple_dead.png"],
				["textures/blocks/dead_fire_coral_block.png", "./coral_red_dead.png"],
				["textures/blocks/dead_horn_coral_block.png", "./coral_yellow_dead.png"],
				["textures/blocks/dead_tube_coral_block.png", "./coral_blue_dead.png"],
				["textures/blocks/dead_brain_coral_fan.png", "./coral_fan_pink_dead.png"],
				["textures/blocks/dead_bubble_coral_fan.png", "./coral_fan_purple_dead.png"],
				["textures/blocks/dead_fire_coral_fan.png", "./coral_fan_red_dead.png"],
				["textures/blocks/dead_horn_coral_fan.png", "./coral_fan_yellow_dead.png"],
				["textures/blocks/dead_tube_coral_fan.png", "./coral_fan_blue_dead.png"],

				// Cow
				["textures/entity/cow/red_mooshroom.png", "./mooshroom.png"],

				// Dead bush
				["textures/blocks/dead_bush.png", "./deadbush.png"],

				// Destroy stage
				["textures/blocks/destroy_stage_0.png", "textures/environment/destroy_stage_0.png"],
				["textures/blocks/destroy_stage_1.png", "textures/environment/destroy_stage_1.png"],
				["textures/blocks/destroy_stage_2.png", "textures/environment/destroy_stage_2.png"],
				["textures/blocks/destroy_stage_3.png", "textures/environment/destroy_stage_3.png"],
				["textures/blocks/destroy_stage_4.png", "textures/environment/destroy_stage_4.png"],
				["textures/blocks/destroy_stage_5.png", "textures/environment/destroy_stage_5.png"],
				["textures/blocks/destroy_stage_6.png", "textures/environment/destroy_stage_6.png"],
				["textures/blocks/destroy_stage_7.png", "textures/environment/destroy_stage_7.png"],
				["textures/blocks/destroy_stage_8.png", "textures/environment/destroy_stage_8.png"],
				["textures/blocks/destroy_stage_9.png", "textures/environment/destroy_stage_9.png"],

				// Diorite
				["textures/blocks/diorite.png", "./stone_diorite.png"],
				["textures/blocks/polished_diorite.png", "./stone_diorite_smooth.png"],

				// Dispenser
				["textures/blocks/dispenser_front.png", "./dispenser_front_horizontal.png"],

				// Door
				["textures/blocks/acacia_door_bottom.png", "./door_acacia_lower.png"],
				["textures/blocks/birch_door_bottom.png", "./door_birch_lower.png"],
				["textures/blocks/dark_oak_door_bottom.png", "./door_dark_oak_lower.png"],
				["textures/blocks/iron_door_bottom.png", "./door_iron_lower.png"],
				["textures/blocks/jungle_door_bottom.png", "./door_jungle_lower.png"],
				["textures/blocks/oak_door_bottom.png", "./door_wood_lower.png"],
				["textures/blocks/spruce_door_bottom.png", "./door_spruce_lower.png"],
				["textures/blocks/acacia_door_top.png", "./door_acacia_upper.png"],
				["textures/blocks/birch_door_top.png", "./door_birch_upper.png"],
				["textures/blocks/dark_oak_door_top.png", "./door_dark_oak_upper.png"],
				["textures/blocks/iron_door_top.png", "./door_iron_upper.png"],
				["textures/blocks/jungle_door_top.png", "./door_jungle_upper.png"],
				["textures/blocks/oak_door_top.png", "./door_wood_upper.png"],
				["textures/blocks/spruce_door_top.png", "./door_spruce_upper.png"],
				["textures/items/acacia_door.png", "./door_acacia.png"],
				["textures/items/birch_door.png", "./door_birch.png"],
				["textures/items/dark_oak_door.png", "./door_dark_oak.png"],
				["textures/items/iron_door.png", "./door_iron.png"],
				["textures/items/jungle_door.png", "./door_jungle.png"],
				["textures/items/oak_door.png", "./door_wood.png"],
				["textures/items/spruce_door.png", "./door_spruce.png"],

				// Dragon
				["textures/entity/enderdragon", "./dragon"],
				["textures/entity/dragon/dragon_fireball.png", "textures/items/dragon_fireball.png"],
				["textures/items/dragon_breath.png", "./dragons_breath.png"],
				["textures/items/fire_charge.png", "./fireball.png"],

				// Dropper
				["textures/blocks/dropper_front.png", "./dropper_front_horizontal.png"],

				// Dye
				["textures/items/black_dye.png", "./dye_powder_black_new.png"],
				["textures/items/blue_dye.png", "./dye_powder_blue_new.png"],
				["textures/items/brown_dye.png", "./dye_powder_brown_new.png"],
				["textures/items/cyan_dye.png", "./dye_powder_cyan.png"],
				["textures/items/gray_dye.png", "./dye_powder_gray.png"],
				["textures/items/green_dye.png", "./dye_powder_green.png"],
				["textures/items/light_blue_dye.png", "./dye_powder_light_blue.png"],
				["textures/items/light_gray_dye.png", "./dye_powder_silver.png"],
				["textures/items/lime_dye.png", "./dye_powder_lime.png"],
				["textures/items/magenta_dye.png", "./dye_powder_magenta.png"],
				["textures/items/orange_dye.png", "./dye_powder_orange.png"],
				["textures/items/pink_dye.png", "./dye_powder_pink.png"],
				["textures/items/purple_dye.png", "./dye_powder_purple.png"],
				["textures/items/red_dye.png", "./dye_powder_red.png"],
				["textures/items/white_dye.png", "./dye_powder_white_new.png"],
				["textures/items/yellow_dye.png", "./dye_powder_yellow.png"],

				// End crystal
				["textures/entity/end_crystal", "./endercrystal"],
				["textures/entity/endercrystal/end_crystal.png", "./endercrystal.png"],
				["textures/entity/endercrystal/end_crystal_beam.png", "./endercrystal_beam.png"],

				// End portal
				["textures/blocks/end_portal_frame_eye.png", "./endframe_eye.png"],
				["textures/blocks/end_portal_frame_side.png", "./endframe_side.png"],
				["textures/blocks/end_portal_frame_top.png", "./endframe_top.png"],

				// End stone
				["textures/blocks/end_stone_bricks.png", "./end_bricks.png"],

				// Farmland
				["textures/blocks/farmland.png", "./farmland_dry.png"],
				["textures/blocks/farmland_moist.png", "./farmland_wet.png"],

				// Fern
				["textures/blocks/large_fern_bottom.png", "./double_plant_fern_bottom.png"],
				["textures/blocks/large_fern_top.png", "./double_plant_fern_top.png"],

				// Firework
				["textures/items/firework_rocket.png", "./fireworks.png"],
				["textures/items/firework_star_overlay.png", "./fireworks_charge.png"],

				// Fish
				["textures/entity/fishing_hook.png", "./fishhook.png"],
				["textures/items/cod.png", "./fish_raw.png"],
				["textures/items/cooked_cod.png", "./fish_cooked.png"],
				["textures/items/cooked_salmon.png", "./fish_salmon_cooked.png"],
				["textures/items/fishing_rod.png", "./fishing_rod_uncast.png"],
				["textures/items/pufferfish.png", "./fish_pufferfish_raw.png"],
				["textures/items/salmon.png", "./fish_salmon_raw.png"],
				["textures/items/tropical_fish.png", "./fish_clownfish_raw.png"],

				// Flesh
				["textures/items/beef.png", "./beef_raw.png"],
				["textures/items/chicken.png", "./chicken_raw.png"],
				["textures/items/cooked_beef.png", "./beef_cooked.png"],
				["textures/items/cooked_chicken.png", "./chicken_cooked.png"],
				["textures/items/cooked_mutton.png", "./mutton_cooked.png"],
				["textures/items/cooked_porkchop.png", "./porkchop_cooked.png"],
				["textures/items/mutton.png", "./mutton_raw.png"],
				["textures/items/porkchop.png", "./porkchop_raw.png"],

				// Fletching table
				["textures/blocks/fletching_table_front.png", "./fletcher_table_side2.png"],
				["textures/blocks/fletching_table_side.png", "./fletcher_table_side1.png"],
				["textures/blocks/fletching_table_top.png", "./fletcher_table_top.png"],

				// Flower
				["textures/blocks/allium.png", "./flower_allium.png"],
				["textures/blocks/azure_bluet.png", "./flower_houstonia.png"],
				["textures/blocks/blue_orchid.png", "./flower_blue_orchid.png"],
				["textures/blocks/cornflower.png", "./flower_cornflower.png"],
				["textures/blocks/dandelion.png", "./flower_dandelion.png"],
				["textures/blocks/lilac_bottom.png", "./double_plant_syringa_bottom.png"],
				["textures/blocks/lilac_top.png", "./double_plant_syringa_top.png"],
				["textures/blocks/lily_of_the_valley.png", "./flower_lily_of_the_valley.png"],
				["textures/blocks/orange_tulip.png", "./flower_tulip_orange.png"],
				["textures/blocks/poppy.png", "./flower_rose.png"],
				["textures/blocks/oxeye_daisy.png", "./flower_oxeye_daisy.png"],
				["textures/blocks/peony_bottom.png", "./double_plant_paeonia_bottom.png"],
				["textures/blocks/peony_top.png", "./double_plant_paeonia_top.png"],
				["textures/blocks/pink_tulip.png", "./flower_tulip_pink.png"],
				["textures/blocks/red_tulip.png", "./flower_tulip_red.png"],
				["textures/blocks/rose_bush_bottom.png", "./double_plant_rose_bottom.png"],
				["textures/blocks/rose_bush_top.png", "./double_plant_rose_top.png"],
				["textures/blocks/sunflower_back.png", "./double_plant_sunflower_back.png"],
				["textures/blocks/sunflower_bottom.png", "./double_plant_sunflower_bottom.png"],
				["textures/blocks/sunflower_front.png", "./double_plant_sunflower_front.png"],
				["textures/blocks/sunflower_top.png", "./double_plant_sunflower_top.png"],
				["textures/blocks/white_tulip.png", "./flower_tulip_white.png"],
				["textures/blocks/wither_rose.png", "./flower_wither_rose.png"],

				// Furnace
				["textures/blocks/blast_furnace_front.png", "./blast_furnace_front_off.png"],
				["textures/blocks/furnace_front.png", "./furnace_front_off.png"],
				["textures/blocks/smoker_front.png", "./smoker_front_off.png"],

				// Glass
				["textures/blocks/black_stained_glass.png", "./glass_black.png"],
				["textures/blocks/blue_stained_glass.png", "./glass_blue.png"],
				["textures/blocks/brown_stained_glass.png", "./glass_brown.png"],
				["textures/blocks/cyan_stained_glass.png", "./glass_cyan.png"],
				["textures/blocks/gray_stained_glass.png", "./glass_gray.png"],
				["textures/blocks/green_stained_glass.png", "./glass_green.png"],
				["textures/blocks/light_blue_stained_glass.png", "./glass_light_blue.png"],
				["textures/blocks/light_gray_stained_glass.png", "./glass_silver.png"],
				["textures/blocks/lime_stained_glass.png", "./glass_lime.png"],
				["textures/blocks/magenta_stained_glass.png", "./glass_magenta.png"],
				["textures/blocks/orange_stained_glass.png", "./glass_orange.png"],
				["textures/blocks/pink_stained_glass.png", "./glass_pink.png"],
				["textures/blocks/purple_stained_glass.png", "./glass_purple.png"],
				["textures/blocks/red_stained_glass.png", "./glass_red.png"],
				["textures/blocks/white_stained_glass.png", "./glass_white.png"],
				["textures/blocks/yellow_stained_glass.png", "./glass_yellow.png"],

				// Glass pane
				["textures/blocks/black_stained_glass_pane_top.png", "./glass_pane_top_black.png"],
				["textures/blocks/blue_stained_glass_pane_top.png", "./glass_pane_top_blue.png"],
				["textures/blocks/brown_stained_glass_pane_top.png", "./glass_pane_top_brown.png"],
				["textures/blocks/cyan_stained_glass_pane_top.png", "./glass_pane_top_cyan.png"],
				["textures/blocks/gray_stained_glass_pane_top.png", "./glass_pane_top_gray.png"],
				["textures/blocks/green_stained_glass_pane_top.png", "./glass_pane_top_green.png"],
				["textures/blocks/light_blue_stained_glass_pane_top.png", "./glass_pane_top_light_blue.png"],
				["textures/blocks/light_gray_stained_glass_pane_top.png", "./glass_pane_top_silver.png"],
				["textures/blocks/lime_stained_glass_pane_top.png", "./glass_pane_top_lime.png"],
				["textures/blocks/magenta_stained_glass_pane_top.png", "./glass_pane_top_magenta.png"],
				["textures/blocks/orange_stained_glass_pane_top.png", "./glass_pane_top_orange.png"],
				["textures/blocks/pink_stained_glass_pane_top.png", "./glass_pane_top_pink.png"],
				["textures/blocks/purple_stained_glass_pane_top.png", "./glass_pane_top_purple.png"],
				["textures/blocks/red_stained_glass_pane_top.png", "./glass_pane_top_red.png"],
				["textures/blocks/white_stained_glass_pane_top.png", "./glass_pane_top_white.png"],
				["textures/blocks/yellow_stained_glass_pane_top.png", "./glass_pane_top_yellow.png"],

				// Glazed terracotta
				["textures/blocks/black_glazed_terracotta.png", "./glazed_terracotta_black.png"],
				["textures/blocks/blue_glazed_terracotta.png", "./glazed_terracotta_blue.png"],
				["textures/blocks/brown_glazed_terracotta.png", "./glazed_terracotta_brown.png"],
				["textures/blocks/cyan_glazed_terracotta.png", "./glazed_terracotta_cyan.png"],
				["textures/blocks/gray_glazed_terracotta.png", "./glazed_terracotta_gray.png"],
				["textures/blocks/green_glazed_terracotta.png", "./glazed_terracotta_green.png"],
				["textures/blocks/light_blue_glazed_terracotta.png", "./glazed_terracotta_light_blue.png"],
				["textures/blocks/light_gray_glazed_terracotta.png", "./glazed_terracotta_silver.png"],
				["textures/blocks/lime_glazed_terracotta.png", "./glazed_terracotta_lime.png"],
				["textures/blocks/magenta_glazed_terracotta.png", "./glazed_terracotta_magenta.png"],
				["textures/blocks/orange_glazed_terracotta.png", "./glazed_terracotta_orange.png"],
				["textures/blocks/pink_glazed_terracotta.png", "./glazed_terracotta_pink.png"],
				["textures/blocks/purple_glazed_terracotta.png", "./glazed_terracotta_purple.png"],
				["textures/blocks/red_glazed_terracotta.png", "./glazed_terracotta_red.png"],
				["textures/blocks/white_glazed_terracotta.png", "./glazed_terracotta_white.png"],
				["textures/blocks/yellow_glazed_terracotta.png", "./glazed_terracotta_yellow.png"],

				// Granite
				["textures/blocks/granite.png", "./stone_granite.png"],
				["textures/blocks/polished_granite.png", "./stone_granite_smooth.png"],

				// Grass
				["textures/blocks/grass.png", "./tallgrass.png"],
				["textures/blocks/grass_block_side.png", "./grass_side_carried.png"],
				["textures/blocks/grass_block_side_overlay.png", "./grass_side.png"],
				["textures/blocks/grass_block_snow.png", "./grass_side_snowed.png"],
				["textures/blocks/grass_block_top.png", "./grass_top.png"],
				["textures/blocks/tall_grass_bottom.png", "./double_plant_grass_bottom.png"],
				["textures/blocks/tall_grass_top.png", "./double_plant_grass_top.png"],

				// Horse
				["textures/entity/horse", "./horse2"],

				// Ice
				["textures/blocks/packed_ice.png", "./ice_packed.png"],

				// Illager & pillager
				["textures/entity/illager/evoker_fangs.png", "./fangs.png"],
				["textures/entity/illager/pillager.png", "textures/entity/pillager.png"],
				["textures/entity/illager/vex.png", "textures/entity/vex/vex.png"],
				["textures/entity/illager/vex_charging.png", "textures/entity/vex/vex_charging.png"],
				["textures/entity/illager/vindicator.png", "textures/entity/vindicator.png"],

				// Ink sac
				["textures/items/ink_sac.png", "./dye_powder_black.png"],

				// Item frame
				["textures/blocks/item_frame.png", "./itemframe_background.png"],

				// Jigsaw
				["textures/blocks/jigsaw_bottom.png", "./jigsaw_back.png"],
				["textures/blocks/jigsaw_top.png", "./jigsaw_front.png"],

				// Kelp
				["textures/blocks/dried_kelp_side.png", "./dried_kelp_side_a.png"],
				["textures/blocks/kelp.png", "./kelp_top.png"],
				["textures/blocks/kelp_plant.png", "./kelp_a.png"],

				// Lapis lazuli
				["textures/items/lapis_lazuli.png", "./dye_powder_blue.png"],

				// Leaves
				["textures/blocks/acacia_leaves.png", "./leaves_acacia.png"],
				["textures/blocks/birch_leaves.png", "./leaves_birch.png"],
				["textures/blocks/dark_oak_leaves.png", "./leaves_big_oak.png"],
				["textures/blocks/jungle_leaves.png", "./leaves_jungle.png"],
				["textures/blocks/oak_leaves.png", "./leaves_oak.png"],
				["textures/blocks/spruce_leaves.png", "./leaves_spruce.png"],

				// Lily Pad
				["textures/blocks/lily_pad.png", "./waterlily.png"],

				// Llama
				["textures/entity/llama/brown.png", "./llama_brown.png"],
				["textures/entity/llama/creamy.png", "./llama_creamy.png"],
				["textures/entity/llama/gray.png", "./llama_gray.png"],
				["textures/entity/llama/white.png", "./llama_white.png"],
				["textures/entity/llama/decor/black.png", "./decor_black.png"],
				["textures/entity/llama/decor/blue.png", "./decor_blue.png"],
				["textures/entity/llama/decor/brown.png", "./decor_brown.png"],
				["textures/entity/llama/decor/cyan.png", "./decor_cyan.png"],
				["textures/entity/llama/decor/gray.png", "./decor_gray.png"],
				["textures/entity/llama/decor/green.png", "./decor_green.png"],
				["textures/entity/llama/decor/light_blue.png", "./decor_light_blue.png"],
				["textures/entity/llama/decor/light_gray.png", "./decor_silver.png"],
				["textures/entity/llama/decor/lime.png", "./decor_lime.png"],
				["textures/entity/llama/decor/magenta.png", "./decor_magenta.png"],
				["textures/entity/llama/decor/orange.png", "./decor_orange.png"],
				["textures/entity/llama/decor/pink.png", "./decor_pink.png"],
				["textures/entity/llama/decor/purple.png", "./decor_purple.png"],
				["textures/entity/llama/decor/red.png", "./decor_red.png"],
				["textures/entity/llama/decor/trader_llama.png", "./trader_llama_decor.png"],
				["textures/entity/llama/decor/white.png", "./decor_white.png"],
				["textures/entity/llama/decor/yellow.png", "./decor_yellow.png"],

				// Log
				["textures/blocks/acacia_log.png", "./log_acacia.png"],
				["textures/blocks/birch_log.png", "./log_birch.png"],
				["textures/blocks/dark_oak_log.png", "./log_big_oak.png"],
				["textures/blocks/jungle_log.png", "./log_jungle.png"],
				["textures/blocks/oak_log.png", "./log_oak.png"],
				["textures/blocks/spruce_log.png", "./log_spruce.png"],

				// Log top
				["textures/blocks/acacia_log_top.png", "./log_acacia_top.png"],
				["textures/blocks/birch_log_top.png", "./log_birch_top.png"],
				["textures/blocks/dark_oak_log_top.png", "./log_big_oak_top.png"],
				["textures/blocks/jungle_log_top.png", "./log_jungle_top.png"],
				["textures/blocks/oak_log_top.png", "./log_oak_top.png"],
				["textures/blocks/spruce_log_top.png", "./log_spruce_top.png"],

				// Map
				["textures/items/filled_map.png", "./map_filled.png"],
				["textures/items/filled_map_markings.png", "./map_filled_markings.png"],
				["textures/items/map.png", "./map_empty.png"],

				// Melon
				["textures/blocks/attached_melon_stem.png", "./melon_stem_connected.png"],
				["textures/blocks/melon_stem.png", "./melon_stem_disconnected.png"],
				["textures/items/glistering_melon_slice.png", "./melon_speckled.png"],
				["textures/items/melon_slice.png", "./melon.png"],

				// Minecart
				["textures/items/chest_minecart.png", "./minecart_chest.png"],
				["textures/items/command_block_minecart.png", "./minecart_command_block.png"],
				["textures/items/furnace_minecart.png", "./minecart_furnace.png"],
				["textures/items/hopper_minecart.png", "./minecart_hopper.png"],
				["textures/items/minecart.png", "./minecart_normal.png"],
				["textures/items/tnt_minecart.png", "./minecart_tnt.png"],

				// Mushroom
				["textures/blocks/brown_mushroom.png", "./mushroom_brown.png"],
				["textures/blocks/red_mushroom.png", "./mushroom_red.png"],
				["textures/blocks/brown_mushroom_block.png", "./mushroom_block_skin_brown.png"],
				["textures/blocks/red_mushroom_block.png", "./mushroom_block_skin_red.png"],
				["textures/blocks/mushroom_stem.png", "./mushroom_block_skin_stem.png"],

				// Music disc
				["textures/items/music_disc_11.png", "./record_11.png"],
				["textures/items/music_disc_13.png", "./record_13.png"],
				["textures/items/music_disc_blocks.png", "./record_blocks.png"],
				["textures/items/music_disc_cat.png", "./record_cat.png"],
				["textures/items/music_disc_chirp.png", "./record_chirp.png"],
				["textures/items/music_disc_far.png", "./record_far.png"],
				["textures/items/music_disc_mall.png", "./record_mall.png"],
				["textures/items/music_disc_mellohi.png", "./record_mellohi.png"],
				["textures/items/music_disc_stal.png", "./record_stal.png"],
				["textures/items/music_disc_strad.png", "./record_strad.png"],
				["textures/items/music_disc_wait.png", "./record_wait.png"],
				["textures/items/music_disc_ward.png", "./record_ward.png"],

				// Nether brick
				["textures/blocks/nether_bricks.png", "./nether_brick.png"],
				["textures/blocks/red_nether_bricks.png", "./red_nether_brick.png"],
				["textures/items/nether_brick.png", "./netherbrick.png"],

				// Nether portal
				["textures/blocks/nether_portal.png", "./portal.png"],

				// Nether wart
				["textures/blocks/nether_wart_stage0.png", "./nether_wart_stage_0.png"],
				["textures/blocks/nether_wart_stage1.png", "./nether_wart_stage_1.png"],
				["textures/blocks/nether_wart_stage2.png", "./nether_wart_stage_2.png"],

				// Note block
				["textures/blocks/note_block.png", "./noteblock.png"],

				// Nautilus shell
				["textures/items/nautilus_shell.png", "./nautilus.png"],

				// Observer
				["textures/blocks/observer_back_on.png", "./observer_back_lit.png"],

				// Panda
				["textures/entity/panda/aggressive_panda.png", "./panda_aggressive.png"],
				["textures/entity/panda/brown_panda.png", "./panda_brown.png"],
				["textures/entity/panda/lazy_panda.png", "./panda_lazy.png"],
				["textures/entity/panda/playful_panda.png", "./panda_playful.png"],
				["textures/entity/panda/weak_panda.png", "./panda_sneezy.png"],
				["textures/entity/panda/worried_panda.png", "./panda_worried.png"],

				// Piston
				["textures/blocks/piston_top.png", "./piston_top_normal.png"],

				// Planks
				["textures/blocks/acacia_planks.png", "./planks_acacia.png"],
				["textures/blocks/birch_planks.png", "./planks_birch.png"],
				["textures/blocks/dark_oak_planks.png", "./planks_big_oak.png"],
				["textures/blocks/jungle_planks.png", "./planks_jungle.png"],
				["textures/blocks/oak_planks.png", "./planks_oak.png"],
				["textures/blocks/spruce_planks.png", "./planks_spruce.png"],

				// Podzol
				["textures/blocks/podzol_side.png", "./dirt_podzol_side.png"],
				["textures/blocks/podzol_top.png", "./dirt_podzol_top.png"],

				// Potato
				["textures/blocks/potatoes_stage0.png", "./potatoes_stage_0.png"],
				["textures/blocks/potatoes_stage1.png", "./potatoes_stage_1.png"],
				["textures/blocks/potatoes_stage2.png", "./potatoes_stage_2.png"],
				["textures/blocks/potatoes_stage3.png", "./potatoes_stage_3.png"],
				["textures/items/baked_potato.png", "./potato_baked.png"],
				["textures/items/poisonous_potato.png", "./potato_poisonous.png"],

				// Potion
				["textures/items/lingering_potion.png", "./potion_bottle_lingering_empty.png"],
				["textures/items/potion.png", "./potion_bottle_empty.png"],
				["textures/items/splash_potion.png", "./potion_bottle_splash_empty.png"],

				// Prismarine
				["textures/blocks/dark_prismarine.png", "./prismarine_dark.png"],
				["textures/blocks/prismarine.png", "./prismarine_rough.png"],

				// Pumpkin
				["textures/blocks/attached_pumpkin_stem.png", "./pumpkin_stem_connected.png"],
				["textures/blocks/carved_pumpkin.png", "./pumpkin_face_off.png"],
				["textures/blocks/jack_o_lantern.png", "./pumpkin_face_on.png"],
				["textures/blocks/pumpkin_stem.png", "./pumpkin_stem_disconnected.png"],

				// Quartz
				["textures/blocks/chiseled_quartz_block.png", "./quartz_block_chiseled.png"],
				["textures/blocks/chiseled_quartz_block_top.png", "./quartz_block_chiseled_top.png"],
				["textures/blocks/nether_quartz_ore.png", "./quartz_ore.png"],
				["textures/blocks/quartz_pillar.png", "./quartz_block_lines.png"],
				["textures/blocks/quartz_pillar_top.png", "./quartz_block_lines_top.png"],

				// Rabbit
				["textures/entity/rabbit/black.png", "./blackrabbit.png"],
				["textures/items/cooked_rabbit.png", "./rabbit_cooked.png"],
				["textures/items/rabbit.png", "./rabbit_raw.png"],

				// Rail
				["textures/blocks/activator_rail.png", "./rail_activator.png"],
				["textures/blocks/activator_rail_on.png", "./rail_activator_powered.png"],
				["textures/blocks/detector_rail.png", "./rail_detector.png"],
				["textures/blocks/detector_rail_on.png", "./rail_detector_powered.png"],
				["textures/blocks/powered_rail.png", "./rail_golden.png"],
				["textures/blocks/powered_rail_on.png", "./rail_golden_powered.png"],
				["textures/blocks/rail.png", "./rail_normal.png"],
				["textures/blocks/rail_corner.png", "./rail_normal_turned.png"],

				// Red sand
				["textures/blocks/chiseled_red_sandstone.png", "./red_sandstone_carved.png"],
				["textures/blocks/cut_red_sandstone.png", "./red_sandstone_smooth.png"],
				["textures/blocks/red_sandstone.png", "./red_sandstone_normal.png"],

				// Redstone
				["textures/items/redstone.png", "./redstone_dust.png"],

				// Redstone lamp
				["textures/blocks/redstone_lamp.png", "./redstone_lamp_off.png"],

				// Repeater
				["textures/blocks/repeater.png", "./repeater_off.png"],

				// Saddle
				["textures/entity/pig/pig_saddle.png", "textures/entity/saddle.png"],

				// Sand
				["textures/blocks/chiseled_sandstone.png", "./sandstone_carved.png"],
				["textures/blocks/cut_sandstone.png", "./sandstone_smooth.png"],
				["textures/blocks/sandstone.png", "./sandstone_normal.png"],

				// Sapling
				["textures/blocks/acacia_sapling.png", "./sapling_acacia.png"],
				["textures/blocks/birch_sapling.png", "./sapling_birch.png"],
				["textures/blocks/dark_oak_sapling.png", "./sapling_roofed_oak.png"],
				["textures/blocks/jungle_sapling.png", "./sapling_jungle.png"],
				["textures/blocks/oak_sapling.png", "./sapling_oak.png"],
				["textures/blocks/spruce_sapling.png", "./sapling_spruce.png"],

				// Sea grass
				["textures/blocks/tall_seagrass_top.png", "./seagrass_doubletall_top_a.png"],
				["textures/blocks/tall_seagrass_bottom.png", "./seagrass_doubletall_bottom_a.png"],
				["textures/items/seagrass.png", "textures/blocks/seagrass_carried.png"],

				// Seed
				["textures/items/beetroot_seeds.png", "./seeds_beetroot.png"],
				["textures/items/melon_seeds.png", "./seeds_melon.png"],
				["textures/items/pumpkin_seeds.png", "./seeds_pumpkin.png"],
				["textures/items/wheat_seeds.png", "./seeds_wheat.png"],

				// Shield
				["textures/entity/shield_base_nopattern.png", "./shield.png"],

				// Shulker
				["textures/blocks/black_shulker_box.png", "./shulker_top_black.png"],
				["textures/blocks/blue_shulker_box.png", "./shulker_top_blue.png"],
				["textures/blocks/brown_shulker_box.png", "./shulker_top_brown.png"],
				["textures/blocks/cyan_shulker_box.png", "./shulker_top_cyan.png"],
				["textures/blocks/gray_shulker_box.png", "./shulker_top_gray.png"],
				["textures/blocks/green_shulker_box.png", "./shulker_top_green.png"],
				["textures/blocks/light_blue_shulker_box.png", "./shulker_top_light_blue.png"],
				["textures/blocks/light_gray_shulker_box.png", "./shulker_top_silver.png"],
				["textures/blocks/lime_shulker_box.png", "./shulker_top_lime.png"],
				["textures/blocks/magenta_shulker_box.png", "./shulker_top_magenta.png"],
				["textures/blocks/orange_shulker_box.png", "./shulker_top_orange.png"],
				["textures/blocks/pink_shulker_box.png", "./shulker_top_pink.png"],
				["textures/blocks/purple_shulker_box.png", "./shulker_top_purple.png"],
				["textures/blocks/red_shulker_box.png", "./shulker_top_red.png"],
				["textures/blocks/shulker_box.png", "./shulker_top_undyed.png"],
				["textures/blocks/white_shulker_box.png", "./shulker_top_white.png"],
				["textures/blocks/yellow_shulker_box.png", "./shulker_top_yellow.png"],
				["textures/entity/shulker/shulker.png", "./shulker_undyed.png"],
				["textures/entity/shulker/shulker_black.png", "./shulker_black.png"],
				["textures/entity/shulker/shulker_blue.png", "./shulker_blue.png"],
				["textures/entity/shulker/shulker_brown.png", "./shulker_brown.png"],
				["textures/entity/shulker/shulker_cyan.png", "./shulker_cyan.png"],
				["textures/entity/shulker/shulker_gray.png", "./shulker_gray.png"],
				["textures/entity/shulker/shulker_green.png", "./shulker_green.png"],
				["textures/entity/shulker/shulker_light_blue.png", "./shulker_light_blue.png"],
				["textures/entity/shulker/shulker_light_gray.png", "./shulker_silver.png"],
				["textures/entity/shulker/shulker_lime.png", "./shulker_lime.png"],
				["textures/entity/shulker/shulker_magenta.png", "./shulker_magenta.png"],
				["textures/entity/shulker/shulker_orange.png", "./shulker_orange.png"],
				["textures/entity/shulker/shulker_pink.png", "./shulker_pink.png"],
				["textures/entity/shulker/shulker_purple.png", "./shulker_purple.png"],
				["textures/entity/shulker/shulker_red.png", "./shulker_red.png"],
				["textures/entity/shulker/shulker_white.png", "./shulker_white.png"],
				["textures/entity/shulker/shulker_yellow.png", "./shulker_yellow.png"],

				// Sign
				["textures/entity/signs/acacia.png", "textures/entity/sign_acacia.png"],
				["textures/entity/signs/birch.png", "textures/entity/sign_birch.png"],
				["textures/entity/signs/dark_oak.png", "textures/entity/sign_darkoak.png"],
				["textures/entity/signs/jungle.png", "textures/entity/sign_jungle.png"],
				["textures/entity/signs/oak.png", "textures/entity/sign.png"],
				["textures/entity/signs/spruce.png", "textures/entity/sign_spruce.png"],
				["textures/items/acacia_sign.png", "./sign_acacia.png"],
				["textures/items/birch_sign.png", "./sign_birch.png"],
				["textures/items/dark_oak_sign.png", "./sign_darkoak.png"],
				["textures/items/jungle_sign.png", "./sign_jungle.png"],
				["textures/items/oak_sign.png", "./sign.png"],
				["textures/items/spruce_sign.png", "./sign_spruce.png"],

				// Slime
				["textures/blocks/slime_block.png", "./slime.png"],
				["textures/items/slime_ball.png", "./slimeball.png"],

				// Smooth stone
				["textures/blocks/smooth_stone.png", "./stone_slab_top.png"],
				["textures/blocks/smooth_stone_slab_side.png", "./stone_slab_side.png"],

				// Spawner
				["textures/blocks/spawner.png", "./mob_spawner.png"],

				// Spider
				["textures/items/fermented_spider_eye.png", "./spider_eye_fermented.png"],

				// Sponge
				["textures/blocks/wet_sponge.png", "./sponge_wet.png"],

				// Stone brick
				["textures/blocks/chiseled_stone_bricks.png", "./stonebrick_carved.png"],
				["textures/blocks/cracked_stone_bricks.png", "./stonebrick_cracked.png"],
				["textures/blocks/mossy_stone_bricks.png", "./stonebrick_mossy.png"],
				["textures/blocks/stone_bricks.png", "./stonebrick.png"],

				// Stone cutter
				["textures/blocks/stonecutter_bottom.png", "./stonecutter2_bottom.png"],
				["textures/blocks/stonecutter_saw.png", "./stonecutter2_saw.png"],
				["textures/blocks/stonecutter_side.png", "./stonecutter2_side.png"],
				["textures/blocks/stonecutter_top.png", "./stonecutter2_top.png"],

				// Structure
				["textures/items/structure_void.png", "textures/blocks/structure_void.png"],

				// Sugar cane
				["textures/blocks/sugar_cane.png", "./reeds.png"],
				["textures/items/sugar_cane.png", "./reeds.png"],

				// Terracotta
				["textures/blocks/black_terracotta.png", "./hardened_clay_stained_black.png"],
				["textures/blocks/blue_terracotta.png", "./hardened_clay_stained_blue.png"],
				["textures/blocks/brown_terracotta.png", "./hardened_clay_stained_brown.png"],
				["textures/blocks/cyan_terracotta.png", "./hardened_clay_stained_cyan.png"],
				["textures/blocks/gray_terracotta.png", "./hardened_clay_stained_gray.png"],
				["textures/blocks/green_terracotta.png", "./hardened_clay_stained_green.png"],
				["textures/blocks/light_blue_terracotta.png", "./hardened_clay_stained_light_blue.png"],
				["textures/blocks/light_gray_terracotta.png", "./hardened_clay_stained_silver.png"],
				["textures/blocks/lime_terracotta.png", "./hardened_clay_stained_lime.png"],
				["textures/blocks/magenta_terracotta.png", "./hardened_clay_stained_magenta.png"],
				["textures/blocks/orange_terracotta.png", "./hardened_clay_stained_orange.png"],
				["textures/blocks/pink_terracotta.png", "./hardened_clay_stained_pink.png"],
				["textures/blocks/purple_terracotta.png", "./hardened_clay_stained_purple.png"],
				["textures/blocks/red_terracotta.png", "./hardened_clay_stained_red.png"],
				["textures/blocks/terracotta.png", "./hardened_clay.png"],
				["textures/blocks/white_terracotta.png", "./hardened_clay_stained_white.png"],
				["textures/blocks/yellow_terracotta.png", "./hardened_clay_stained_yellow.png"],

				// Torch
				["textures/blocks/redstone_torch.png", "./redstone_torch_on.png"],
				["textures/blocks/torch.png", "./torch_on.png"],

				// Totem of undying
				["textures/items/totem_of_undying.png", "./totem.png"],

				// Trapdoor
				["textures/blocks/oak_trapdoor.png", "./trapdoor.png"],

				// Tripwire
				["textures/blocks/tripwire.png", "./trip_wire.png"],
				["textures/blocks/tripwire_hook.png", "./trip_wire_source.png"],

				// Turtle
				["textures/blocks/turtle_egg.png", "./turtle_egg_not_cracked.png"],
				["textures/entity/turtle/big_sea_turtle.png", "textures/entity/sea_turtle.png"],
				["textures/items/scute.png", "./turtle_shell_piece.png"],

				// UI
				["textures/gui/options_background.png", "./background.png"],
				["textures/gui/title/background", "textures/gui/background"],

				// Villager
				["textures/entity/villager", "./villager2"],
				["textures/entity/villager2/profession", "./professions"],
				["textures/entity/villager2/profession_level", "./levels"],
				["textures/entity/villager2/type", "./biomes"],
				["textures/entity/villager2/biomes/desert.png", "./biome_desert.png"],
				["textures/entity/villager2/biomes/jungle.png", "./biome_jungle.png"],
				["textures/entity/villager2/biomes/plains.png", "./biome_plains.png"],
				["textures/entity/villager2/biomes/savanna.png", "./biome_savanna.png"],
				["textures/entity/villager2/biomes/snow.png", "./biome_snow.png"],
				["textures/entity/villager2/biomes/swamp.png", "./biome_swamp.png"],
				["textures/entity/villager2/biomes/taiga.png", "./biome_taiga.png"],
				["textures/entity/villager2/levels/diamond.png", "./level_diamond.png"],
				["textures/entity/villager2/levels/emerald.png", "./level_emerald.png"],
				["textures/entity/villager2/levels/gold.png", "./level_gold.png"],
				["textures/entity/villager2/levels/iron.png", "./level_iron.png"],
				["textures/entity/villager2/levels/stone.png", "./level_stone.png"],
				["textures/entity/villager2/professions/mason.png", "./stonemason.png"],

				// Water
				["textures/blocks/water_flow.png", "./water_flow_grey.png"],
				["textures/blocks/water_still.png", "./water_still_grey.png"],

				// Wheat
				["textures/blocks/wheat_stage0.png", "./wheat_stage_0.png"],
				["textures/blocks/wheat_stage1.png", "./wheat_stage_1.png"],
				["textures/blocks/wheat_stage2.png", "./wheat_stage_2.png"],
				["textures/blocks/wheat_stage3.png", "./wheat_stage_3.png"],
				["textures/blocks/wheat_stage4.png", "./wheat_stage_4.png"],
				["textures/blocks/wheat_stage5.png", "./wheat_stage_5.png"],
				["textures/blocks/wheat_stage6.png", "./wheat_stage_6.png"],
				["textures/blocks/wheat_stage7.png", "./wheat_stage_7.png"],

				// Wither
				["textures/entity/wither", "./wither_boss"],

				// Wool
				["textures/blocks/black_wool.png", "./wool_colored_black.png"],
				["textures/blocks/blue_wool.png", "./wool_colored_blue.png"],
				["textures/blocks/brown_wool.png", "./wool_colored_brown.png"],
				["textures/blocks/cyan_wool.png", "./wool_colored_cyan.png"],
				["textures/blocks/gray_wool.png", "./wool_colored_gray.png"],
				["textures/blocks/green_wool.png", "./wool_colored_green.png"],
				["textures/blocks/light_blue_wool.png", "./wool_colored_light_blue.png"],
				["textures/blocks/light_gray_wool.png", "./wool_colored_silver.png"],
				["textures/blocks/lime_wool.png", "./wool_colored_lime.png"],
				["textures/blocks/magenta_wool.png", "./wool_colored_magenta.png"],
				["textures/blocks/orange_wool.png", "./wool_colored_orange.png"],
				["textures/blocks/pink_wool.png", "./wool_colored_pink.png"],
				["textures/blocks/purple_wool.png", "./wool_colored_purple.png"],
				["textures/blocks/red_wool.png", "./wool_colored_red.png"],
				["textures/blocks/white_wool.png", "./wool_colored_white.png"],
				["textures/blocks/yellow_wool.png", "./wool_colored_yellow.png"],

				// Zombie
				["textures/entity/zombie_pigman.png", "./pig/pigzombie.png"],
				["textures/entity/zombie_villager", "./zombie_villager2"],
				["textures/entity/zombie_villager2/profession", "./professions"],
				["textures/entity/zombie_villager2/profession_level", "./levels"],
				["textures/entity/zombie_villager2/type", "./biomes"],
				["textures/entity/zombie_villager2/zombie_villager.png", "./zombie-villager.png"],
				["textures/entity/zombie_villager2/biomes/desert.png", "./biome-desert-zombie.png"],
				["textures/entity/zombie_villager2/biomes/jungle.png", "./biome-jungle-zombie.png"],
				["textures/entity/zombie_villager2/biomes/plains.png", "./biome-plains-zombie.png"],
				["textures/entity/zombie_villager2/biomes/savanna.png", "./biome-savanna-zombie.png"],
				["textures/entity/zombie_villager2/biomes/snow.png", "./biome-snow-zombie.png"],
				["textures/entity/zombie_villager2/biomes/swamp.png", "./biome-swamp-zombie.png"],
				["textures/entity/zombie_villager2/biomes/taiga.png", "./biome-taiga-zombie.png"],
				["textures/entity/zombie_villager2/levels/diamond.png", "./level_diamond.png"],
				["textures/entity/zombie_villager2/levels/emerald.png", "./level_emerald.png"],
				["textures/entity/zombie_villager2/levels/gold.png", "./level_gold.png"],
				["textures/entity/zombie_villager2/levels/iron.png", "./level_iron.png"],
				["textures/entity/zombie_villager2/levels/stone.png", "./level_stone.png"],
				["textures/entity/zombie_villager2/professions/mason.png", "./stonemason.png"]
			]
		;

		for (const date of data) {
			yield date;
		}
	}
}

export default RenameConverter;
