import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class DrownedConverter
 */
class DrownedConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, overlay, to] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(from) && await this.output.exists(overlay))) {
            return to_delete;
        }

        this.log.log(`Convert drowned`);

        const image = await this.readImage(from);

        const image_overlay = await this.readImage(overlay);

        const factor = (image.getWidth() / 64);

        image.composite(image_overlay.clone().crop(0, 0, (32 * factor), (16 * factor)), (32 * factor), 0);

        image.composite(image_overlay.clone().crop(0, (16 * factor), (64 * factor), (16 * factor)), 0, (32 * factor));

        image.composite(image_overlay.clone().crop((16 * factor), (48 * factor), (16 * factor), (16 * factor)), 0, (48 * factor));

        image.composite(image_overlay.clone().crop((32 * factor), (48 * factor), (16 * factor), (16 * factor)), (48 * factor), (48 * factor));

        await this.writeImage(to, image);

        to_delete.push(new DeleteConverter(overlay));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/zombie/drowned.png", "textures/entity/zombie/drowned_outer_layer.png", "textures/entity/zombie/drowned.png"]
        ];
    }
}

export {DrownedConverter};
