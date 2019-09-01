import {AbstractConverter} from "./AbstractConverter";

/**
 * Class SideRotateConverter
 */
class SideRotateConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Create side rotate ${to}`);

				const image = await this.readImage(from);

				image.flip(true, false);

				await this.writeImage(to, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			["textures/blocks/dried_kelp_side_a.png", "textures/blocks/dried_kelp_side_b.png"],
			["textures/blocks/seagrass_doubletall_top_a.png", "textures/blocks/seagrass_doubletall_top_b.png"],
			["textures/blocks/seagrass_doubletall_bottom_a.png", "textures/blocks/seagrass_doubletall_bottom_b.png"]
		];
	}
}

export {SideRotateConverter};
