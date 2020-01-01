import {AbstractConverter} from "./AbstractConverter";
import {MetadataConverter} from "./MetadataConverter";

/**
 * Class EnchantedItemGlintConverter
 */
class EnchantedItemGlintConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        if (MetadataConverter.mcmeta.pack.pack_format < 5) {
            return [];
        }

        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert enchanted item glint ${from}`);

        const image = await this.readImage(from);

        image.color([{
            apply: "saturate",
            params: [-100]
        }]);

        image.rotateSimple(-90);

        await this.writeImage(from, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "textures/misc/enchanted_item_glint.png"
        ];
    }
}

export {EnchantedItemGlintConverter};
