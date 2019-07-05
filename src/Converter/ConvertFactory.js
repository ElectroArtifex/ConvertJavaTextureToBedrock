import AbstractConverter from "./AbstractConverter";
import AbstractInput from "../Input/AbstractInput";
import AtlasConverter from "./AtlasConverter";
import BedConverter from "./BedConverter";
import ChestFrontConverter from "./ChestFrontConverter";
import ChestSideConverter from "./ChestSideConverter";
import ColorizeOverlayConverter from "./ColorizeOverlayConverter";
import ConverterError from "./ConverterError";
import CopyConverter from "./CopyConverter";
import DeleteStaticConverter from "./DeleteStaticConverter";
import DrownedConverter from "./DrownedConverter";
import FishHookConverter from "./FishingConverter";
import HorseConverter from "./HorseConverter";
import MetadataConverter from "./MetadataConverter";
import OpaqueConverter from "./OpaqueConverter";
import OverlayToTranslateConverter from "./OverlayToTranslateConverter";
import PistonArmConverter from "./PistonArmConverter";
import PlaceholderConverter from "./PlaceholderConverter";
import PngToTgaConverter from "./PngToTgaConverter";
import RedstoneDustConverter from "./RedstoneDustConverter";
import RenameConverter from "./RenameConverter";
import SheepConverter from "./SheepConverter";
import SideRotateConverter from "./SideRotateConverter";
import VillagerConverter from "./VillagerConverter";

/**
 * @param {string} temp
 * @param {AbstractInput} input
 *
 * @returns {AsyncIterableIterator<AbstractConverter>}
 *
 * @throws {ConverterError}
 */
async function* getConverters(temp, input) {
	for (const [converter, data] of converters) {
		yield new converter(temp, input, data);
	}
}

/**
 * @param {[Function<AbstractConverter>, mixed[]]} additional_converters
 *
 * @returns {Promise<>}
 */
async function addAdditionalConverters(...additional_converters) {
	for (const additional_converter of additional_converters) {
		converters.push(additional_converter);
	}
}

/**
 * @type {[Function<AbstractConverter>, mixed[]][]}
 */
const converters = [
	[MetadataConverter, []],
	[RenameConverter, []],
	[AtlasConverter, []],
	[BedConverter, []],
	[ChestFrontConverter, []],
	[ChestSideConverter, []],
	[DrownedConverter, []],
	[FishHookConverter, []],
	[HorseConverter, []],
	[PistonArmConverter, []],
	[RedstoneDustConverter, []],
	[SheepConverter, []],
	[VillagerConverter, []],
	[OpaqueConverter, []],
	[OverlayToTranslateConverter, []],
	[ColorizeOverlayConverter, []],
	[PlaceholderConverter, []],
	[SideRotateConverter, []],
	[PngToTgaConverter, []],
	[CopyConverter, []],
	[DeleteStaticConverter, []]
];

export {getConverters, addAdditionalConverters};
