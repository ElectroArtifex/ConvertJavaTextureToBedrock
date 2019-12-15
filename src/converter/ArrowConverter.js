import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class ArrowConverter
 */
class ArrowConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        const to_delete = [];

        if (!await this.output.exists(from)) {
            return to_delete;
        }

        this.log.log(`Convert arrow ${to}`);

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / 32);

        const image = await this.createImage((32 * factor), (32 * factor));

        image_from.crop(0, 0, image_from.getWidth(), (10 * factor));

        image.composite(image_from, 0, 0);

        image_from.grayscale();

        image_from.scan(0, 0, image_from.getWidth(), image_from.getHeight(), (x, y, idx) => {
            if (image_from.bitmap.data[idx] < 192 || image_from.bitmap.data[idx + 1] < 192 || image_from.bitmap.data[idx + 2] < 192) {
                image_from.bitmap.data[idx] = (image_from.bitmap.data[idx] / 255 * 186);
                image_from.bitmap.data[idx + 1] = (image_from.bitmap.data[idx + 1] / 255 * 98);
                image_from.bitmap.data[idx + 2] = (image_from.bitmap.data[idx + 2] / 255 * 168);
            }
        });

        image.composite(image_from, 0, (10 * factor));

        await this.writeImage(to, image);

        to_delete.push(new DeleteConverter(from));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/projectiles/arrow.png", "textures/entity/arrows.png"]
        ];
    }
}

export {ArrowConverter};
