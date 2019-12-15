import {AbstractConverter} from "./AbstractConverter";
import {ArrowConverter} from "./ArrowConverter";
import {AtlasConverter} from "./AtlasConverter";
import {BannerPatternConverter} from "./BannerPatternConverter";
import {BarConverter} from "./BarConverter";
import {BedConverter} from "./BedConverter";
import {BeeConverter} from "./BeeConverter";
import {ButtonConverter} from "./ButtonConverter";
import {ChestFrontConverter} from "./ChestFrontConverter";
import {ChestLeftRightDoubleConverter} from "./ChestLeftRightDoubleConverter";
import {ChestSideConverter} from "./ChestSideConverter";
import {ColorizeOverlayConverter} from "./ColorizeOverlayConverter";
import {CopyConverter} from "./CopyConverter";
import {DeleteConverter} from "./DeleteConverter";
import {DespriteConverter} from "./DespriteConverter";
import {DestroyStageConverter} from "./DestroyStageConverter";
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
import {TurtleConverter} from "./TurtleConverter";
import {VillagerConverter} from "./VillagerConverter";
import {WaterConverter} from "./WaterConverter";
import {WeatherConverter} from "./WeatherConverter";

/**
 * @type {AbstractConverter[]}
 */
const converters = [
    ...MetadataConverter.getDefaultConverters(),
    ...RenameConverter.getDefaultConverters(),
    ...AtlasConverter.getDefaultConverters(),
    ...BannerPatternConverter.getDefaultConverters(),
    ...BedConverter.getDefaultConverters(),
    ...ChestLeftRightDoubleConverter.getDefaultConverters(),
    ...ChestFrontConverter.getDefaultConverters(),
    ...ChestSideConverter.getDefaultConverters(),
    ...DrownedConverter.getDefaultConverters(),
    ...FireworksConverter.getDefaultConverters(),
    ...FishHookConverter.getDefaultConverters(),
    ...FoxConverter.getDefaultConverters(),
    ...HorseConverter.getDefaultConverters(),
    ...MapIconsConverter.getDefaultConverters(),
    ...PistonArmConverter.getDefaultConverters(),
    ...RedstoneDustConverter.getDefaultConverters(),
    ...SheepConverter.getDefaultConverters(),
    ...VillagerConverter.getDefaultConverters(),
    ...TurtleConverter.getDefaultConverters(),
    ...WeatherConverter.getDefaultConverters(),
    ...OpaqueConverter.getDefaultConverters(),
    ...WaterConverter.getDefaultConverters(),
    ...BeeConverter.getDefaultConverters(),
    ...TitleConverter.getDefaultConverters(),
    ...DespriteConverter.getDefaultConverters(),
    ...BarConverter.getDefaultConverters(),
    ...ButtonConverter.getDefaultConverters(),
    ...OverlayToTranslateConverter.getDefaultConverters(),
    ...ColorizeOverlayConverter.getDefaultConverters(),
    ...PlaceholderConverter.getDefaultConverters(),
    ...SideRotateConverter.getDefaultConverters(),
    ...ArrowConverter.getDefaultConverters(),
    ...Particles1_13Converter.getDefaultConverters(),
    ...SpriteConverter.getDefaultConverters(),
    ...DestroyStageConverter.getDefaultConverters(),
    ...PngToTgaConverter.getDefaultConverters(),
    ...CopyConverter.getDefaultConverters(),
    ...DeleteConverter.getDefaultConverters()
];

export {converters};
