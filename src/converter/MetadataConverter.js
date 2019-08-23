import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import path from "path";
import uuid from "uuid/v4";

/**
 * Class MetadataConverter
 */
class MetadataConverter extends AbstractConverter {
	/**
	 * @returns {string}
	 */
	static get PACK_MCMETA() {
		return "pack.mcmeta";
	}

	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [from, to, uuid_header_file, uuid_module_file] of this.getData()) {
			this.log.log(`Create metadata ${to}`);

			let uuid_header = "";
			if (await this.output.exists(uuid_header_file)) {
				uuid_header = (await this.output.read(uuid_header_file)).toString("utf8");

				to_delete.push(uuid_header_file);
			} else {
				uuid_header = uuid();
			}

			let uuid_module = "";
			if (await this.output.exists(uuid_module_file)) {
				uuid_module = (await this.output.read(uuid_module_file)).toString("utf8");

				to_delete.push(uuid_module_file);
			} else {
				uuid_module = uuid();
			}

			const mcmeta = JSON.parse((await this.output.read(from)).toString("utf8").trim()); // trim it to supports UF8 files with 'BOOM' at the beginning

			if (mcmeta.pack.pack_format !== 4) {
				throw new Error("Only supports pack_format 4!");
			}

			const manifest = {
				"format_version": 1,
				"header": {
					"description": mcmeta.pack.description,
					"name": path.parse(this.output.input.filename).name,
					"platform_locked": false,
					"uuid": uuid_header,
					"version": [0, 0, 1]
				},
				"modules": [
					{
						"description": mcmeta.pack.description,
						"type": "resources",
						"uuid": uuid_module,
						"version": [0, 0, 1]
					}
				]
			};

			await this.output.write(to, Buffer.from(JSON.stringify(manifest, null, 2)));

			to_delete.push(from);
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = [this.constructor.PACK_MCMETA, "manifest.json", "bedrock_uuid_header", "bedrock_uuid_module"];

		yield date;
	}
}

export default MetadataConverter;
