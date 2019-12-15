import {AbstractConverter} from "./AbstractConverter";

/**
 * Class VillagerConverter
 */
class VillagerConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert villager ${from}`);

        const image = await this.readImage(from);

        image.scan(0, 0, image.getWidth(), image.getHeight(), (x, y, idx) => {
            if (image.bitmap.data[idx + 3] === 0) {
                image.bitmap.data[idx] = 255;
                image.bitmap.data[idx + 1] = 255;
                image.bitmap.data[idx + 2] = 255;
                image.bitmap.data[idx + 3] = 0;
            }
        });

        await this.writeImage(from, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/entity/villager2/professions/armorer.png",
            "textures/entity/villager2/professions/butcher.png",
            "textures/entity/villager2/professions/cartographer.png",
            "textures/entity/villager2/professions/cleric.png",
            "textures/entity/villager2/professions/farmer.png",
            "textures/entity/villager2/professions/fisherman.png",
            "textures/entity/villager2/professions/fletcher.png",
            "textures/entity/villager2/professions/leatherworker.png",
            "textures/entity/villager2/professions/librarian.png",
            "textures/entity/villager2/professions/nitwit.png",
            "textures/entity/villager2/professions/shepherd.png",
            "textures/entity/villager2/professions/stonemason.png",
            "textures/entity/villager2/professions/toolsmith.png",
            "textures/entity/villager2/professions/unskilled.png",
            "textures/entity/villager2/professions/weaponsmith.png",
            "textures/entity/zombie_villager2/professions/armorer.png",
            "textures/entity/zombie_villager2/professions/butcher.png",
            "textures/entity/zombie_villager2/professions/cartographer.png",
            "textures/entity/zombie_villager2/professions/cleric.png",
            "textures/entity/zombie_villager2/professions/farmer.png",
            "textures/entity/zombie_villager2/professions/fisherman.png",
            "textures/entity/zombie_villager2/professions/fletcher.png",
            "textures/entity/zombie_villager2/professions/leatherworker.png",
            "textures/entity/zombie_villager2/professions/librarian.png",
            "textures/entity/zombie_villager2/professions/nitwit.png",
            "textures/entity/zombie_villager2/professions/shepherd.png",
            "textures/entity/zombie_villager2/professions/stonemason.png",
            "textures/entity/zombie_villager2/professions/toolsmith.png",
            "textures/entity/zombie_villager2/professions/weaponsmith.png"
        ];
    }
}

export {VillagerConverter};
