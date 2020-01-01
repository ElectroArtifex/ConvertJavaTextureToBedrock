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

        for (const [x, y, width, height, to] of sprites) {
            this.log.log(`Desprite ${to} (Experimental)`);

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
                "textures/gui/widgets.png",
                256,
                [
                    [0, 22, 24, 24, "textures/ui/pocket_ui_highlight_selected_slot.png"],
                    [0, 22, 24, 24, "textures/ui/pocket_ui_highlight_slot.png"]
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
            ]
        ];
    }
}

export {DespriteExperimentalConverter};
