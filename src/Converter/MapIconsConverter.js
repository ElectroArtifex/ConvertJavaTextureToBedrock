import AbstractConverter from "./AbstractConverter";
import fs from "fs-extra";
import Jimp from "jimp";
import Utils from "../Utils/Utils";

/**
 * Class MapIconsConverter
 */
class MapIconsConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			if (fs.existsSync(from_path)) {
				Utils.log(`Convert map icons ${to}`);

				const from_image = await Jimp.read(from_path);

				const factor = (from_image.getWidth() / 128);

				const image = await Jimp.create((64 * factor), (64 * factor));

				image.composite(from_image.clone().crop(0, 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), -factor, factor);
				image.composite(from_image.clone().crop((8 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (15 * factor), factor);
				image.composite(from_image.clone().crop((16 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (31 * factor), factor);
				image.composite(from_image.clone().crop((24 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (47 * factor), factor);

				image.composite(from_image.clone().crop((80 * factor), (8 * factor), (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), 0, (16 * factor));
				image.composite(from_image.clone().crop((40 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (15 * factor), (16 * factor));
				image.composite(from_image.clone().crop((48 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (32 * factor), (16 * factor));
				image.composite(from_image.clone().crop((48 * factor), (8 * factor), (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (48 * factor), (16 * factor)); // Alternative icon

				image.composite(from_image.clone().crop((96 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), 0, (32 * factor)); // Alternative icon
				image.composite(from_image.clone().crop((88 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (16 * factor), (32 * factor)); // Alternative icon
				image.composite(from_image.clone().crop((112 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (32 * factor), (32 * factor)); // Alternative icon
				image.composite(from_image.clone().crop((24 * factor), (8 * factor), (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (48 * factor), (32 * factor)); // Alternative icon

				image.composite(from_image.clone().crop((120 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), 0, (48 * factor)); // Alternative icon
				image.composite(from_image.clone().crop((56 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (15 * factor), (48 * factor));
				image.composite(from_image.clone().crop((64 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (32 * factor), (48 * factor));
				image.composite(from_image.clone().crop((72 * factor), 0, (8 * factor), (8 * factor)).scale(2, "nearestNeighbor"), (48 * factor), (48 * factor));

				await image.writeAsync(to_path);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/map/map_icons.png", "./map_icons.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default MapIconsConverter;
