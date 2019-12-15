import {AbstractConverter} from "./AbstractConverter";

/**
 * Class TitleConverter
 */
class TitleConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert title ${from}`);

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / 255);

        const image = await this.createImage((273 * factor), (45 * factor));

        image.composite(image_from.clone().crop(0, 0, (155 * factor), (45 * factor)), 0, 0);
        image.composite(image_from.clone().crop(0, (45 * factor), (119 * factor), (45 * factor)), (154 * factor), 0);

        image.ensureMinHeight(360);

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/gui/title/minecraft.png", "textures/ui/title.png"]
        ];
    }
}

export {TitleConverter};
