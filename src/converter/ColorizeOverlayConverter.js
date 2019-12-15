import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class ColorizeOverlayConverter
 */
class ColorizeOverlayConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [overlays, to] = this.data;

        const to_delete = [];

        let image = null;

        for (const [overlay, color, delete_overlay] of overlays) {
            if (!await this.output.exists(overlay)) {
                continue;
            }

            const image_overlay = await this.readImage(overlay);

            if (image === null) {
                this.log.log(`Colorize and overlay ${to}`);

                image = await this.createImage(image_overlay.getWidth(), image_overlay.getHeight());
            }

            image_overlay.colorize(color);

            image.composite(image_overlay, 0, 0);

            if (delete_overlay) {
                to_delete.push(new DeleteConverter(overlay));
            }
        }

        if (image !== null) {
            await this.writeImage(to, image);
        }

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            // Armor (Colors from px 9/1 from original cloth_1.png bedrock texture)
            [[["textures/models/armor/leather_1.png", [167, 105, 67]]], "textures/models/armor/cloth_1.png"],
            [[["textures/models/armor/leather_2.png", [167, 105, 67]]], "textures/models/armor/cloth_2.png"],

            // Grass, fern, water & co.
            [[["textures/blocks/double_plant_fern_top.png", [80, 121, 43]]], "textures/blocks/double_plant_fern_carried.png"], // 3/5 (double_plant_fern_carried.png)
            [[["textures/blocks/double_plant_grass_top.png", [80, 121, 43]]], "textures/blocks/double_plant_grass_carried.png"], // 3/5 (double_plant_fern_carried.png)
            [[["textures/blocks/fern.png", [50, 81, 44]]], "textures/blocks/fern_carried.png"], // 7/0 (fern_carried.tga)
            [[["textures/blocks/grass_top.png", [78, 119, 42]]], "textures/blocks/grass_carried.png"], // 0/0 (grass_carried.png)
            [[["textures/blocks/leaves_acacia.png", [42, 106, 9]]], "textures/blocks/leaves_acacia_carried.png"], // 0/0 (leaves_acacia_carried.tga)
            [[["textures/blocks/leaves_big_oak.png", [34, 90, 9]]], "textures/blocks/leaves_big_oak_carried.png"], // 0/0 (leaves_big_oak_carried.tga)
            [[["textures/blocks/leaves_birch.png", [71, 92, 46]]], "textures/blocks/leaves_birch_carried.png"], // 0/0 (leaves_birch_carried.tga)
            [[["textures/blocks/leaves_jungle.png", [42, 107, 9]]], "textures/blocks/leaves_jungle_carried.png"], // 0/1 (leaves_jungle_carried.tga)
            [[["textures/blocks/leaves_oak.png", [23, 63, 3]]], "textures/blocks/leaves_oak_carried.png"], // 0/0 (leaves_oak_carried.tga)
            [[["textures/blocks/leaves_spruce.png", [58, 92, 58]]], "textures/blocks/leaves_spruce_carried.png"], // 0/0 (leaves_spruce_carried.tga)
            [[["textures/blocks/tallgrass.png", [81, 123, 44]]], "textures/blocks/tallgrass_carried.png"], // 1/5 (tallgrass_carried.tga)
            [[["textures/blocks/waterlily.png", [67, 102, 36]]], "textures/blocks/carried_waterlily.png"], // 4/2 (carried_waterlily.png)
            [[["textures/blocks/water_flow_grey.png", [86, 132, 254]]], "textures/blocks/water_flow.png"], // 0/0 (water_flow.png)
            [[["textures/blocks/water_still_grey.png", [215, 215, 215]]], "textures/blocks/cauldron_water.png"], // 0/0 (cauldron_water.png)
            [[["textures/blocks/water_still_grey.png", [86, 132, 254]]], "textures/blocks/water_still.png"],// 0/0 (water_flow.png)
            [[["textures/blocks/vine.png", [80, 121, 43]]], "textures/blocks/vine_carried.png"], // 1/1 (vine_carried.png)

            // Lingering potion (Colors from px 7/9 from original bedrock textures)
            [[["textures/items/potion_overlay.png", [88, 148, 255]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering.png"],
            [[["textures/items/potion_overlay.png", [232, 58, 56]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_damageBoost.png"],
            [[["textures/items/potion_overlay.png", [255, 244, 92]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_fireResistance.png"],
            [[["textures/items/potion_overlay.png", [106, 16, 14]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_harm.png"],
            [[["textures/items/potion_overlay.png", [255, 58, 56]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_heal.png"],
            [[["textures/items/potion_overlay.png", [202, 208, 232]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_invisibility.png"],
            [[["textures/items/potion_overlay.png", [54, 255, 120]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_jump.png"],
            [[["textures/items/potion_overlay.png", [242, 255, 202]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_luck.png"],
            [[["textures/items/potion_overlay.png", [142, 172, 204]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_moveSlowdown.png"],
            [[["textures/items/potion_overlay.png", [196, 255, 255]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_moveSpeed.png"],
            [[["textures/items/potion_overlay.png", [50, 50, 255]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_nightVision.png"],
            [[["textures/items/potion_overlay.png", [124, 232, 78]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_poison.png"],
            [[["textures/items/potion_overlay.png", [255, 146, 255]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_regeneration.png"],
            [[["textures/items/potion_overlay.png", [255, 255, 255]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_slowFall.png"],
            [[["textures/items/potion_overlay.png", [186, 144, 156]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_turtleMaster.png"],
            [[["textures/items/potion_overlay.png", [72, 130, 242]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_waterBreathing.png"],
            [[["textures/items/potion_overlay.png", [114, 122, 114]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_weakness.png"],
            [[["textures/items/potion_overlay.png", [84, 66, 62]], ["textures/items/potion_bottle_lingering_empty.png"]], "textures/items/potion_bottle_lingering_wither.png"],

            // Map (Colors from px 6/7 from original bedrock textures)
            [[["textures/items/map_filled.png"], ["textures/items/map_filled_markings.png", [82, 76, 68]]], "textures/items/map_mansion.png"],
            [[["textures/items/map_filled.png"], ["textures/items/map_filled_markings.png", [67, 124, 111]]], "textures/items/map_monument.png"],
            [[["textures/items/map_filled.png"], ["textures/items/map_filled_markings.png", [103, 90, 173]]], "textures/items/map_nautilus.png"],
            [[["textures/items/map_filled.png"], ["textures/items/map_filled_markings.png", [131, 131, 131]]], "textures/items/map_filled.png"],
            [[["textures/items/map_filled.png"], ["textures/items/map_filled_markings.png", [131, 131, 131], true]], "textures/items/map_locked.png"],
            [[["textures/ui/cartography_table_map.png"], ["textures/ui/cartography_table_glass.png"]], "textures/ui/cartography_table_glass.png"],

            // Potion (Colors from px 7/9 from original bedrock textures)
            [[["textures/items/potion_overlay.png", [58, 130, 255]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_absorption.png"],
            [[["textures/items/potion_overlay.png", [50, 50, 56]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_blindness.png"],
            [[["textures/items/potion_overlay.png", [134, 46, 118]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_confusion.png"],
            [[["textures/items/potion_overlay.png", [232, 58, 56]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_damageBoost.png"],
            [[["textures/items/potion_overlay.png", [118, 104, 36]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_digSlowdown.png"],
            [[["textures/items/potion_overlay.png", [255, 255, 106]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_digSpeed.png"],
            [[["textures/items/potion_overlay.png", [88, 148, 255]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_drinkable.png"],
            [[["textures/items/potion_overlay.png", [255, 244, 92]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_fireResistance.png"],
            [[["textures/items/potion_overlay.png", [106, 16, 14]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_harm.png"],
            [[["textures/items/potion_overlay.png", [255, 58, 56]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_heal.png"],
            [[["textures/items/potion_overlay.png", [255, 198, 56]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_healthBoost.png"],
            [[["textures/items/potion_overlay.png", [140, 186, 132]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_hunger.png"],
            [[["textures/items/potion_overlay.png", [202, 208, 232]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_invisibility.png"],
            [[["textures/items/potion_overlay.png", [54, 255, 120]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_jump.png"],
            [[["textures/items/potion_overlay.png", [54, 255, 120]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_levitation.png"],
            [[["textures/items/potion_overlay.png", [142, 172, 204]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_moveSlowdown.png"],
            [[["textures/items/potion_overlay.png", [196, 255, 255]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_moveSpeed.png"],
            [[["textures/items/potion_overlay.png", [50, 50, 255]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_nightVision.png"],
            [[["textures/items/potion_overlay.png", [124, 232, 78]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_poison.png"],
            [[["textures/items/potion_overlay.png", [255, 146, 255]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_regeneration.png"],
            [[["textures/items/potion_overlay.png", [242, 110, 92]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_resistance.png"],
            [[["textures/items/potion_overlay.png", [255, 58, 56]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_saturation.png"],
            [[["textures/items/potion_overlay.png", [255, 255, 255]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_slowFall.png"],
            [[["textures/items/potion_overlay.png", [186, 144, 156]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_turtleMaster.png"],
            [[["textures/items/potion_overlay.png", [72, 130, 242]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_waterBreathing.png"],
            [[["textures/items/potion_overlay.png", [114, 112, 114]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_weakness.png"],
            [[["textures/items/potion_overlay.png", [84, 66, 62]], ["textures/items/potion_bottle_empty.png"]], "textures/items/potion_bottle_wither.png"],

            // Redstone dust
            [[["textures/blocks/redstone_dust_cross.png"], ["textures/blocks/redstone_dust_overlay.png"]], "textures/blocks/redstone_dust_cross.png"],
            [[["textures/blocks/redstone_dust_line.png"], ["textures/blocks/redstone_dust_overlay.png", null, true]], "textures/blocks/redstone_dust_line.png"],

            // Saddle
            [[["textures/entity/pig/pig.png"], ["textures/entity/saddle.png"]], "textures/entity/pig/pig_saddle.png"],

            // Splash potion (Colors from px 7/9 from original bedrock textures)
            [[["textures/items/potion_overlay.png", [88, 184, 255]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash.png"],
            [[["textures/items/potion_overlay.png", [58, 130, 255]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_absorption.png"],
            [[["textures/items/potion_overlay.png", [50, 50, 56]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_blindness.png"],
            [[["textures/items/potion_overlay.png", [134, 46, 118]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_confusion.png"],
            [[["textures/items/potion_overlay.png", [232, 58, 56]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_damageBoost.png"],
            [[["textures/items/potion_overlay.png", [118, 104, 36]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_digSlowdown.png"],
            [[["textures/items/potion_overlay.png", [255, 255, 106]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_digSpeed.png"],
            [[["textures/items/potion_overlay.png", [255, 255, 184]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_fireResistance.png"],
            [[["textures/items/potion_overlay.png", [212, 32, 28]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_harm.png"],
            [[["textures/items/potion_overlay.png", [255, 116, 112]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_heal.png"],
            [[["textures/items/potion_overlay.png", [255, 198, 56]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_healthBoost.png"],
            [[["textures/items/potion_overlay.png", [140, 186, 132]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_hunger.png"],
            [[["textures/items/potion_overlay.png", [202, 208, 232]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_invisibility.png"],
            [[["textures/items/potion_overlay.png", [54, 255, 120]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_jump.png"],
            [[["textures/items/potion_overlay.png", [54, 255, 120]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_levitation.png"],
            [[["textures/items/potion_overlay.png", [142, 172, 204]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_moveSlowdown.png"],
            [[["textures/items/potion_overlay.png", [196, 255, 255]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_moveSpeed.png"],
            [[["textures/items/potion_overlay.png", [50, 50, 255]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_nightVision.png"],
            [[["textures/items/potion_overlay.png", [124, 232, 78]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_poison.png"],
            [[["textures/items/potion_overlay.png", [255, 146, 255]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_regeneration.png"],
            [[["textures/items/potion_overlay.png", [242, 110, 92]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_resistance.png"],
            [[["textures/items/potion_overlay.png", [255, 58, 56]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_saturation.png"],
            [[["textures/items/potion_overlay.png", [255, 255, 255]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_slowFall.png"],
            [[["textures/items/potion_overlay.png", [186, 144, 156]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_turtleMaster.png"],
            [[["textures/items/potion_overlay.png", [72, 130, 242]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_waterBreathing.png"],
            [[["textures/items/potion_overlay.png", [114, 122, 114]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_weakness.png"],
            [[["textures/items/potion_overlay.png", [84, 66, 62]], ["textures/items/potion_bottle_splash_empty.png"]], "textures/items/potion_bottle_splash_wither.png"],

            // Spawn egg (Colors from px 8/9 and 5/9 from original bedrock textures)
            [[["textures/items/spawn_egg.png", [65, 53, 41]], ["textures/items/spawn_egg_overlay.png", [13, 13, 13]]], "textures/items/egg_bat.png"],
            [[["textures/items/spawn_egg.png", [211, 153, 1]], ["textures/items/spawn_egg_overlay.png", [226, 220, 112]]], "textures/items/egg_blaze.png"],
            [[["textures/items/spawn_egg.png", [239, 200, 142]], ["textures/items/spawn_egg_overlay.png", [135, 101, 74]]], "textures/items/egg_cat.png"],
            [[["textures/items/spawn_egg.png", [10, 57, 67]], ["textures/items/spawn_egg_overlay.png", [149, 12, 12]]], "textures/items/egg_cave_spider.png"],
            [[["textures/items/spawn_egg.png", [138, 138, 138]], ["textures/items/spawn_egg_overlay.png", [226, 0, 0]]], "textures/items/egg_chicken.png"],
            [[["textures/items/spawn_egg.png", [205, 90, 18]], ["textures/items/spawn_egg_overlay.png", [226, 221, 212]]], "textures/items/egg_clownfish.png"],
            [[["textures/items/spawn_egg.png", [166, 143, 91]], ["textures/items/spawn_egg_overlay.png", [203, 174, 123]]], "textures/items/egg_cod.png"],
            [[["textures/items/spawn_egg.png", [58, 46, 33]], ["textures/items/spawn_egg_overlay.png", [143, 143, 143]]], "textures/items/egg_cow.png"],
            [[["textures/items/spawn_egg.png", [11, 143, 9]], ["textures/items/spawn_egg_overlay.png", [0, 0, 0]]], "textures/items/egg_creeper.png"],
            [[["textures/items/spawn_egg.png", [29, 51, 66]], ["textures/items/spawn_egg_overlay.png", [221, 221, 221]]], "textures/items/egg_dolphin.png"],
            [[["textures/items/spawn_egg.png", [71, 59, 49]], ["textures/items/spawn_egg_overlay.png", [119, 104, 90]]], "textures/items/egg_donkey.png"],
            [[["textures/items/spawn_egg.png", [123, 207, 185]], ["textures/items/spawn_egg_overlay.png", [107, 138, 90]]], "textures/items/egg_drowned.png"],
            [[["textures/items/spawn_egg.png", [177, 175, 160]], ["textures/items/spawn_egg_overlay.png", [103, 105, 130]]], "textures/items/egg_elderguardian.png"],
            [[["textures/items/spawn_egg.png", [19, 19, 19]], ["textures/items/spawn_egg_overlay.png", [19, 19, 19]]], "textures/items/egg_enderman.png"],
            [[["textures/items/spawn_egg.png", [19, 19, 19]], ["textures/items/spawn_egg_overlay.png", [97, 97, 97]]], "textures/items/egg_endermite.png"],
            [[["textures/items/spawn_egg.png", [128, 133, 133]], ["textures/items/spawn_egg_overlay.png", [27, 25, 23]]], "textures/items/egg_evoker.png"],
            [[["textures/items/spawn_egg.png", [166, 143, 91]], ["textures/items/spawn_egg_overlay.png", [203, 174, 123]]], "textures/items/egg_fish.png"],
            [[["textures/items/spawn_egg.png", [183, 156, 137]], ["textures/items/spawn_egg_overlay.png", [181, 93, 28]]], "textures/items/egg_fox.png"],
            [[["textures/items/spawn_egg.png", [214, 214, 214]], ["textures/items/spawn_egg_overlay.png", [167, 167, 167]]], "textures/items/egg_ghast.png"],
            [[["textures/items/spawn_egg.png", [77, 112, 98]], ["textures/items/spawn_egg_overlay.png", [214, 111, 43]]], "textures/items/egg_guardian.png"],
            [[["textures/items/spawn_egg.png", [165, 136, 107]], ["textures/items/spawn_egg_overlay.png", [211, 203, 0]]], "textures/items/egg_horse.png"],
            [[["textures/items/spawn_egg.png", [102, 99, 83]], ["textures/items/spawn_egg_overlay.png", [197, 191, 127]]], "textures/items/egg_husk.png"],
            [[["textures/items/spawn_egg.png", [45, 0, 0]], ["textures/items/spawn_egg_overlay.png", [223, 223, 0]]], "textures/items/egg_lava_slime.png"],
            [[["textures/items/spawn_egg.png", [165, 136, 107]], ["textures/items/spawn_egg_overlay.png", [136, 84, 57]]], "textures/items/egg_llama.png"],
            [[["textures/items/spawn_egg.png"], ["textures/items/spawn_egg_overlay.png"]], "textures/items/egg_mask.png"],
            [[["textures/items/spawn_egg.png", [23, 2, 0]], ["textures/items/spawn_egg_overlay.png", [72, 45, 26]]], "textures/items/egg_mule.png"],
            [[["textures/items/spawn_egg.png", [137, 13, 14]], ["textures/items/spawn_egg_overlay.png", [162, 162, 162]]], "textures/items/egg_mushroomcow.png"],
            [[["textures/items/spawn_egg.png"], ["textures/items/spawn_egg_overlay.png"]], "textures/items/egg_null.png"],
            [[["textures/items/spawn_egg.png", [205, 191, 107]], ["textures/items/spawn_egg_overlay.png", [76, 60, 46]]], "textures/items/egg_ocelot.png"],
            [[["textures/items/spawn_egg.png", [217, 217, 215]], ["textures/items/spawn_egg_overlay.png", [19, 19, 25]]], "textures/items/egg_panda.png"],
            [[["textures/items/spawn_egg.png", [11, 143, 9]], ["textures/items/spawn_egg_overlay.png", [226, 0, 0]]], "textures/items/egg_parrot.png"],
            [[["textures/items/spawn_egg.png", [58, 70, 119]], ["textures/items/spawn_egg_overlay.png", [121, 226, 0]]], "textures/items/egg_phantom.png"],
            [[["textures/items/spawn_egg.png", [206, 142, 139]], ["textures/items/spawn_egg_overlay.png", [194, 88, 84]]], "textures/items/egg_pig.png"],
            [[["textures/items/spawn_egg.png", [201, 126, 126]], ["textures/items/spawn_egg_overlay.png", [67, 100, 36]]], "textures/items/egg_pigzombie.png"],
            [[["textures/items/spawn_egg.png", [71, 40, 46]], ["textures/items/spawn_egg_overlay.png", [132, 137, 137]]], "textures/items/egg_pillager.png"],
            [[["textures/items/spawn_egg.png", [208, 208, 208]], ["textures/items/spawn_egg_overlay.png", [132, 132, 128]]], "textures/items/egg_polarbear.png"],
            [[["textures/items/spawn_egg.png", [211, 153, 1]], ["textures/items/spawn_egg_overlay.png", [49, 173, 214]]], "textures/items/egg_pufferfish.png"],
            [[["textures/items/spawn_egg.png", [131, 82, 55]], ["textures/items/spawn_egg_overlay.png", [102, 64, 43]]], "textures/items/egg_rabbit.png"],
            [[["textures/items/spawn_egg.png", [100, 100, 96]], ["textures/items/spawn_egg_overlay.png", [81, 71, 65]]], "textures/items/egg_ravager.png"],
            [[["textures/items/spawn_egg.png", [137, 13, 14]], ["textures/items/spawn_egg_overlay.png", [12, 117, 103]]], "textures/items/egg_salmon.png"],
            [[["textures/items/spawn_egg.png", [198, 198, 198]], ["textures/items/spawn_egg_overlay.png", [226, 160, 160]]], "textures/items/egg_sheep.png"],
            [[["textures/items/spawn_egg.png", [127, 88, 127]], ["textures/items/spawn_egg_overlay.png", [68, 50, 73]]], "textures/items/egg_shulker.png"],
            [[["textures/items/spawn_egg.png", [94, 94, 94]], ["textures/items/spawn_egg_overlay.png", [43, 43, 43]]], "textures/items/egg_silverfish.png"],
            [[["textures/items/spawn_egg.png", [166, 166, 166]], ["textures/items/spawn_egg_overlay.png", [65, 65, 65]]], "textures/items/egg_skeleton.png"],
            [[["textures/items/spawn_egg.png", [89, 89, 89]], ["textures/items/spawn_egg_overlay.png", [203, 203, 191]]], "textures/items/egg_skeletonhorse.png"],
            [[["textures/items/spawn_egg.png", [70, 137, 53]], ["textures/items/spawn_egg_overlay.png", [112, 169, 97]]], "textures/items/egg_slime.png"],
            [[["textures/items/spawn_egg.png", [45, 39, 33]], ["textures/items/spawn_egg_overlay.png", [149, 12, 12]]], "textures/items/egg_spider.png"],
            [[["textures/items/spawn_egg.png", [29, 51, 66]], ["textures/items/spawn_egg_overlay.png", [99, 121, 136]]], "textures/items/egg_squid.png"],
            [[["textures/items/spawn_egg.png", [82, 100, 101]], ["textures/items/spawn_egg_overlay.png", [193, 206, 205]]], "textures/items/egg_stray.png"],
            [[["textures/items/spawn_egg.png", [198, 198, 198]], ["textures/items/spawn_egg_overlay.png", [0, 155, 155]]], "textures/items/egg_turtle.png"],
            [[["textures/items/spawn_egg.png", [105, 124, 141]], ["textures/items/spawn_egg_overlay.png", [206, 210, 214]]], "textures/items/egg_vex.png"],
            [[["textures/items/spawn_egg.png", [74, 52, 44]], ["textures/items/spawn_egg_overlay.png", [167, 123, 101]]], "textures/items/egg_villager.png"],
            [[["textures/items/spawn_egg.png", [128, 133, 133]], ["textures/items/spawn_egg_overlay.png", [35, 83, 86]]], "textures/items/egg_vindicator.png"],
            [[["textures/items/spawn_egg.png", [55, 84, 130]], ["textures/items/spawn_egg_overlay.png", [204, 142, 41]]], "textures/items/egg_wanderingtrader.png"],
            [[["textures/items/spawn_egg.png", [45, 0, 0]], ["textures/items/spawn_egg_overlay.png", [72, 142, 55]]], "textures/items/egg_witch.png"],
            [[["textures/items/spawn_egg.png", [17, 17, 17]], ["textures/items/spawn_egg_overlay.png", [63, 68, 68]]], "textures/items/egg_wither.png"],
            [[["textures/items/spawn_egg.png", [185, 181, 181]], ["textures/items/spawn_egg_overlay.png", [183, 155, 133]]], "textures/items/egg_wolf.png"],
            [[["textures/items/spawn_egg.png", [0, 150, 150]], ["textures/items/spawn_egg_overlay.png", [107, 138, 90]]], "textures/items/egg_zombie.png"],
            [[["textures/items/spawn_egg.png", [36, 77, 47]], ["textures/items/spawn_egg_overlay.png", [117, 184, 113]]], "textures/items/egg_zombiehorse.png"],
            [[["textures/items/spawn_egg.png", [74, 52, 44]], ["textures/items/spawn_egg_overlay.png", [107, 138, 90]]], "textures/items/egg_zombievillager.png"],

            // Tipped arrow (Colors from px 12/3 from original bedrock textures)
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png"]], "textures/items/tipped_arrow.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [214, 144, 54]]], "textures/items/tipped_arrow_fireres.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [65, 10, 9]]], "textures/items/tipped_arrow_harm.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [232, 34, 33]]], "textures/items/tipped_arrow_healing.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [123, 127, 141]]], "textures/items/tipped_arrow_invisibility.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [33, 247, 74]]], "textures/items/tipped_arrow_leaping.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [49, 148, 0]]], "textures/items/tipped_arrow_luck.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [30, 30, 156]]], "textures/items/tipped_arrow_nightvision.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [74, 138, 46]]], "textures/items/tipped_arrow_poison.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [192, 86, 161]]], "textures/items/tipped_arrow_regen.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [87, 105, 125]]], "textures/items/tipped_arrow_slow.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [247, 232, 202]]], "textures/items/tipped_arrow_slowfalling.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [142, 35, 34]]], "textures/items/tipped_arrow_strength.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [116, 164, 186]]], "textures/items/tipped_arrow_swift.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [113, 88, 96]]], "textures/items/tipped_arrow_turtlemaster.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [45, 79, 148]]], "textures/items/tipped_arrow_waterbreathing.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [70, 75, 70]]], "textures/items/tipped_arrow_weakness.png"],
            [[["textures/items/tipped_arrow_base.png"], ["textures/items/tipped_arrow_head.png", [50, 39, 36]]], "textures/items/tipped_arrow_wither.png"]
        ];
    }
}

export {ColorizeOverlayConverter};
