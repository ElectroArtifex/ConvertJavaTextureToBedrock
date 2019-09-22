import {AbstractConverter} from "./AbstractConverter";

/**
 * Class CopyConverter
 */
class CopyConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Copy ${from} to ${to}`);

				await this.output.copy(from, to);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			// Cat
			["textures/entity/cat/redtabby.png", "textures/entity/cat/red.png"],
			["textures/entity/cat/siamesecat.png", "textures/entity/cat/siamese.png"],
			["textures/entity/cat/tuxedo.png", "textures/entity/cat/blackcat.png"],

			// Command block
			["textures/blocks/command_block_back_mipmap.png", "textures/blocks/command_block.png"],

			// Fire
			["textures/blocks/fire_0.png", "textures/flame_atlas.png"],

			// Kelp
			["textures/blocks/kelp_a.tga", "textures/blocks/kelp_b.tga"],
			["textures/blocks/kelp_a.tga", "textures/blocks/kelp_c.tga"],
			["textures/blocks/kelp_a.tga", "textures/blocks/kelp_d.tga"],
			["textures/blocks/kelp_top.tga", "textures/blocks/kelp_top_bulb.tga"],

			// Lever
			["textures/blocks/lever.png", "textures/items/lever.png"],

			// Llama
			["textures/entity/llama/llama_creamy.png", "textures/entity/llama/llama.png"],

			// Mob effect
			["textures/ui/bad_omen_effect.png", "textures/gui/newgui/mob_effects/bad_omen_effect.png"],
			["textures/ui/blindness_effect.png", "textures/gui/newgui/mob_effects/blindness_effect.png"],
			["textures/ui/fire_resistance_effect.png", "textures/gui/newgui/mob_effects/fire_resistance_effect.png"],
			["textures/ui/haste_effect.png", "textures/gui/newgui/mob_effects/haste_effect.png"],
			["textures/ui/hunger_effect.png", "textures/gui/newgui/mob_effects/hunger_effect.png"],
			["textures/ui/invisibility_effect.png", "textures/gui/newgui/mob_effects/invisibility_effect.png"],
			["textures/ui/jump_boost_effect.png", "textures/gui/newgui/mob_effects/jump_boost_effect.png"],
			["textures/ui/levitation_effect.png", "textures/gui/newgui/mob_effects/levitation_effect.png"],
			["textures/ui/mining_fatigue_effect.png", "textures/gui/newgui/mob_effects/mining_fatigue_effect.png"],
			["textures/ui/nausea_effect.png", "textures/gui/newgui/mob_effects/nausea_effect.png"],
			["textures/ui/night_vision_effect.png", "textures/gui/newgui/mob_effects/night_vision_effect.png"],
			["textures/ui/poison_effect.png", "textures/gui/newgui/mob_effects/poison_effect.png"],
			["textures/ui/regeneration_effect.png", "textures/gui/newgui/mob_effects/regeneration_effect.png"],
			["textures/ui/resistance_effect.png", "textures/gui/newgui/mob_effects/resistance_effect.png"],
			["textures/ui/slowness_effect.png", "textures/gui/newgui/mob_effects/slowness_effect.png"],
			["textures/ui/speed_effect.png", "textures/gui/newgui/mob_effects/speed_effect.png"],
			["textures/ui/strength_effect.png", "textures/gui/newgui/mob_effects/strength_effect.png"],
			["textures/ui/village_hero_effect.png", "textures/gui/newgui/mob_effects/village_hero_effect.png"],
			["textures/ui/water_breathing_effect.png", "textures/gui/newgui/mob_effects/water_breathing_effect.png"],
			["textures/ui/weakness_effect.png", "textures/gui/newgui/mob_effects/weakness_effect.png"],
			["textures/ui/wither_effect.png", "textures/gui/newgui/mob_effects/wither_effect.png"],

			// Pattern
			["textures/items/skull_banner_pattern.png", "textures/items/banner_pattern.png"],

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
			["textures/gui/background/panorama_0.png", "textures/ui/panorama_0.png"],
			["textures/gui/background/panorama_1.png", "textures/ui/panorama_1.png"],
			["textures/gui/background/panorama_2.png", "textures/ui/panorama_2.png"],
			["textures/gui/background/panorama_3.png", "textures/ui/panorama_3.png"],
			["textures/gui/background/panorama_4.png", "textures/ui/panorama_4.png"],
			["textures/gui/background/panorama_5.png", "textures/ui/panorama_5.png"],

			["bedrock_textures/", "textures/"]
		];
	}
}

export {CopyConverter};
