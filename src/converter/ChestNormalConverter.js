import {AbstractConverter} from "./AbstractConverter";
import {MetadataConverter} from "./MetadataConverter";

/**
 * Class ChestNormalConverter
 */
class ChestNormalConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        if (MetadataConverter.mcmeta.pack.pack_format < 5) {
            return [];
        }

        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert normal chest ${from}`);

        const image_from = await this.readImage(from);

        image_from.ensureMinWidth(64);

        const factor = (image_from.getWidth() / 64);

        const image = await this.createImage((64 * factor), (64 * factor));

        image.composite(image_from.clone().crop(0, (14 * factor), (14 * factor), (5 * factor)).rotateSimple(180), 0, (14 * factor));

        image.composite(image_from.clone().crop(0, (33 * factor), (14 * factor), (10 * factor)).rotateSimple(180), 0, (33 * factor));

        image.composite(image_from.clone().crop((28 * factor), 0, (14 * factor), (14 * factor)).flip(false, true), (14 * factor), 0);

        image.composite(image_from.clone().crop((42 * factor), (14 * factor), (14 * factor), (5 * factor)).rotateSimple(180), (14 * factor), (14 * factor));

        image.composite(image_from.clone().crop((28 * factor), (19 * factor), (14 * factor), (14 * factor)).flip(false, true), (14 * factor), (19 * factor));

        image.composite(image_from.clone().crop((42 * factor), (33 * factor), (14 * factor), (10 * factor)).rotateSimple(180), (14 * factor), (33 * factor));

        image.composite(image_from.clone().crop((14 * factor), 0, (14 * factor), (14 * factor)).flip(false, true), (28 * factor), 0);

        image.composite(image_from.clone().crop((28 * factor), (14 * factor), (14 * factor), (5 * factor)).rotateSimple(180), (28 * factor), (14 * factor));

        image.composite(image_from.clone().crop((14 * factor), (19 * factor), (14 * factor), (14 * factor)).flip(false, true), (28 * factor), (19 * factor));

        image.composite(image_from.clone().crop((28 * factor), (33 * factor), (14 * factor), (10 * factor)).rotateSimple(180), (28 * factor), (33 * factor));

        image.composite(image_from.clone().crop((14 * factor), (14 * factor), (14 * factor), (5 * factor)).rotateSimple(180), (42 * factor), (14 * factor));

        image.composite(image_from.clone().crop((14 * factor), (33 * factor), (14 * factor), (10 * factor)).rotateSimple(180), (42 * factor), (33 * factor));

        image.composite(image_from.clone().crop(0, 0, (6 * factor), (6 * factor)), 0, 0);

        await this.writeImage(from, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/entity/chest/normal.png",
            "textures/entity/chest/trapped.png",
            "textures/entity/chest/ender.png",
            "textures/entity/chest/christmas.png"
        ];
    }
}

export {ChestNormalConverter};
