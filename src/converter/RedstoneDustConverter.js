import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";

/**
 * Class RedstoneDustConverter
 */
class RedstoneDustConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [dot, line_0, line_1, to_cross, to_line] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(dot) && await this.output.exists(line_0) && await this.output.exists(line_1))) {
            return to_delete;
        }

        this.log.log(`Convert redstone dust`);

        const image = await this.readImage(line_0);

        image.rotateSimple(90);

        await this.writeImage(to_line, image);

        image.composite(await this.readImage(line_1), 0, 0);

        image.composite(await this.readImage(dot), 0, 0);

        await this.writeImage(to_cross, image);

        to_delete.push(new DeleteConverter(dot));
        to_delete.push(new DeleteConverter(line_0));
        to_delete.push(new DeleteConverter(line_1));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/blocks/redstone_dust_dot.png", "textures/blocks/redstone_dust_line0.png", "textures/blocks/redstone_dust_line1.png", "textures/blocks/redstone_dust_cross.png", "textures/blocks/redstone_dust_line.png"]
        ];
    }
}

export {RedstoneDustConverter};
