import {AbstractConverter} from "./AbstractConverter";
import Jimp from "jimp";

/**
 * Class TitleConverter
 */
class TitleConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        for await (const [from, to] of this.getData()) {
            if (await this.output.exists(from)) {
                this.log.log(`Convert title ${from}`);

                const image_from = await this.readImage(from);

                const factor = (image_from.getWidth() / 255);

                const image = await Jimp.create((273 * factor), (45 * factor));

                image.composite(image_from.clone().crop(0, 0, (155 * factor), (45 * factor)), 0, 0);
                image.composite(image_from.clone().crop(0, (45 * factor), (119 * factor), (45 * factor)), (154 * factor), 0);

                await this.writeImage(to, image);
            }
        }

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DATA() {
        return [
            ["textures/gui/title/minecraft.png", "textures/ui/title.png"]
        ];
    }
}

export {TitleConverter};
