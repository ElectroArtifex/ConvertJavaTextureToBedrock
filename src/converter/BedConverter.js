import {AbstractConverter} from "./AbstractConverter";

/**
 * Class BedConverter
 */
class BedConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const block = this.data;

        if (!await this.output.exists(block)) {
            return [];
        }

        this.log.log(`Convert bed ${block}`);

        const bed_image = await this.readImage(block);

        bed_image.ensureMinWidth(64);

        const factor = (bed_image.getWidth() / 64);

        const image = await this.createImage(bed_image.getWidth(), bed_image.getHeight());

        // Top part
        image.composite(bed_image.clone().crop(0, 0, (44 * factor), (22 * factor)), 0, 0);

        // Bottom part
        image.composite(bed_image.clone().crop(0, (28 * factor), (44 * factor), (16 * factor)), 0, (22 * factor));

        // Bottom side
        image.composite(bed_image.clone().crop((22 * factor), (22 * factor), (16 * factor), (6 * factor)), (22 * factor), 0);

        // Feeds
        for (const [from_x, from_y, to_x, to_y, rotate_bottom] of [[50, 0, 0, 44, 0], [50, 6, 0, 38, 90], [50, 12, 12, 44, -90], [50, 18, 12, 38, 180]]) {
            image.composite(bed_image.clone().crop(((from_x + 3) * factor), (from_y * factor), (3 * factor), (3 * factor)), ((to_x + 3) * factor), ((to_y + 3) * factor));
            image.composite(bed_image.clone().crop(((from_x + 6) * factor), (from_y * factor), (3 * factor), (3 * factor)).rotateSimple(rotate_bottom), ((to_x + 9) * factor), ((to_y + 3) * factor));
            image.composite(bed_image.clone().crop((from_x * factor), ((from_y + 3) * factor), (3 * factor), (3 * factor)).rotateSimple(-90), (to_x * factor), ((to_y + 3) * factor));
            image.composite(bed_image.clone().crop(((from_x + 3) * factor), ((from_y + 3) * factor), (3 * factor), (3 * factor)).rotateSimple(180), ((to_x + 6) * factor), (to_y * factor));
            image.composite(bed_image.clone().crop(((from_x + 6) * factor), ((from_y + 3) * factor), (3 * factor), (3 * factor)).rotateSimple(90), ((to_x + 6) * factor), ((to_y + 3) * factor));
            image.composite(bed_image.clone().crop(((from_x + 9) * factor), ((from_y + 3) * factor), (3 * factor), (3 * factor)).rotateSimple(180), ((to_x + 3) * factor), (to_y * factor));
        }
        await this.writeImage(block, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/entity/bed/black.png",
            "textures/entity/bed/blue.png",
            "textures/entity/bed/brown.png",
            "textures/entity/bed/cyan.png",
            "textures/entity/bed/gray.png",
            "textures/entity/bed/green.png",
            "textures/entity/bed/light_blue.png",
            "textures/entity/bed/lime.png",
            "textures/entity/bed/magenta.png",
            "textures/entity/bed/orange.png",
            "textures/entity/bed/pink.png",
            "textures/entity/bed/purple.png",
            "textures/entity/bed/red.png",
            "textures/entity/bed/silver.png",
            "textures/entity/bed/white.png",
            "textures/entity/bed/yellow.png"
        ];
    }
}

export {BedConverter};
