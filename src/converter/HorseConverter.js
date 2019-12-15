import {AbstractConverter} from "./AbstractConverter";

/**
 * Class HorseConverter
 */
class HorseConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert horse ${to}`);

        const image_from = await this.readImage(from);

        const factor = (image_from.getWidth() / 64);

        const image = await this.createImage((image_from.getWidth() * 2), (image_from.getWidth() * 2));

        // Chest
        image.composite(image_from.clone().crop((26 * factor), (21 * factor), (22 * factor), (11 * factor)), 0, (34 * factor));
        image.composite(image_from.clone().crop((26 * factor), (21 * factor), (22 * factor), (11 * factor)), 0, (47 * factor));

        // Saddle (Gray part)
        image.composite(image_from.clone().crop((29 * factor), (5 * factor), (6 * factor), (4 * factor)), (74 * factor), 0);
        image.composite(image_from.clone().crop((29 * factor), (5 * factor), (6 * factor), (4 * factor)), (74 * factor), (4 * factor));
        image.composite(image_from.clone().crop((29 * factor), (5 * factor), (6 * factor), (4 * factor)), (74 * factor), (13 * factor));

        image.composite(image_from.clone().crop((31 * factor), (5 * factor), factor, factor), (81 * factor), (26 * factor));
        image.composite(image_from.clone().crop((31 * factor), (5 * factor), factor, factor), (87 * factor), (26 * factor));

        image.composite(image_from.clone().crop((31 * factor), (5 * factor), factor, factor), (101 * factor), (26 * factor));
        image.composite(image_from.clone().crop((31 * factor), (5 * factor), factor, factor), (107 * factor), (26 * factor));

        // Saddle (Color part)
        image.composite(image_from.clone().crop((35 * factor), 0, (10 * factor), (9 * factor)), (88 * factor), 0);
        image.composite(image_from.clone().crop((35 * factor), 0, (10 * factor), (9 * factor)), (98 * factor), 0);

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (9 * factor), (2 * factor)), (82 * factor), (9 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (7 * factor), (2 * factor)), (91 * factor), (9 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (6 * factor), (2 * factor)), (108 * factor), (9 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (8 * factor), factor), (80 * factor), (8 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (8 * factor), factor), (108 * factor), (8 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (9 * factor), factor), (80 * factor), (11 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (9 * factor), factor), (89 * factor), (11 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (2 * factor), factor), (98 * factor), (11 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (9 * factor), factor), (106 * factor), (11 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, factor), (115 * factor), (11 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (9 * factor), factor), (92 * factor), (13 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, factor), (101 * factor), (13 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (9 * factor), factor), (92 * factor), (19 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, factor), (101 * factor), (19 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (2 * factor), factor), (71 * factor), 0);
        image.composite(image_from.clone().crop((35 * factor), 0, (4 * factor), (6 * factor)), (70 * factor), factor);

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (2 * factor), factor), (81 * factor), 0);
        image.composite(image_from.clone().crop((35 * factor), 0, (4 * factor), (6 * factor)), (80 * factor), factor);

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (3 * factor), factor), (60 * factor), (22 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (8 * factor), factor), (63 * factor), (23 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (3 * factor), factor), (71 * factor), (22 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (2 * factor), factor), (74 * factor), (21 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (3 * factor), factor), (60 * factor), (27 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (8 * factor), factor), (63 * factor), (28 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (3 * factor), factor), (71 * factor), (27 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (2 * factor), factor), (74 * factor), (26 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (81 * factor), (24 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (81 * factor), (27 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (5 * factor), factor), (82 * factor), (26 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (87 * factor), (24 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (87 * factor), (27 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (101 * factor), (24 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (101 * factor), (27 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), (5 * factor), factor), (102 * factor), (26 * factor));

        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (107 * factor), (24 * factor));
        image.composite(image_from.clone().crop((26 * factor), (9 * factor), factor, (2 * factor)), (107 * factor), (27 * factor));

        // Horse
        image.composite(image_from.clone().crop(0, (54 * factor), factor, (10 * factor)), 0, (58 * factor));
        image.composite(image_from.clone().crop(0, (54 * factor), factor, (10 * factor)), factor, (58 * factor));
        image.composite(image_from.clone().crop(0, (54 * factor), (64 * factor), (10 * factor)), (2 * factor), (58 * factor));
        image.composite(image_from.clone().crop((62 * factor), (54 * factor), factor, (10 * factor)), (66 * factor), (58 * factor));
        image.composite(image_from.clone().crop((62 * factor), (54 * factor), factor, (10 * factor)), (67 * factor), (58 * factor));

        image.composite(image_from.clone().crop((22 * factor), (32 * factor), (20 * factor), factor), (24 * factor), (34 * factor));
        image.composite(image_from.clone().crop((22 * factor), (32 * factor), (20 * factor), (22 * factor)), (24 * factor), (35 * factor));
        image.composite(image_from.clone().crop((22 * factor), (53 * factor), (20 * factor), factor), (24 * factor), (57 * factor));

        image.composite(image_from.clone().crop(0, (35 * factor), (22 * factor), factor), factor, (12 * factor));
        image.composite(image_from.clone().crop(0, (35 * factor), (22 * factor), factor), factor, (13 * factor));
        image.composite(image_from.clone().crop(0, (35 * factor), (22 * factor), (19 * factor)), factor, (14 * factor));
        image.composite(image_from.clone().crop((15 * factor), (42 * factor), (7 * factor), factor), (16 * factor), (20 * factor));
        image.composite(image_from.clone().crop(0, (42 * factor), (7 * factor), factor), factor, (20 * factor));
        image.composite(image_from.clone().crop(0, (53 * factor), (22 * factor), factor), factor, (33 * factor));
        image.composite(image.clone().crop(factor, (20 * factor), factor, (14 * factor)), 0, (20 * factor));
        image.composite(image.clone().crop((22 * factor), (20 * factor), factor, (14 * factor)), (23 * factor), (20 * factor));

        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (14 * factor), (8 * factor)), (44 * factor), (33 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (14 * factor), (8 * factor)), (60 * factor), (33 * factor));

        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (16 * factor), (8 * factor)), (79 * factor), (34 * factor));
        image.composite(image_from.clone().crop((48 * factor), (32 * factor), (16 * factor), factor), (79 * factor), (42 * factor));
        image.composite(image.clone().crop((79 * factor), (34 * factor), factor, (9 * factor)), (78 * factor), (34 * factor));
        image.composite(image.clone().crop((94 * factor), (34 * factor), factor, (9 * factor)), (95 * factor), (34 * factor));
        image.composite(image.clone().crop((78 * factor), (34 * factor), (18 * factor), (9 * factor)), (96 * factor), (34 * factor));

        image.composite(image_from.clone().crop((52 * factor), (21 * factor), (8 * factor), (4 * factor)), (48 * factor), (51 * factor));
        image.composite(image_from.clone().crop((52 * factor), (21 * factor), (8 * factor), (4 * factor)), (64 * factor), (51 * factor));
        image.composite(image_from.clone().crop((52 * factor), (21 * factor), (8 * factor), (4 * factor)), (82 * factor), (51 * factor));
        image.composite(image_from.clone().crop((52 * factor), (21 * factor), (8 * factor), (4 * factor)), (100 * factor), (51 * factor));

        image.composite(image_from.clone().crop((48 * factor), (33 * factor), (16 * factor), (3 * factor)), (44 * factor), (55 * factor));
        image.composite(image_from.clone().crop((48 * factor), (33 * factor), (16 * factor), (3 * factor)), (60 * factor), (55 * factor));
        image.composite(image_from.clone().crop((48 * factor), (33 * factor), (16 * factor), (3 * factor)), (78 * factor), (55 * factor));
        image.composite(image_from.clone().crop((48 * factor), (33 * factor), (16 * factor), (3 * factor)), (96 * factor), (55 * factor));

        image.composite(image_from.clone().crop(0, (12 * factor), (6 * factor), (8 * factor)), 0, (12 * factor));

        image.composite(image_from.clone().crop((7 * factor), (13 * factor), (10 * factor), (8 * factor)), (7 * factor), 0);
        image.composite(image_from.clone().crop(0, (20 * factor), (9 * factor), (5 * factor)), 0, (7 * factor));
        image.composite(image_from.clone().crop((10 * factor), (20 * factor), (14 * factor), (5 * factor)), (9 * factor), (7 * factor));
        image.composite(image_from.clone().crop((25 * factor), (20 * factor), factor, (5 * factor)), (23 * factor), (7 * factor));

        image.composite(image_from.clone().crop(0, (25 * factor), (18 * factor), factor), (25 * factor), (18 * factor));
        image.composite(image_from.clone().crop(0, (25 * factor), (18 * factor), (8 * factor)), (25 * factor), (19 * factor));
        image.composite(image_from.clone().crop(0, (25 * factor), factor, (8 * factor)), (24 * factor), (19 * factor));
        image.composite(image_from.clone().crop(0, (25 * factor), factor, (8 * factor)), (43 * factor), (19 * factor));
        image.composite(image_from.clone().crop(0, (25 * factor), (18 * factor), (5 * factor)), (24 * factor), (27 * factor));
        image.composite(image_from.clone().crop(0, (33 * factor), (18 * factor), (2 * factor)), (24 * factor), (32 * factor));

        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (4 * factor)), (48 * factor), (29 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (4 * factor)), (64 * factor), (29 * factor));
        image.composite(image.clone().crop((78 * factor), (34 * factor), (8 * factor), (5 * factor)), (83 * factor), (29 * factor));
        image.composite(image.clone().crop((78 * factor), (34 * factor), (8 * factor), (5 * factor)), (101 * factor), (29 * factor));

        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (3 * factor)), (47 * factor), (41 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (3 * factor)), (63 * factor), (41 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (3 * factor)), (81 * factor), (43 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (3 * factor)), (99 * factor), (43 * factor));

        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (44 * factor), (44 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (50 * factor), (44 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (60 * factor), (44 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (66 * factor), (44 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (78 * factor), (46 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (84 * factor), (46 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (96 * factor), (46 * factor));
        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (6 * factor), (5 * factor)), (102 * factor), (46 * factor));

        image.composite(image_from.clone().crop((48 * factor), (25 * factor), (4 * factor), (3 * factor)), (47 * factor), 0);
        image.composite(image.clone().crop((78 * factor), (34 * factor), factor, (2 * factor)), (44 * factor), (3 * factor));
        image.composite(image.clone().crop((78 * factor), (34 * factor), (8 * factor), (2 * factor)), (45 * factor), (3 * factor));
        image.composite(image.clone().crop((85 * factor), (34 * factor), factor, (2 * factor)), (53 * factor), (3 * factor));

        image.composite(image_from.clone().crop((42 * factor), (40 * factor), (6 * factor), (7 * factor)), (45 * factor), (7 * factor));
        image.composite(image_from.clone().crop((42 * factor), (40 * factor), (10 * factor), (4 * factor)), (38 * factor), (14 * factor));
        image.composite(image_from.clone().crop((42 * factor), (40 * factor), (10 * factor), (4 * factor)), (48 * factor), (14 * factor));

        image.composite(image_from.clone().crop((42 * factor), (40 * factor), (6 * factor), (5 * factor)), (31 * factor), (5 * factor));
        image.composite(image_from.clone().crop((42 * factor), (40 * factor), (13 * factor), (4 * factor)), (26 * factor), (10 * factor));
        image.composite(image_from.clone().crop((43 * factor), (52 * factor), (2 * factor), (2 * factor)), (39 * factor), (11 * factor));
        image.composite(image_from.clone().crop((43 * factor), (52 * factor), (2 * factor), (2 * factor)).flip(true, false), (24 * factor), (11 * factor));
        image.composite(image_from.clone().crop((43 * factor), (52 * factor), (2 * factor), (2 * factor)).flip(true, false).flip(false, true), (31 * factor), (3 * factor));
        image.composite(image_from.clone().crop((43 * factor), (52 * factor), (2 * factor), (2 * factor)).flip(true, false).flip(false, true), (34 * factor), (3 * factor));

        image.composite(image_from.clone().crop((19 * factor), (16 * factor), (6 * factor), (4 * factor)), 0, 0);

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/horse2/donkey.png", "textures/entity/horse/donkey.png"],
            ["textures/entity/horse2/horse_black.png", "textures/entity/horse/horse_black.png"],
            ["textures/entity/horse2/horse_brown.png", "textures/entity/horse/horse_brown.png"],
            ["textures/entity/horse2/horse_chestnut.png", "textures/entity/horse/horse_chestnut.png"],
            ["textures/entity/horse2/horse_creamy.png", "textures/entity/horse/horse_creamy.png"],
            ["textures/entity/horse2/horse_darkbrown.png", "textures/entity/horse/horse_darkbrown.png"],
            ["textures/entity/horse2/horse_gray.png", "textures/entity/horse/horse_gray.png"],
            ["textures/entity/horse2/horse_skeleton.png", "textures/entity/horse/horse_skeleton.png"],
            ["textures/entity/horse2/horse_white.png", "textures/entity/horse/horse_white.png"],
            ["textures/entity/horse2/horse_zombie.png", "textures/entity/horse/horse_zombie.png"],
            ["textures/entity/horse2/mule.png", "textures/entity/horse/mule.png"],
            ["textures/entity/horse2/horse_markings_blackdots.png", "textures/entity/horse/horse_markings_blackdots.png"],
            ["textures/entity/horse2/horse_markings_white.png", "textures/entity/horse/horse_markings_white.png"],
            ["textures/entity/horse2/horse_markings_whitedots.png", "textures/entity/horse/horse_markings_whitedots.png"],
            ["textures/entity/horse2/horse_markings_whitefield.png", "textures/entity/horse/horse_markings_whitefield.png"],
            ["textures/entity/horse2/armor/horse_armor_diamond.png", "textures/entity/horse/armor/horse_armor_diamond.png"],
            ["textures/entity/horse2/armor/horse_armor_gold.png", "textures/entity/horse/armor/horse_armor_gold.png"],
            ["textures/entity/horse2/armor/horse_armor_iron.png", "textures/entity/horse/armor/horse_armor_iron.png"],
            ["textures/entity/horse2/armor/horse_armor_leather.png", "textures/entity/horse/armor/horse_armor_leather.png"]
        ];
    }
}

export {HorseConverter};
