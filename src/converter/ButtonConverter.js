import {AbstractConverter} from "./AbstractConverter";

/**
 * Class ButtonConverter
 */
class ButtonConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, factor_detect, buttons, borders] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        const image_from = await this.readImage(from);

        image_from.ensureMinWidth(factor_detect);

        const factor = (image_from.getWidth() / factor_detect);

        for (const [x, y, width, height, tos] of buttons) {
            const image = image_from.clone().crop((x * factor), (y * factor), (width * factor), (height * factor));

            image.autoCropTransparent();

            const metadata = {
                nineslice_size: 5,
                base_size: [width, height]
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
            nineslice_size: 0,
            base_size: [1, 1]
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
            [
                "textures/gui/widgets.png",
                256,
                [
                    [0, 46, 200, 20, [
                        "textures/ui/button_borderless_darkpressednohover",
                        "textures/ui/button_borderless_lightpressednohover",
                        "textures/ui/disabledButtonNoBorder",
                        "textures/ui/recipe_book_button_borderless_lightpressednohover"
                    ]],
                    [0, 66, 200, 20, [
                        "textures/ui/button_borderless_dark",
                        "textures/ui/button_borderless_light",
                        "textures/ui/pocket_button_default",
                        "textures/ui/recipe_book_button_borderless_light",
                        "textures/ui/recipe_book_dark_button",
                        "textures/ui/recipe_book_light_button"
                    ]],
                    [0, 86, 200, 20, [
                        "textures/ui/button_borderless_darkhover",
                        "textures/ui/button_borderless_darkpressed",
                        "textures/ui/button_borderless_lighthover",
                        "textures/ui/button_borderless_lightpressed",
                        "textures/ui/pocket_button_hover",
                        "textures/ui/pocket_button_pressed",
                        "textures/ui/recipe_book_button_borderless_lighthover",
                        "textures/ui/recipe_book_button_borderless_lightpressed",
                        "textures/ui/recipe_book_dark_button_pressed",
                        "textures/ui/recipe_book_light_button_pressed"
                    ]]
                ],
                [
                    "textures/ui/focus_border_selected",
                    "textures/ui/focus_border_white",
                    "textures/ui/world_screenshot_focus_border"
                ]
            ],
            [
                "textures/gui/container/creative_inventory/tabs.png",
                256,
                [
                    [0, 0, 28, 32, [
                        "textures/ui/pocket_tab_left_side",
                        "textures/ui/recipe_book_side_toggle_dark",
                        "textures/ui/TabLeftBack",
                        "textures/ui/TabLeftBackBottomMost",
                        "textures/ui/TabLeftBackTopMost",
                        "textures/ui/TabTopBackLeftMost"
                    ]],
                    [28, 0, 28, 32, [
                        "textures/ui/recipe_back_panel",
                        "textures/ui/TabTopBack",
                        "textures/ui/toolbar_background"
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
                        "textures/ui/recipe_book_side_toggle_dark_hover",
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
                ],
                []
            ],
            [
                "textures/gui/container/generic_54.png",
                256,
                [
                    [7, 17, 18, 18, [
                        "textures/ui/cell_image",
                        "textures/ui/recipe_book_item_bg"
                    ]]
                ],
                [
                    "textures/ui/recipe_book_pane_bg",
                    "textures/ui/recipe_book_touch_cell_selected"
                ]
            ],
            [
                "textures/gui/container/creative_inventory/tab_item_search.png",
                256,
                [
                    [79, 3, 92, 14, [
                        "textures/ui/edit_box_indent",
                        "textures/ui/edit_box_indent_hover"
                    ]]
                ],
                []
            ]
        ];
    }
}

export {ButtonConverter};
