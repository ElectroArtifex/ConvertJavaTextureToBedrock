import {AbstractConverter} from "./AbstractConverter";

/**
 * Class DeleteConverter
 */
class DeleteConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const from of this.getData()) {
			if (await this.output.exists(from)) {
				this.log.log(`Delete ${from}`);

				await this.output.delete(from);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	static get DATA() {
		return [
			"textures/blocks/conduit.png",
			"textures/entity/conduit/break_particle.png",

			"textures/blocks/dried_kelp_bottom.png",
			"textures/blocks/water_overlay.png",

			"textures/entity/cat/cat_collar.png",

			"textures/entity/wolf/wolf_collar.png",

			"bedrock_textures/"
		];
	}
}

export {DeleteConverter};
