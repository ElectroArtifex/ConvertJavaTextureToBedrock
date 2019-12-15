import {AbstractConverter} from "./AbstractConverter";

/**
 * Class Particles1_13Converter
 */
class Particles1_13Converter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [from, to] = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert particles ${from}`);

        const image = await this.readImage(from);

        image.crop(0, 0, (image.getWidth() / 2), (image.getHeight() / 2)); // Bedrock only uses the first 25% of the image (Rest is transparent on Java)

        await this.writeImage(to, image);

        return [];
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/particle/particles.png", "textures/particle/particles.png"]
        ];
    }
}

export {Particles1_13Converter};
