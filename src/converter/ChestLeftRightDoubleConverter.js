import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class ChestLeftRightDoubleConverter
 */
class ChestLeftRightDoubleConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from_left, from_right, to] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(from_left) && await this.output.exists(from_right))) {
            return to_delete;
        }

        this.log.log(`Convert double chest ${to}`);

        const image_left = await this.readImage(from_left);
        const image_right = await this.readImage(from_right);

        image_left.ensureMinWidth(64);
        image_right.ensureMinWidth(64);

        const factor = (image_left.getWidth() / 64);

        const image = await this.createImage((128 * factor), (64 * factor));

        image.composite(image_right.clone().crop(0, (14 * factor), (14 * factor), (5 * factor)).rotateSimple(180), 0, (14 * factor));
        image.composite(image_left.clone().crop((29 * factor), (14 * factor), (14 * factor), (5 * factor)).rotateSimple(180), (44 * factor), (14 * factor));

        image.composite(image_right.clone().crop(0, (33 * factor), (14 * factor), (10 * factor)).rotateSimple(180), 0, (33 * factor));
        image.composite(image_left.clone().crop((29 * factor), (33 * factor), (14 * factor), (10 * factor)).rotateSimple(180), (44 * factor), (33 * factor));

        image.composite(image_right.clone().crop((29 * factor), 0, (15 * factor), (14 * factor)).flip(false, true), (14 * factor), 0);
        image.composite(image_left.clone().crop((29 * factor), 0, (15 * factor), (14 * factor)).flip(false, true), (29 * factor), 0);

        image.composite(image_right.clone().crop((43 * factor), (14 * factor), (15 * factor), (5 * factor)).rotateSimple(180), (14 * factor), (14 * factor));
        image.composite(image_left.clone().crop((43 * factor), (14 * factor), (15 * factor), (5 * factor)).rotateSimple(180), (29 * factor), (14 * factor));

        image.composite(image_right.clone().crop((29 * factor), (19 * factor), (15 * factor), (14 * factor)).flip(false, true), (14 * factor), (19 * factor));
        image.composite(image_left.clone().crop((29 * factor), (19 * factor), (15 * factor), (14 * factor)).flip(false, true), (29 * factor), (19 * factor));

        image.composite(image_right.clone().crop((43 * factor), (33 * factor), (15 * factor), (10 * factor)).rotateSimple(180), (14 * factor), (33 * factor));
        image.composite(image_left.clone().crop((43 * factor), (33 * factor), (15 * factor), (10 * factor)).rotateSimple(180), (29 * factor), (33 * factor));

        image.composite(image_right.clone().crop((14 * factor), 0, (15 * factor), (14 * factor)).flip(false, true), (44 * factor), 0);
        image.composite(image_left.clone().crop((14 * factor), 0, (15 * factor), (14 * factor)).flip(false, true), (59 * factor), 0);

        image.composite(image_right.clone().crop((14 * factor), (19 * factor), (15 * factor), (14 * factor)).flip(false, true), (44 * factor), (19 * factor));
        image.composite(image_left.clone().crop((14 * factor), (19 * factor), (15 * factor), (14 * factor)).flip(false, true), (59 * factor), (19 * factor));

        image.composite(image_right.clone().crop((14 * factor), (14 * factor), (15 * factor), (5 * factor)).rotateSimple(180), (73 * factor), (14 * factor));

        image.composite(image_left.clone().crop((14 * factor), (14 * factor), (15 * factor), (5 * factor)).rotateSimple(180), (58 * factor), (14 * factor));
        image.composite(image_right.clone().crop((14 * factor), (14 * factor), (15 * factor), (5 * factor)).rotateSimple(180), (73 * factor), (14 * factor));

        image.composite(image_left.clone().crop((14 * factor), (33 * factor), (15 * factor), (10 * factor)).rotateSimple(180), (58 * factor), (33 * factor));
        image.composite(image_right.clone().crop((14 * factor), (33 * factor), (15 * factor), (10 * factor)).rotateSimple(180), (73 * factor), (33 * factor));

        image.composite(image_left.clone().crop(0, 0, (6 * factor), (6 * factor)), 0, 0);

        await this.writeImage(to, image);

        to_delete.push(new DeleteConverter(from_left));
        to_delete.push(new DeleteConverter(from_right));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/chest/normal_left.png", "textures/entity/chest/normal_right.png", "textures/entity/chest/double_normal.png"],
            ["textures/entity/chest/trapped_left.png", "textures/entity/chest/trapped_right.png", "textures/entity/chest/trapped_double.png"],
            ["textures/entity/chest/christmas_left.png", "textures/entity/chest/christmas_right.png", "textures/entity/chest/christmas_double.png"]
        ];
    }
}

export {ChestLeftRightDoubleConverter};
