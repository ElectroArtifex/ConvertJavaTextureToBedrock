import {AbstractConverter} from "./AbstractConverter";

/**
 * Class NineSliceConverter
 *
 * @experimental
 */
class NineSliceConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        if (!this.options.experimental) {
            return [];
        }

        const [from, factor_detect, buttons, borders] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        const image_from = await this.readImage(from);

        image_from.ensureMinWidth(factor_detect);

        const factor = (image_from.getWidth() / factor_detect);

        for (const [x, y, width, height, nineslice_size, tos] of buttons) {
            const image = image_from.clone().crop((x * factor), (y * factor), (width * factor), (height * factor));

            image.autoCropTransparent();

            const metadata = {
                nineslice_size,
                base_size: [width, height]
            };

            for (const to of tos) {
                const to_png = to + ".png";
                this.log.log(`Convert button ${to_png} (Experimental)`);
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
            this.log.log(`Convert button ${to_png} (Experimental)`);
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
                "textures/gui/recipe_book.png",
                256,
                [
                    [54, 206, 24, 24, 5, [
                        "textures/ui/cell_image_red",
                        "textures/ui/recipe_book_red_button",
                        "textures/ui/recipe_book_red_button_pressed",
                        "textures/ui/button_trade_red",
                        "textures/ui/button_trade_red_pressed"
                    ]]
                ],
                []
            ],
            [
                "textures/gui/widgets.png",
                256,
                [
                    [0, 46, 200, 20, 5, [
                        "textures/ui/button_borderless_darkpressednohover",
                        "textures/ui/button_borderless_lightpressednohover",
                        "textures/ui/disabledButtonNoBorder",
                        "textures/ui/recipe_book_button_borderless_lightpressednohover"
                    ]],
                    [0, 66, 200, 20, 5, [
                        "textures/ui/button_borderless_dark",
                        "textures/ui/button_borderless_light",
                        "textures/ui/pocket_button_default",
                        "textures/ui/recipe_book_button_borderless_light",
                        "textures/ui/recipe_book_dark_button",
                        "textures/ui/recipe_book_light_button"
                    ]],
                    [0, 86, 200, 20, 5, [
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
                    ]],
                    [0, 22, 24, 24, 5, [
                        "textures/ui/cell_image_invert"
                    ]]
                ],
                [
                    "textures/ui/focus_border_selected",
                    "textures/ui/focus_border_white",
                    "textures/ui/pack_borders",
                    "textures/ui/pause_screen_border",
                    "textures/ui/square_image_border_white",
                    "textures/ui/world_screenshot_focus_border"
                ]
            ],
            [
                "textures/gui/container/beacon.png",
                256,
                [
                    [0, 219, 22, 22, 5, [
                        "textures/ui/beacon_button_default"
                    ]],
                    [22, 219, 22, 22, 5, [
                        "textures/ui/beacon_button_pressed"
                    ]],
                    [44, 219, 22, 22, 5, [
                        "textures/ui/beacon_button_locked"
                    ]],
                    [66, 219, 22, 22, 5, [
                        "textures/ui/beacon_button_hover"
                    ]]
                ],
                []
            ],
            [
                "textures/gui/container/enchanting_table.png",
                256,
                [
                    [0, 166, 108, 19, 5, [
                        "textures/ui/enchanting_active_background"
                    ]],
                    [0, 185, 108, 19, 5, [
                        "textures/ui/enchanting_dark_background"
                    ]],
                    [0, 204, 108, 19, 5, [
                        "textures/ui/enchanting_active_background_with_hover_text"
                    ]]
                ],
                []
            ],
            [
                "textures/gui/container/generic_54.png",
                256,
                [
                    [7, 17, 18, 18, 5, [
                        "textures/ui/cell_image",
                        "textures/ui/cell_image_normal",
                        "textures/ui/item_cell",
                        "textures/ui/recipe_book_item_bg"
                    ]],
                    [2, 2, 1, 1, 0, [
                        "textures/ui/dialog_divider",
                        "textures/ui/divider",
                        "textures/ui/divider2",
                        "textures/ui/divider3",
                        "textures/ui/HowToPlayDivider",
                        "textures/ui/lightgreybars",
                        "textures/ui/list_item_divider_line_light",
                        "textures/ui/StoreTopBar",
                        "textures/ui/StoreTopBarFiller"
                    ]]
                ],
                [
                    "textures/ui/recipe_book_pane_bg",
                    "textures/ui/recipe_book_touch_cell_selected"
                ]
            ],
            [
                "textures/gui/container/inventory.png",
                256,
                [
                    [25, 7, 51, 72, 5, [
                        "textures/ui/player_preview_border"
                    ]]
                ],
                []
            ],
            [
                "textures/gui/container/creative_inventory/tab_item_search.png",
                256,
                [
                    [80, 4, 90, 12, 5, [
                        "textures/ui/edit_box_indent",
                        "textures/ui/edit_box_indent_hover"
                    ]]
                ],
                []
            ],
            [
                "textures/gui/container/creative_inventory/tabs.png",
                256,
                [
                    [0, 0, 28, 32, 5, [
                        "textures/ui/pocket_tab_left_side",
                        "textures/ui/recipe_book_side_toggle_dark",
                        "textures/ui/TabLeftBack",
                        "textures/ui/TabLeftBackBottomMost",
                        "textures/ui/TabLeftBackTopMost",
                        "textures/ui/TabTopBackLeftMost"
                    ]],
                    [28, 0, 28, 32, 5, [
                        "textures/ui/recipe_back_panel",
                        "textures/ui/TabTopBack",
                        "textures/ui/toolbar_background"
                    ]],
                    [140, 0, 28, 32, 5, [
                        "textures/ui/pocket_tab_right_side",
                        "textures/ui/TabRightBack",
                        "textures/ui/TabRightBackBottomMost",
                        "textures/ui/TabRightBackTopMost",
                        "textures/ui/TabTopBackRightMost",
                        "textures/ui/TabTopBackRightMostDark",
                        "textures/ui/XTab"
                    ]],
                    [0, 32, 28, 32, 5, [
                        "textures/ui/recipe_book_side_toggle_dark_hover",
                        "textures/ui/TabLeftFront",
                        "textures/ui/TabLeftFrontBottomMost",
                        "textures/ui/TabLeftFrontTopMost",
                        "textures/ui/TabTopFrontLeftMost"
                    ]],
                    [28, 32, 28, 32, 5, [
                        "textures/ui/TabTopFront"
                    ]],
                    [140, 32, 28, 32, 5, [
                        "textures/ui/TabRightFront",
                        "textures/ui/TabRightFrontBottomMost",
                        "textures/ui/TabRightFrontTopMost",
                        "textures/ui/TabTopFrontRightMost",
                        "textures/ui/TabTopFrontRightMostDark"
                    ]]
                ],
                []
            ]
        ];
    }
}

export {NineSliceConverter};
