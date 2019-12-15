import {AbstractConverter} from "./AbstractConverter";

/**
 * Class TurtleConverter
 */
class TurtleConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert turtle ${from}`);

        const from_image = await this.readImage(from);

        const factor = (from_image.getWidth() / 128);

        const image = await this.createImage(from_image.getWidth(), from_image.getHeight());

        image.composite(from_image.crop(factor, 0, (from_image.getWidth() - factor), from_image.getHeight()), 0, 0);

        await this.writeImage(from, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/entity/sea_turtle.png"
        ];
    }
}

export {TurtleConverter};
