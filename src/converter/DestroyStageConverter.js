import {AbstractConverter} from "./AbstractConverter";

/**
 * Class DestroyStageConverter
 */
class DestroyStageConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const from = this.data;

        if (!await this.output.exists(from)) {
            return [];
        }

        this.log.log(`Convert destroy stage ${from}`);

        const image = await this.readImage(from);

        image.scan(0, 0, image.getWidth(), image.getHeight(), (x, y, idx) => {
            if (image.bitmap.data[idx + 3] === 0) {
                image.bitmap.data[idx] = 255;
                image.bitmap.data[idx + 1] = 255;
                image.bitmap.data[idx + 2] = 255;
                image.bitmap.data[idx + 3] = 1;
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
            "textures/environment/destroy_stage_0.png",
            "textures/environment/destroy_stage_1.png",
            "textures/environment/destroy_stage_2.png",
            "textures/environment/destroy_stage_3.png",
            "textures/environment/destroy_stage_4.png",
            "textures/environment/destroy_stage_5.png",
            "textures/environment/destroy_stage_6.png",
            "textures/environment/destroy_stage_7.png",
            "textures/environment/destroy_stage_8.png",
            "textures/environment/destroy_stage_9.png"
        ];
    }
}

export {DestroyStageConverter};
