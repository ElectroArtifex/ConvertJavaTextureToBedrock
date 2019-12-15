import {AbstractConverter} from "./AbstractConverter";

/**
 * Class FishHookConverter
 */
class FishHookConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert fishhook`);

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / 8);

        const image = await this.createImage((24 * factor), (3 * factor));

        image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), 0, 0);
        image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), (2 * factor), 0);
        image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), (2 * factor), (2 * factor));
        image.composite(image_from.clone().crop((3 * factor), factor, factor, factor), 0, (2 * factor));
        image.composite(image_from.clone().crop((4 * factor), factor, factor, factor), factor, 0);
        image.composite(image_from.clone().crop((4 * factor), factor, factor, factor), (2 * factor), factor);
        image.composite(image_from.clone().crop((4 * factor), factor, factor, factor), factor, (2 * factor));
        image.composite(image_from.clone().crop((4 * factor), factor, factor, factor), 0, factor);
        image.composite(image_from.clone().crop((4 * factor), (4 * factor), factor, factor), factor, factor);

        image.composite(image_from.clone().crop((5 * factor), (3 * factor), factor, factor), (3 * factor), 0);
        image.composite(image_from.clone().crop((5 * factor), (3 * factor), factor, factor), (5 * factor), 0);
        image.composite(image_from.clone().crop((5 * factor), (3 * factor), factor, factor), (5 * factor), (2 * factor));
        image.composite(image_from.clone().crop((5 * factor), (3 * factor), factor, factor), (3 * factor), (2 * factor));
        image.composite(image_from.clone().crop((4 * factor), (3 * factor), factor, factor), (4 * factor), 0);
        image.composite(image_from.clone().crop((4 * factor), (3 * factor), factor, factor), (5 * factor), factor);
        image.composite(image_from.clone().crop((4 * factor), (3 * factor), factor, factor), (4 * factor), (2 * factor));
        image.composite(image_from.clone().crop((4 * factor), (3 * factor), factor, factor), (3 * factor), factor);
        image.composite(image_from.clone().crop((4 * factor), (4 * factor), factor, factor), (4 * factor), factor);

        image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (6 * factor), 0);
        image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (9 * factor), 0);
        image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (12 * factor), 0);
        image.composite(image_from.clone().crop((3 * factor), factor, (3 * factor), (3 * factor)), (15 * factor), 0);

        image.composite(image_from.clone().crop((2 * factor), (5 * factor), (3 * factor), (3 * factor)), (18 * factor), 0);
        image.composite(image_from.clone().crop((4 * factor), (4 * factor), factor, factor), (22 * factor), (2 * factor));

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/fishhook.png", "textures/entity/fishhook.png"]
        ];
    }
}

export {FishHookConverter};
