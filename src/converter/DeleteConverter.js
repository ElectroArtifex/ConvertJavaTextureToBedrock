import {AbstractConverter} from "./AbstractConverter";

/**
 * Class DeleteConverter
 */
class DeleteConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Delete ${from}`);

        await this.output.delete(from);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            "assets/", // Speed up loading

            "textures/blocks/conduit.png",
            "textures/entity/conduit/break_particle.png",

            "textures/blocks/dried_kelp_bottom.png",
            "textures/blocks/water_overlay.png",

            "textures/entity/cat/cat_collar.png",

            "textures/entity/wolf/wolf_collar.png",

            "bedrock_textures/"
        ];
    }
}

export {DeleteConverter};
