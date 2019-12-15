import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class FoxConverter
 */
class FoxConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, from_sleep, to] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(from) && await this.output.exists(from_sleep))) {
            return to_delete;
        }

        this.log.log(`Convert fox ${to}`);

        const image_from = await this.readImage(from);
        const image_from_sleep = await this.readImage(from_sleep);

        const factor = (image_from.getWidth() / 48);

        const image = await this.createImage((64 * factor), (32 * factor));

        // Ears
        image.composite(image_from.clone().crop((8 * factor), factor, (6 * factor), (3 * factor)), 0, 0);
        image.composite(image_from.clone().crop((15 * factor), factor, (6 * factor), (3 * factor)), (22 * factor), 0);

        // Head normal
        image.composite(image_from.clone().crop(factor, (5 * factor), (28 * factor), (12 * factor)), 0, 0);

        // Head sleep
        image.composite(image_from_sleep.clone().crop(factor, (5 * factor), (28 * factor), (12 * factor)), 0, (12 * factor));

        // Mount
        image.composite(image_from.clone().crop((6 * factor), (18 * factor), (14 * factor), (5 * factor)), 0, (24 * factor));

        // Body
        image.composite(image_from.clone().crop((24 * factor), (21 * factor), (6 * factor), (11 * factor)), (30 * factor), (21 * factor));
        image.composite(image_from.clone().crop((30 * factor), (15 * factor), (18 * factor), (17 * factor)), (36 * factor), (15 * factor));

        // Tail
        image.composite(image_from.clone().crop((30 * factor), 0, (18 * factor), (14 * factor)), (28 * factor), 0);

        // Legs
        image.composite(image_from.clone().crop((4 * factor), (24 * factor), (8 * factor), (8 * factor)), (14 * factor), (24 * factor));
        image.composite(image_from.clone().crop((4 * factor), (24 * factor), (8 * factor), (8 * factor)), (22 * factor), (24 * factor));

        await this.writeImage(to, image);

        to_delete.push(new DeleteConverter(from_sleep));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/fox/fox.png", "textures/entity/fox/fox_sleep.png", "textures/entity/fox/fox.png"],
            ["textures/entity/fox/arctic_fox.png", "textures/entity/fox/arctic_fox_sleep.png", "textures/entity/fox/arctic_fox.png"]
        ];
    }
}

export {FoxConverter};
