import {AbstractConverter} from "./AbstractConverter";

/**
 * Class BannerPatternConverter
 */
class BannerPatternConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [base, patterns, to] = this.data;

        if (!await this.output.exists(base)) {
            return [];
        }

        let image = null;

        for (const [pattern, color] of patterns) {
            if (!await this.output.exists(pattern)) {
                continue;
            }

            const image_pattern = await this.readImage(pattern);

            if (image === null) {
                this.log.log(`Convert pattern banner ${to}`);

                image = await this.readImage(base);

                const factor = (image.getWidth() / 64);

                image.composite(image.clone().crop((44 * factor), 0, (8 * factor), (44 * factor)), (52 * factor), 0);
                image.composite(image.clone().crop((44 * factor), (5 * factor), (8 * factor), (20 * factor)), (52 * factor), (44 * factor));
            }

            image_pattern.scan(0, 0, image_pattern.getWidth(), image_pattern.getHeight(), (x, y, idx) => {
                if (image_pattern.bitmap.data[idx] > 0 && image_pattern.bitmap.data[idx + 3] === 255) {
                    image.bitmap.data[idx] = color[0];
                    image.bitmap.data[idx + 1] = color[1];
                    image.bitmap.data[idx + 2] = color[2];
                }
            });
        }

        if (image !== null) {
            await this.writeImage(to, image);
        }

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/banner_base.png", [
                // https://www.planetminecraft.com/banner/pillager-banner-199281/
                // Colors from original bedrock texture
                ["textures/entity/banner/base.png", [255, 255, 255]],
                ["textures/entity/banner/rhombus.png", [76, 127, 153]],
                ["textures/entity/banner/stripe_bottom.png", [146, 146, 146]],
                ["textures/entity/banner/stripe_center.png", [79, 79, 79]],
                ["textures/entity/banner/stripe_middle.png", [0, 0, 0]],
                ["textures/entity/banner/half_horizontal.png", [146, 146, 146]],
                ["textures/entity/banner/circle.png", [146, 146, 146]],
                ["textures/entity/banner/border.png", [0, 0, 0]]
            ], "textures/entity/banner/banner_pattern_illager.png"]
        ];
    }
}

export {BannerPatternConverter};
