import AbstractConverter from "./AbstractConverter";
import Utils from "../Utils/Utils";

/**
 * Class WaterConverter
 */
class WaterConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to, to_small_size] of this.getData()) {
			if (await this.output.exists(from)) {
				Utils.log(`Convert water ${from}`);

				const image = await this.readImage(from);

				image.grayscale(); // Fix cauldron water (Some texture packs still using a colored water texture but it's just a grayscale texture)

				if (image.getWidth() === to_small_size) {
					image.scale(2, "nearestNeighbor"); // Bedrock version has doubled pixels as the Java version
				}

				await this.writeImage(to, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/blocks/water_flow_grey.png", "textures/blocks/water_flow_grey.png", 16],
			["textures/blocks/water_still_grey.png", "textures/blocks/water_still_grey.png", 8]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default WaterConverter;
