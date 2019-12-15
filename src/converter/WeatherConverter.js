import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";
import Jimp from "@ozelot379/jimp-plugins";

/**
 * Class WeatherConverter
 */
class WeatherConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [snow, rain, to] = this.data;

        const to_delete = [];

        if (!(await this.output.exists(snow) && await this.output.exists(rain))) {
            return to_delete;
        }

        this.log.log(`Convert weather`);

        const snow_image = await this.readImage(snow);

        const rain_image = await this.readImage(rain);

        const factor = (snow_image.getWidth() / 64);

        const image = await this.createImage((32 * factor), (32 * factor));

        // Snow
        image.composite(snow_image.clone().crop(0, 0, snow_image.getWidth(), (3 * factor)).cover(image.getWidth(), (3 * factor), undefined, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, 0);

        to_delete.push(new DeleteConverter(snow));

        // Rain
        image.composite(rain_image.clone().crop(0, 0, rain_image.getWidth(), (5 * factor)).cover(image.getWidth(), (5 * factor), undefined, Jimp.RESIZE_NEAREST_NEIGHBOR), 0, (5 * factor));

        await this.writeImage(to, image);

        to_delete.push(new DeleteConverter(rain));

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            ["textures/environment/snow.png", "textures/environment/rain.png", "textures/environment/weather.png"]
        ];
    }
}

export {WeatherConverter};
