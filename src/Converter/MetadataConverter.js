import AbstractConverter from "./AbstractConverter";
import DeleteConverter from "./DeleteConverter";
import fs from "fs-extra";
import Utils from "../Utils/Utils";
import uuid from "uuid/v4";

/**
 * Class MetadataConverter
 */
class MetadataConverter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		const to_delete = [];

		for await (const [from, to, uuid_header_file, uuid_module_file] of this.getData()) {
			Utils.log(`Create metadata ${to}`);

			const from_path = Utils.fromPath(from, this.path);
			const to_path = Utils.toPath(to, from_path, this.path);

			const uuid_header_file_path = Utils.toPath(uuid_header_file, from_path, this.path);
			let uuid_header = "";
			if (fs.existsSync(uuid_header_file_path)) {
				uuid_header = await fs.readFile(uuid_header_file_path, "utf8");

				to_delete.push(uuid_header_file);
			} else {
				uuid_header = uuid();
			}

			const uuid_module_file_path = Utils.toPath(uuid_module_file, from_path, this.path);
			let uuid_module = "";
			if (fs.existsSync(uuid_module_file_path)) {
				uuid_module = await fs.readFile(uuid_module_file_path, "utf8");

				to_delete.push(uuid_module_file);
			} else {
				uuid_module = uuid();
			}

			const mcmeta = JSON.parse(await fs.readFile(from_path, "utf8"));

			const manifest = {
				"format_version": 1,
				"header": {
					"description": mcmeta.pack.description,
					"name": await this.input.name(),
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

			await fs.writeFile(to_path, JSON.stringify(manifest, null, 2), "utf8");

			to_delete.push(from);
		}

		return [[DeleteConverter, to_delete]];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const date = ["pack.mcmeta", "./manifest.json", "bedrock_uuid_header", "bedrock_uuid_module"];

		yield date;
	}
}

export default MetadataConverter;
