import {AbstractConverter} from "./AbstractConverter";

/**
 * Class IconsConverter
 */
class IconsConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert icons ${from}`);

        const image = await this.readImage(from);

        image.scan(0, 0, image.getWidth(), image.getHeight(), (x, y, idx) => {
            if (image.bitmap.data[idx + 3] === 0) {
                // (255 values)
                image.bitmap.data[idx] = 0;
                image.bitmap.data[idx + 1] = 0;
                image.bitmap.data[idx + 2] = 0;
            }
        });

        this.writeImage(from, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/gui/icons.png"
        ];
    }
}

export {IconsConverter};
