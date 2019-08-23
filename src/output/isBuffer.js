/**
 * @param {*} input
 *
 * @returns {boolean}
 */
function isBuffer(input) {
	return (Buffer.isBuffer(input) || input instanceof ArrayBuffer || input instanceof Uint8Array);
}

export default isBuffer;
