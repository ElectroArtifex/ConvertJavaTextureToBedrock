import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class AtlasConverter
 */
class AtlasConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [base, count, to] = this.data;

        const to_delete = [];

        let image = null;

        for (let i = 0; i <= count; i++) {
            const step = base + (i.toString().padStart(2, "0") + ".png");

            if (!await this.output.exists(step)) {
                continue;
            }

            const image_step = await this.readImage(step);

            if (image === null) {
                this.log.log(`Create atlas ${to}`);

                image = await this.createImage(image_step.getWidth(), (image_step.getHeight() * (count + 1)));
            }

            image.composite(image_step, 0, (image_step.getHeight() * i));

            to_delete.push(new DeleteConverter(step));
        }

        if (image !== null) {
            await this.writeImage(to, image);
        }

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/items/clock_", 63, "textures/items/watch_atlas.png"],
            ["textures/items/compass_", 31, "textures/items/compass_atlas.png"]
        ];
    }
}

export {AtlasConverter};
