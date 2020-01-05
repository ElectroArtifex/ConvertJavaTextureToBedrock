import {AbstractConverter} from "./AbstractConverter";

/**
 * Class DespriteExperimentalConverter
 *
 * @experimental
 */
class DespriteExperimentalConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        if (!this.options.experimental) {
            return [];
        }

        const [input, factor_detect, sprites] = this.data;

        if (!await this.output.exists(input)) {
            return [];
        }

        const image_from = await this.readImage(input);

        image_from.ensureMinWidth(factor_detect);

        const factor = (image_from.getWidth() / factor_detect);

        for (const [x, y, width, height, to, empty_area_alternative] of sprites) {
            this.log.log(`Desprite ${to} (Experimental)`);

            let image = image_from.clone().crop((x * factor), (y * factor), (width * factor), (height * factor));

            if (image.isEmptyArea(0, 0, image.getWidth(), image.getHeight()) && empty_area_alternative) {
                image = image_from.clone().crop((empty_area_alternative[0] * factor), (empty_area_alternative[1] * factor), (empty_area_alternative[2] * factor), (empty_area_alternative[3] * factor));
            }

            await this.writeImage(to, image);
        }

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            [
                "textures/gui/recipe_book.png",
                256,
                [
                    [152, 41, 26, 16, "textures/ui/craft_toggle_off.png"],
                    [152, 59, 26, 16, "textures/ui/craft_toggle_off_hover.png"],
                    [180, 41, 26, 16, "textures/ui/craft_toggle_on.png"],
                    [180, 59, 26, 16, "textures/ui/craft_toggle_on_hover.png"]
                ]
            ],
            [
                "textures/gui/widgets.png",
                256,
                [
                    [0, 22, 24, 24, "textures/ui/pocket_ui_highlight_selected_slot.png"],
                    [0, 22, 24, 24, "textures/ui/pocket_ui_highlight_slot.png"]
                ]
            ],
            [
                "textures/gui/container/anvil.png",
                256,
                [
                    [99, 45, 22, 15, "textures/ui/arrow_large.png"],
                    [17, 7, 30, 30, "textures/ui/anvil_icon.png"],
                    [53, 49, 13, 13, "textures/ui/anvil-plus.png"],
                    [176, 0, 28, 21, "textures/ui/crossout.png"]
                ]
            ],
            [
                "textures/gui/container/beacon.png",
                256,
                [
                    [58, 108, 5, 18, "textures/ui/beacon_item_seperator_pocket.png"],
                    [58, 108, 5, 18, "textures/ui/item_seperator.png"],
                    [18, 22, 19, 22, "textures/ui/pyramid_level_1.png"],
                    [18, 47, 19, 22, "textures/ui/pyramid_level_2.png"],
                    [18, 72, 19, 22, "textures/ui/pyramid_level_3.png"],
                    [158, 22, 19, 22, "textures/ui/pyramid_level_4.png"],
                    [88, 219, 22, 22, "textures/ui/confirm.png"],
                    [110, 219, 22, 22, "textures/ui/cancel.png"]
                ]
            ],
            [
                "textures/gui/container/brewing_stand.png",
                256,
                [
                    [17, 17, 16, 16, "textures/ui/brewing_fuel_empty.png"],
                    [56, 51, 16, 16, "textures/ui/bottle_empty.png"],
                    [60, 43, 19, 6, "textures/ui/brewing_fuel_bar_empty.png"],
                    [176, 29, 18, 4, "textures/ui/brewing_fuel_bar_full.png"],
                    [63, 14, 12, 29, "textures/ui/bubbles_empty.png"],
                    [185, 0, 12, 29, "textures/ui/bubbles_full.png"],
                    [34, 28, 26, 20, "textures/ui/brewing_fuel_pipes.png"],
                    [73, 34, 28, 23, "textures/ui/brewing_pipes.png"],
                    [73, 34, 28, 23, "textures/ui/brewing_pipes_large.png"],
                    [97, 16, 9, 28, "textures/ui/brewing_arrow_empty.png"],
                    [97, 16, 9, 28, "textures/ui/brewing_arrow_large_empty.png"],
                    [176, 0, 9, 28, "textures/ui/brewing_arrow_full.png"],
                    [176, 0, 9, 28, "textures/ui/brewing_arrow_large_full.png"]
                ]
            ],
            [
                "textures/gui/container/enchanting_table.png",
                256,
                [
                    [35, 47, 16, 16, "textures/ui/lapis.png"],
                    [35, 47, 16, 16, "textures/ui/lapis_image.png"],
                    [3, 225, 13, 11, "textures/ui/dust_selectable_1.png"],
                    [19, 225, 13, 11, "textures/ui/dust_selectable_2.png"],
                    [34, 225, 13, 11, "textures/ui/dust_selectable_3.png"],
                    [3, 241, 13, 11, "textures/ui/dust_unselectable_1.png"],
                    [19, 241, 13, 11, "textures/ui/dust_unselectable_2.png"],
                    [34, 241, 13, 11, "textures/ui/dust_unselectable_3.png"]
                ]
            ],
            [
                "textures/gui/container/furnace.png",
                256,
                [
                    [79, 35, 24, 17, "textures/ui/arrow_inactive.png"],
                    [176, 14, 24, 17, "textures/ui/arrow_active.png"],
                    [56, 36, 14, 14, "textures/ui/flame_empty_image.png"],
                    [176, 0, 14, 14, "textures/ui/flame_full_image.png"]
                ]
            ],
            [
                "textures/gui/container/horse.png",
                256,
                [
                    [1, 221, 16, 16, "textures/ui/empty_horse_slot_armor.png"],
                    [19, 221, 16, 16, "textures/ui/empty_horse_slot_saddle.png"],
                    [37, 221, 16, 16, "textures/ui/empty_llama_slot_carpet.png"]
                ]
            ],
            [
                "textures/gui/container/inventory.png",
                256,
                [
                    [135, 29, 16, 13, "textures/ui/arrow.png"]
                ]
            ],
            [
                "textures/gui/container/loom.png",
                256,
                [
                    [176, 0, 16, 16, "textures/ui/loom_banner_empty.png", [13, 26, 16, 16]],
                    [192, 0, 16, 16, "textures/ui/loom_dye_empty.png", [33, 26, 16, 16]],
                    [208, 0, 16, 16, "textures/ui/loom_pattern_item_empty.png", [23, 45, 16, 16]]
                ]
            ]
        ];
    }
}

export {DespriteExperimentalConverter};
