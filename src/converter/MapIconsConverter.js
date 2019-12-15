import {AbstractConverter} from "./AbstractConverter";
import Jimp from "@ozelot379/jimp-plugins";

/**
 * Class MapIconsConverter
 */
class MapIconsConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert map icons ${to}`);

        const from_image = await this.readImage(from);

        const factor = (from_image.getWidth() / 128);

        const image = await this.createImage((64 * factor), (64 * factor));

        image.composite(from_image.clone().crop(0, 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), -factor, factor);
        image.composite(from_image.clone().crop((8 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (15 * factor), factor);
        image.composite(from_image.clone().crop((16 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (31 * factor), factor);
        image.composite(from_image.clone().crop((24 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (47 * factor), factor);

        image.composite(from_image.clone().crop((80 * factor), (8 * factor), (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, (16 * factor));
        image.composite(from_image.clone().crop((40 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (15 * factor), (16 * factor));
        image.composite(from_image.clone().crop((48 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (32 * factor), (16 * factor));
        image.composite(from_image.clone().crop((48 * factor), (8 * factor), (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (48 * factor), (16 * factor)); // Alternative icon

        image.composite(from_image.clone().crop((96 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, (32 * factor)); // Alternative icon
        image.composite(from_image.clone().crop((88 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (16 * factor), (32 * factor)); // Alternative icon
        image.composite(from_image.clone().crop((112 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (32 * factor), (32 * factor)); // Alternative icon
        image.composite(from_image.clone().crop((24 * factor), (8 * factor), (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (48 * factor), (32 * factor)); // Alternative icon

        image.composite(from_image.clone().crop((120 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, (48 * factor)); // Alternative icon
        image.composite(from_image.clone().crop((56 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (15 * factor), (48 * factor));
        image.composite(from_image.clone().crop((64 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (32 * factor), (48 * factor));
        image.composite(from_image.clone().crop((72 * factor), 0, (8 * factor), (8 * factor)).scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR), (48 * factor), (48 * factor));

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/map/map_icons.png", "textures/map/map_icons.png"]
        ];
    }
}

export {MapIconsConverter};
