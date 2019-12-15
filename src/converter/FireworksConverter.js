import {AbstractConverter} from "./AbstractConverter";

/**
 * Class FireworksConverter
 */
class FireworksConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert fireworks`);

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / 16);

        const image = await this.createImage((32 * factor), (32 * factor));

        image.composite(image_from.clone().rotateSimple(-90), 0, 0);

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/items/fireworks.png", "textures/entity/fireworks.png"]
        ];
    }
}

export {FireworksConverter};
