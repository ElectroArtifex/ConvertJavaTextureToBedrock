import {AbstractConverter} from "./AbstractConverter";
import {AtlasConverter} from "./AtlasConverter";
import {BannerPatternConverter} from "./BannerPatternConverter";
import {BedConverter} from "./BedConverter";
import {ChestFrontConverter} from "./ChestFrontConverter";
import {ChestSideConverter} from "./ChestSideConverter";
import {ColorizeOverlayConverter} from "./ColorizeOverlayConverter";
import {CopyConverter} from "./CopyConverter";
import {DeleteConverter} from "./DeleteConverter";
import {DrownedConverter} from "./DrownedConverter";
import {FishHookConverter} from "./FishingConverter";
import {FireworksConverter} from "./FireworksConverter";
import {FoxConverter} from "./FoxConverter";
import {HorseConverter} from "./HorseConverter";
import {MapIconsConverter} from "./MapIconsConverter";
import {MetadataConverter} from "./MetadataConverter";
import {OpaqueConverter} from "./OpaqueConverter";
import {OverlayToTranslateConverter} from "./OverlayToTranslateConverter";
import {Particles1_13Converter} from "./Particles1_13Converter";
import {PistonArmConverter} from "./PistonArmConverter";
import {PlaceholderConverter} from "./PlaceholderConverter";
import {PngToTgaConverter} from "./PngToTgaConverter";
import {RedstoneDustConverter} from "./RedstoneDustConverter";
import {RenameConverter} from "./RenameConverter";
import {SheepConverter} from "./SheepConverter";
import {SideRotateConverter} from "./SideRotateConverter";
import {SpriteConverter} from "./SpriteConverter";
import {TitleConverter} from "./TitleConverter";
import {VillagerConverter} from "./VillagerConverter";
import {WaterConverter} from "./WaterConverter";
import {WeatherConverter} from "./WeatherConverter";

/**
 * @type {AbstractConverter[]}
 */
const converters = [
	new MetadataConverter(),
	new RenameConverter(),
	new AtlasConverter(),
	new BannerPatternConverter(),
	new BedConverter(),
	new ChestFrontConverter(),
	new ChestSideConverter(),
	new DrownedConverter(),
	new FireworksConverter(),
	new FishHookConverter(),
	new FoxConverter(),
	new HorseConverter(),
	new MapIconsConverter(),
	new PistonArmConverter(),
	new RedstoneDustConverter(),
	new SheepConverter(),
	new VillagerConverter(),
	new WeatherConverter(),
	new OpaqueConverter(),
	new WaterConverter(),
	new TitleConverter(),
	new OverlayToTranslateConverter(),
	new ColorizeOverlayConverter(),
	new PlaceholderConverter(),
	new SideRotateConverter(),
	new Particles1_13Converter(),
	new SpriteConverter(),
	new PngToTgaConverter(),
	new CopyConverter(),
	new DeleteConverter()
];

export {converters};
