import {AbstractConverter} from "./AbstractConverter";

/**
 * Class DespriteConverter
 */
class DespriteConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [input, factor_detect, sprites] = this.data;

        if (!await this.output.exists(input)) {
            return [];
        }

        const image_from = await this.readImage(input);

        image_from.ensureMinWidth(factor_detect);

        const factor = (image_from.getWidth() / factor_detect);

        for (const [x, y, width, height, to] of sprites) {
            this.log.log(`Desprite ${to}`);

            const image = image_from.clone().crop((x * factor), (y * factor), (width * factor), (height * factor));

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
                "textures/gui/recipe_button.png",
                256,
                [
                    [0, 0, 20, 18, "textures/ui/recipe_book_icon.png"]
                ]
            ],
            [
                "textures/gui/widgets.png",
                256,
                [
                    [0, 0, 1, 22, "textures/ui/hotbar_start_cap.png"],
                    [1, 0, 20, 22, "textures/ui/hotbar_0.png"],
                    [21, 0, 20, 22, "textures/ui/hotbar_1.png"],
                    [41, 0, 20, 22, "textures/ui/hotbar_2.png"],
                    [61, 0, 20, 22, "textures/ui/hotbar_3.png"],
                    [81, 0, 20, 22, "textures/ui/hotbar_4.png"],
                    [101, 0, 20, 22, "textures/ui/hotbar_5.png"],
                    [121, 0, 20, 22, "textures/ui/hotbar_6.png"],
                    [141, 0, 20, 22, "textures/ui/hotbar_7.png"],
                    [161, 0, 20, 22, "textures/ui/hotbar_8.png"],
                    [181, 0, 1, 22, "textures/ui/hotbar_end_cap.png"],
                    [0, 22, 24, 24, "textures/ui/selected_hotbar_slot.png"]
                ]
            ],
            [
                "textures/gui/container/cartography_table.png",
                256,
                [
                    [176, 0, 66, 66, "textures/ui/cartography_table_map.png"],
                    [176, 66, 66, 66, "textures/ui/cartography_table_zoom.png"],
                    [176, 132, 50, 50, "textures/ui/cartography_table_copy.png"],
                    [0, 166, 66, 66, "textures/ui/cartography_table_glass.png"]
                ]
            ],
            [
                "textures/gui/container/inventory.png",
                256,
                [
                    [141, 166, 24, 24, "textures/ui/hud_mob_effect_background.png"]
                ]
            ]
        ];
    }
}

export {DespriteConverter};
