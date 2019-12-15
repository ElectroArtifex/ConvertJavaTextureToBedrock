import {AbstractConverter} from "./AbstractConverter";

/**
 * Class BarConverter
 */
class BarConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [icons, bars, nubs] = this.data;

        if (!await this.output.exists(icons)) {
            return [];
        }

        const icons_image = await this.readImage(icons);

        const factor = (icons_image.getWidth() / 256);

        for (const [y, tos] of bars) {
            const image = icons_image.clone().crop(0, (y * factor), (182 * factor), (5 * factor));

            const metadata = {
                nineslice_size: [factor, 0, factor, 0],
                base_size: [image.getWidth(), image.getHeight()]
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
                    "textures/ui/experience_bar_nub_blue.png",
                ]
            ]
        ];
    }
}

export {BarConverter};
