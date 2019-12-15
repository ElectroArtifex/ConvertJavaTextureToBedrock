import {AbstractConverter} from "./AbstractConverter";

/**
 * Class PistonArmConverter
 */
class PistonArmConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [top_1, top_2, side, to] = this.data;

        if (!(await this.output.exists(top_1) && await this.output.exists(top_2) && await this.output.exists(side))) {
            return [];
        }

        this.log.log(`Create piston arm ${to}`);

        const top_1_image = await this.readImage(top_1);
        const top_2_image = await this.readImage(top_2);
        const side_image = await this.readImage(side);

        top_1_image.ensureMinWidth(16);
        top_2_image.ensureMinWidth(16);
        side_image.ensureMinWidth(16);

        const factor = (top_1_image.getWidth() / 16);

        const image = await this.createImage((128 * factor), (32 * factor));

        image.composite(top_1_image, (16 * factor), 0);
        image.composite(top_2_image, (32 * factor), 0);

        side_image.crop(0, 0, side_image.getWidth(), (4 * factor));
        image.composite(side_image, 0, (16 * factor));
        image.composite(side_image, (16 * factor), (16 * factor));
        image.composite(side_image, (32 * factor), (16 * factor));
        image.composite(side_image, (48 * factor), (16 * factor));

        // Arm top
        const side_image_2 = side_image.clone().crop(0, 0, (8 * factor), (4 * factor)).rotateSimple(-90);

        image.composite(side_image_2, (64 * factor), (4 * factor));
        image.composite(side_image_2, (68 * factor), (4 * factor));
        image.composite(side_image_2, (72 * factor), (4 * factor));
        image.composite(side_image_2, (76 * factor), (4 * factor));

        // Arm bottom top
        const side_image_3 = side_image_2.clone().crop(0, (side_image_2.getHeight() - factor), side_image_2.getWidth(), factor);
        const side_image_4 = side_image.clone().crop((7 * factor), 0, factor, side_image.getHeight());
        const side_image_5 = side_image_2.clone().crop(0, (2 * factor), side_image_2.getWidth(), (4 * factor));

        image.composite(side_image_3, (70 * factor), (18 * factor));
        image.composite(side_image_3, (74 * factor), (18 * factor));
        image.composite(side_image_3, (78 * factor), (18 * factor));

        image.composite(side_image_4, (70 * factor), (19 * factor));
        image.composite(side_image_4, (75 * factor), (19 * factor));
        image.composite(side_image_4, (76 * factor), (19 * factor));
        image.composite(side_image_4, (81 * factor), (19 * factor));

        image.composite(side_image_3, (70 * factor), (23 * factor));
        image.composite(side_image_3, (74 * factor), (23 * factor));
        image.composite(side_image_3, (78 * factor), (23 * factor));

        // Arm bottom
        image.composite(side_image_3, (64 * factor), (24 * factor));
        image.composite(side_image_3, (68 * factor), (24 * factor));
        image.composite(side_image_3, (72 * factor), (24 * factor));
        image.composite(side_image_3, (76 * factor), (24 * factor));
        image.composite(side_image_3, (80 * factor), (24 * factor));
        image.composite(side_image_3, (84 * factor), (24 * factor));

        image.composite(side_image_4, (64 * factor), (25 * factor));
        image.composite(side_image_4, (64 * factor), (29 * factor));
        image.composite(side_image_4, (69 * factor), (25 * factor));
        image.composite(side_image_4, (69 * factor), (29 * factor));
        image.composite(side_image_4, (70 * factor), (25 * factor));
        image.composite(side_image_4, (70 * factor), (29 * factor));
        image.composite(side_image_4, (75 * factor), (25 * factor));
        image.composite(side_image_4, (75 * factor), (29 * factor));
        image.composite(side_image_4, (76 * factor), (25 * factor));
        image.composite(side_image_4, (76 * factor), (29 * factor));
        image.composite(side_image_4, (81 * factor), (25 * factor));
        image.composite(side_image_4, (81 * factor), (29 * factor));
        image.composite(side_image_4, (82 * factor), (25 * factor));
        image.composite(side_image_4, (82 * factor), (29 * factor));
        image.composite(side_image_4, (87 * factor), (25 * factor));
        image.composite(side_image_4, (87 * factor), (29 * factor));

        image.composite(side_image_5, (65 * factor), (25 * factor));
        image.composite(side_image_5, (65 * factor), (29 * factor));
        image.composite(side_image_5, (71 * factor), (25 * factor));
        image.composite(side_image_5, (71 * factor), (29 * factor));
        image.composite(side_image_5, (77 * factor), (25 * factor));
        image.composite(side_image_5, (77 * factor), (29 * factor));
        image.composite(side_image_5, (83 * factor), (25 * factor));
        image.composite(side_image_5, (83 * factor), (29 * factor));

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/blocks/piston_top_normal.png", "textures/blocks/piston_top_normal.png", "textures/blocks/piston_side.png", "textures/entity/pistonarm/pistonArm.png"],
            ["textures/blocks/piston_top_sticky.png", "textures/blocks/piston_top_normal.png", "textures/blocks/piston_side.png", "textures/entity/pistonarm/pistonArmSticky.png"]
        ];
    }
}

export {PistonArmConverter};
