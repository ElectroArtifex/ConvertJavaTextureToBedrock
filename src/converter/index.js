import {AbstractConverter} from "./AbstractConverter";
import {converters} from "./converters";

/**
 * @returns {AsyncIterableIterator<AbstractConverter>}
 *
 * @throws {Error}
 */
async function* getConverters() {
    for (const converter of converters) {
        yield converter;
    }
}

/**
 * @param {AbstractConverter[]} additional_converters
 *
 * @returns {Promise<>}
 */
async function addAdditionalConverters(...additional_converters) {
    for (const additional_converter of additional_converters) {
        converters.push(additional_converter);
    }
}

export {AbstractConverter} from "./AbstractConverter";
export {addAdditionalConverters, getConverters};
