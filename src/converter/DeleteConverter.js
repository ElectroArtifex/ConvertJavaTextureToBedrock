import DeleteStaticConverter from "./DeleteStaticConverter";

/**
 * Class DeleteConverter
 */
class DeleteConverter extends DeleteStaticConverter {
	/**
	 * @inheritDoc
	 */
	async* getData() {
		for (const date of this.data) {
			yield date;
		}
	}
}

export default DeleteConverter;
