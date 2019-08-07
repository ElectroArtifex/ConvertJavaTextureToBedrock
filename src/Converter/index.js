import AbstractConverter from "./AbstractConverter";
import AbstractOutput from "../Output/AbstractOutput";
import AtlasConverter from "./AtlasConverter";
import BannerPatternConverter from "./BannerPatternConverter";
import BedConverter from "./BedConverter";
import ChestFrontConverter from "./ChestFrontConverter";
import ChestSideConverter from "./ChestSideConverter";
import ColorizeOverlayConverter from "./ColorizeOverlayConverter";
import CopyConverter from "./CopyConverter";
import DeleteStaticConverter from "./DeleteStaticConverter";
import DrownedConverter from "./DrownedConverter";
import FishHookConverter from "./FishingConverter";
import FireworksConverter from "./FireworksConverter";
import HorseConverter from "./HorseConverter";
import MapIconsConverter from "./MapIconsConverter";
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
import SpriteConverter from "./SpriteConverter";
import VillagerConverter from "./VillagerConverter";
import WeatherConverter from "./WeatherConverter";

/**
 * @param {AbstractOutput} output
 *
 * @returns {AsyncIterableIterator<AbstractConverter>}
 *
 * @throws {Error}
 */
async function* getConverters(output) {
	for (const [converter, data] of converters) {
		yield new converter(output, data);
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
	[BannerPatternConverter, []],
	[BedConverter, []],
	[ChestFrontConverter, []],
	[ChestSideConverter, []],
	[DrownedConverter, []],
	[FireworksConverter, []],
	[FishHookConverter, []],
	[HorseConverter, []],
	[MapIconsConverter, []],
	[PistonArmConverter, []],
	[RedstoneDustConverter, []],
	[SheepConverter, []],
	[VillagerConverter, []],
	[WeatherConverter, []],
	[OpaqueConverter, []],
	[OverlayToTranslateConverter, []],
	[ColorizeOverlayConverter, []],
	[PlaceholderConverter, []],
	[SideRotateConverter, []],
	[SpriteConverter, []],
	[PngToTgaConverter, []],
	[CopyConverter, []],
	[DeleteStaticConverter, []]
];

export {getConverters, addAdditionalConverters};
