import {AbstractConverter} from "./AbstractConverter";

/**
 * Class BarConverter
 */
class BarConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, factor_detect, bars, nubs] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / factor_detect);

        for (const [y, tos] of bars) {
            const image = image_from.clone().crop(0, (y * factor), (182 * factor), (5 * factor));

            const metadata = {
                nineslice_size: [1, 0, 1, 0],
                base_size: [182, 5]
            };

            for (const [to, colorize] of tos) {
                const to_png = to + ".png";
                this.log.log(`Convert bar ${to_png}`);
                await this.writeImage(to_png, image.clone().colorize(colorize));

                await this.writeJson(to + ".json", metadata);
            }
        }

        const transparent_image = await this.createImage(factor, (5 * factor));
        for (const nub of nubs) {
            this.log.log(`Convert bar ${nub}`);

            this.writeImage(nub, transparent_image);
        }

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            [
                "textures/gui/icons.png",
                256,
                [
                    [64, [
                        ["textures/gui/achievements/hotdogempty"],
                        ["textures/ui/empty_progress_bar"],
                        ["textures/ui/experiencebarempty"],
                        ["textures/ui/experience_bar_empty_blue"]
                    ]],
                    [69, [
                        ["textures/gui/achievements/hotdogfull"],
                        ["textures/ui/experiencebarfull"]
                    ]],
                    [69, [
                        ["textures/ui/experience_bar_full_blue", [112, 215, 225]],
                        ["textures/ui/experience_bar_full_white", [236, 236, 236]],
                        ["textures/ui/filled_progress_bar", [236, 236, 236]]
                    ]],
                    [89, [
                        ["textures/ui/horse_jump_full"]
                    ]]
                ],
                [
                    "textures/gui/achievements/nub.png",
                    "textures/ui/experiencenub.png",
                    "textures/ui/experience_bar_nub_blue.png"
                ]
            ]
        ];
    }
}

export {BarConverter};
