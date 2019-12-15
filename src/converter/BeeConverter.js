import {AbstractConverter} from "./AbstractConverter";

/**
 * Class BeeConverter
 */
class BeeConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert bee ${from}`);

        const image = await this.readImage(from);

        const factor = (image.getWidth() / 64);

        // Fix some texture packs has only one wing
        if (image.isEmptyArea((15 * factor), (24 * factor), (7 * factor), (6 * factor))) {
            image.composite(image.clone().crop((8 * factor), (18 * factor), (7 * factor), (6 * factor)).flip(true, false), (15 * factor), (24 * factor));

            await this.writeImage(from, image);
        }

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/entity/bee/bee.png",
            "textures/entity/bee/bee_angry.png",
            "textures/entity/bee/bee_angry_nectar.png",
            "textures/entity/bee/bee_nectar.png"
        ];
    }
}

export {BeeConverter};
