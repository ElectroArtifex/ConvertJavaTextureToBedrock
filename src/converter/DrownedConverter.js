import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";

/**
 * Class DrownedConverter
 */
class DrownedConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [from, overlay, to] of this.getData()) {
			if (await this.output.exists(from) && await this.output.exists(overlay)) {
				this.log.log(`Convert drowned`);

				const image = await this.readImage(from);

				const image_overlay = await this.readImage(overlay);

				const factor = (image.getWidth() / 64);

				image.composite(image_overlay.clone().crop(0, 0, (32 * factor), (16 * factor)), (32 * factor), 0);

				image.composite(image_overlay.clone().crop(0, (16 * factor), (64 * factor), (16 * factor)), 0, (32 * factor));

				image.composite(image_overlay.clone().crop((16 * factor), (48 * factor), (16 * factor), (16 * factor)), 0, (48 * factor));

				image.composite(image_overlay.clone().crop((32 * factor), (48 * factor), (16 * factor), (16 * factor)), (48 * factor), (48 * factor));

				await this.writeImage(to, image);
			}

			to_delete.push(overlay);
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["textures/entity/zombie/drowned.png", "textures/entity/zombie/drowned_outer_layer.png", "textures/entity/zombie/drowned.png"];

		yield date;
	}
}

export default DrownedConverter;
