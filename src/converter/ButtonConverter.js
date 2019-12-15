import {AbstractConverter} from "./AbstractConverter";

/**
 * Class ButtonConverter
 */
class ButtonConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, buttons, borders] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / 256);

        for (const [x, y, width, height, tos] of buttons) {
            const image = image_from.clone().crop((x * factor), (y * factor), (width * factor), (height * factor));

            image.autoCropTransparent();

            const metadata = {
                nineslice_size: factor,
                base_size: [image.getWidth(), image.getHeight()]
            };

            for (const to of tos) {
                const to_png = to + ".png";
                this.log.log(`Convert button ${to_png}`);
                await this.writeImage(to_png, image);

                await this.writeJson(to + ".json", metadata);
            }
        }

        const transparent_image = await this.createImage(factor, factor);
        const transparent_image_metadata = {
            nineslice_size: factor,
            base_size: [transparent_image.getWidth(), transparent_image.getHeight()]
        };
        for (const to of borders) {
            const to_png = to + ".png";
            this.log.log(`Convert button ${to_png}`);
            await this.writeImage(to_png, transparent_image);

            await this.writeJson(to + ".json", transparent_image_metadata);
        }

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/gui/widgets.png", [
                [0, 46, 200, 20, [
                    "textures/ui/button_borderless_darkpressednohover",
                    "textures/ui/button_borderless_lightpressednohover",
                    "textures/ui/disabledButtonNoBorder"
                ]],
                [0, 66, 200, 20, [
                    "textures/ui/button_borderless_dark",
                    "textures/ui/button_borderless_light",
                    "textures/ui/pocket_button_default"
                ]],
                [0, 86, 200, 20, [
                    "textures/ui/button_borderless_darkhover",
                    "textures/ui/button_borderless_darkpressed",
                    "textures/ui/button_borderless_lighthover",
                    "textures/ui/button_borderless_lightpressed",
                    "textures/ui/pocket_button_hover",
                    "textures/ui/pocket_button_pressed"
                ]]
            ], [
                "textures/ui/focus_border_selected",
                "textures/ui/focus_border_white"
            ]],
            ["textures/gui/container/creative_inventory/tabs.png", [
                [0, 0, 28, 32, [
                    "textures/ui/pocket_tab_left_side",
                    "textures/ui/TabLeftBack",
                    "textures/ui/TabLeftBackBottomMost",
                    "textures/ui/TabLeftBackTopMost",
                    "textures/ui/TabTopBackLeftMost"
                ]],
                [28, 0, 28, 32, [
                    "textures/ui/TabTopBack"
                ]],
                [140, 0, 28, 32, [
                    "textures/ui/pocket_tab_right_side",
                    "textures/ui/TabRightBack",
                    "textures/ui/TabRightBackBottomMost",
                    "textures/ui/TabRightBackTopMost",
                    "textures/ui/TabTopBackRightMost",
                    "textures/ui/TabTopBackRightMostDark",
                    "textures/ui/XTab"
                ]],
                [0, 32, 28, 32, [
                    "textures/ui/TabLeftFront",
                    "textures/ui/TabLeftFrontBottomMost",
                    "textures/ui/TabLeftFrontTopMost",
                    "textures/ui/TabTopFrontLeftMost"
                ]],
                [28, 32, 28, 32, [
                    "textures/ui/TabTopFront"
                ]],
                [140, 32, 28, 32, [
                    "textures/ui/TabRightFront",
                    "textures/ui/TabRightFrontBottomMost",
                    "textures/ui/TabRightFrontTopMost",
                    "textures/ui/TabTopFrontRightMost",
                    "textures/ui/TabTopFrontRightMostDark"
                ]]
            ], []]
        ];
    }
}

export {ButtonConverter};
