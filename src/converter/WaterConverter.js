import {AbstractConverter} from "./AbstractConverter";

/**
 * Class WaterConverter
 */
class WaterConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to, mind_width, grayscale] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert water ${from}`);

        const image = await this.readImage(from);

        if (grayscale) {
            image.grayscale(); // Fix cauldron water (Some texture packs still using a colored water texture but it's just a grayscale texture)
        }

        image.ensureMinWidth(mind_width); // Bedrock version has doubled pixels as the Java version

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/blocks/lava_flow.png", "textures/blocks/lava_flow.png", 32],
            ["textures/blocks/lava_still.png", "textures/blocks/lava_still.png", 16],
            ["textures/blocks/water_flow_grey.png", "textures/blocks/water_flow_grey.png", 32, true],
            ["textures/blocks/water_still_grey.png", "textures/blocks/water_still_grey.png", 16, true]
        ];
    }
}

export {WaterConverter};
