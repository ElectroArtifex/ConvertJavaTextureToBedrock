import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class OverlayToTranslateConverter
 */
class OverlayToTranslateConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, overlay, to, reverse_method, not_delete_overlay] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(from) && await this.output.exists(overlay))) {
            return to_delete;
        }

        this.log.log(`Create translated overlay ${to}`);

        const image = await this.readImage(from);

        const image_overlay = await this.readImage(overlay);

        image.scan(0, 0, image.getWidth(), image.getHeight(), (x, y, idx) => {
            if (reverse_method ? (image_overlay.bitmap.data[idx + 3] > 0) : (image.bitmap.data[idx + 3] < 255)) {
                image.bitmap.data[idx] = image_overlay.bitmap.data[idx];
                image.bitmap.data[idx + 1] = image_overlay.bitmap.data[idx + 1];
                image.bitmap.data[idx + 2] = image_overlay.bitmap.data[idx + 2];
                image.bitmap.data[idx + 3] = Math.min(1, image_overlay.bitmap.data[idx + 3]);
            }
        });

        await this.writeImage(to, image);

        if (!not_delete_overlay) {
            to_delete.push(new DeleteConverter(overlay));
        }

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            // Cat
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/allblackcat.png", "textures/entity/cat/allblackcat_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/britishshorthair.png", "textures/entity/cat/britishshorthair_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/calico.png", "textures/entity/cat/calico_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/jellie.png", "textures/entity/cat/jellie_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/ocelot.png", "textures/entity/cat/ocelot_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/persian.png", "textures/entity/cat/persian_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/ragdoll.png", "textures/entity/cat/ragdoll_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/redtabby.png", "textures/entity/cat/redtabby_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/siamesecat.png", "textures/entity/cat/siamesecat_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/tabby.png", "textures/entity/cat/tabby_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/tuxedo.png", "textures/entity/cat/tuxedo_tame.png", false, true],
            ["textures/entity/cat/graytabby_tame.png", "textures/entity/cat/white.png", "textures/entity/cat/white_tame.png", false, true],

            // Enderman
            ["textures/entity/enderman/enderman.png", "textures/entity/enderman/enderman_eyes.png", "textures/entity/enderman/enderman.png", true],

            // Firework
            ["textures/items/fireworks_charge.png", "textures/items/firework_star.png", "textures/items/fireworks_charge.png", false],

            // Grass
            ["textures/blocks/grass_side.png", "textures/blocks/grass_side_carried.png", "textures/blocks/grass_side.png", false, true],

            // Leather
            ["textures/items/leather_boots.png", "textures/items/leather_boots_overlay.png", "textures/items/leather_boots.png", true],
            ["textures/items/leather_chestplate.png", "textures/items/leather_chestplate_overlay.png", "textures/items/leather_chestplate.png", true],
            ["textures/items/leather_helmet.png", "textures/items/leather_helmet_overlay.png", "textures/items/leather_helmet.png", true],
            ["textures/items/leather_leggings.png", "textures/items/leather_leggings_overlay.png", "textures/items/leather_leggings.png", true],
            ["textures/models/armor/leather_1.png", "textures/models/armor/leather_1_overlay.png", "textures/models/armor/leather_1.png", true],
            ["textures/models/armor/leather_2.png", "textures/models/armor/leather_2_overlay.png", "textures/models/armor/leather_2.png", true],

            // Phantom
            ["textures/entity/phantom.png", "textures/entity/phantom_eyes.png", "textures/entity/phantom.png", true],

            // Spider
            ["textures/entity/spider/cave_spider.png", "textures/entity/spider_eyes.png", "textures/entity/spider/cave_spider.png", true, true],
            ["textures/entity/spider/spider.png", "textures/entity/spider_eyes.png", "textures/entity/spider/spider.png", true],

            // Wolf
            ["textures/entity/wolf/wolf_collar.png", "textures/entity/wolf/wolf_tame.png", "textures/entity/wolf/wolf_tame.png", false, true]
        ];
    }
}

export {OverlayToTranslateConverter};
