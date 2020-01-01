import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class SheepConverter
 */
class SheepConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [sheep, sheep_fur] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(sheep) && await this.output.exists(sheep_fur))) {
            return to_delete;
        }

        this.log.log(`Convert sheep`);

        const image_sheep = await this.readImage(sheep);
        const image_fur = await this.readImage(sheep_fur);

        const width = Math.max(image_sheep.getWidth(), image_fur.getWidth());
        image_sheep.ensureMinWidth(width);
        image_fur.ensureMinWidth(width);

        const image = await this.createImage(image_sheep.getWidth(), (image_sheep.getHeight() + image_fur.getHeight()));

        image.composite(image_sheep, 0, 0);

        image.composite(image_fur, 0, image_sheep.getHeight());

        image.scan(0, 0, image.getWidth(), image_sheep.getHeight(), (x, y, idx) => {
            if (image.bitmap.data[idx + 3] === 255) {
                image.bitmap.data[idx + 3] = 1;
            }
        });

        await this.writeImage(sheep, image);

        to_delete.push(new DeleteConverter(sheep_fur));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/entity/sheep/sheep.png", "textures/entity/sheep/sheep_fur.png"]
        ];
    }
}

export {SheepConverter};
