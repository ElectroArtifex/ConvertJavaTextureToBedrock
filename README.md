THIS PROJECT IS NO OFFICIAL MINECRAFT] PRODUCT - NOT AUTHORIZED OR ASSOCIATED BY MOJANG

---

# Convert Minecraft Java texture packs to Bedrock texture packs

Look at https://ozelot379.github.io/ConvertJavaTextureToBedrock

It works directly in your browser

It supports currently the follow Minecraft versions:

| Minecraft | Version |
|-----------|---------|
| Java | v1.13.x, v1.14.x or v1.15.x |
| Bedrock | v1.14.x |

Currently it supports to convert blocks, items, entities, paintings, particles, map icons, mob effects and some basic ui textures

Some conversions of HD texture packs may takes a while

This project is inspired by the no longer continued [PCTexture2PE](https://github.com/rodrigojxd/PCTexture2PE)

## CLI
As an alternative you can also use the cli version

First be sure you have installed [NodeJS](https://nodejs.org) (At least the LTS version) and install [Yarn](https://yarnpkg.com/en/docs/install)

Then install this global so you can use the binary

```bash
yarn global add @ozelot379/convert-minecraft-java-texture-to-bedrock
```

You can now convert your texture packs like

```bash
ConvertJavaTextureToBedrock -i input/java_texture_pack.zip -o output/bedrock_texture_pack.mcpack
```

| Parameter | Description |
|-----------|-------------|
| -i (Required) | Input folder or zip path |
| -o (Required) | Output folder or zip path |
| -l | Show log (Default `true`) |

## Known issues
- Convert horse textures is very tricky and may buggy
- Convert weather textures (rain and snow) may not works (seems to be an other format as the default)

# Extras (for texture pack creators)

## UUID
You can create the `bedrock_uuid_header` and `bedrock_uuid_module` files in your input, to keep the same uuid on repeating conversions - otherwise, random uuids are generated each time and you need to reselect the texture pack again in the game

## Custom textures
You can put custom textures in a `bedrock_textures` folder in your input

For instance for textures, that can not be converted or are not converted correctly

This files are applied additionally before output

# Debug
First clone this repo
```bash
git clone https://github.com/ozelot379/ConvertJavaTextureToBedrock
cd ConvertJavaTextureToBedrock
```

Then install the dependencies
```bash
yarn
```

## WebApp
```bash
NODE_ENV=development yarn debug:webapp
```

## CLI
```bash
NODE_ENV=development yarn debug:cli
```

## Build
```bash
yarn build
```

# How this work
This project uses the follow main features or external libraries:

- [Web Worker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) for convert it in the background to not freeze the ui
- [jszip](https://www.npmjs.com/package/jszip) for read, modify and write zip files
- [jimp](https://www.npmjs.com/package/jimp) for graphic manipulation
- [file-saver](https://www.npmjs.com/package/file-saver) for deliver the converted pack to download
- [webpack](https://www.npmjs.com/package/webpack) for bundle the dist code
- [gh-pages](https://www.npmjs.com/package/gh-pages) for publish a new version to the github static page

# Use it direct in your code
Add it as a dependency to your `package.json`

```bash
yarn add @ozelot379/convert-minecraft-java-texture-to-bedrock
```

Import it in your code, if you use webpack
```javascript
import ConvertJavaTextureToBedrock, {ConsoleLog, Input, LocalFileInputEntry, LocalFileOutput} from "@ozelot379/convert-minecraft-java-texture-to-bedrock";
```

You can now convert your texture packs
```javascript
let output;
try {
    output = await new ConvertJavaTextureToBedrock(input, output, log).convert();
} catch (err) {

}
```

## Input
| Import | Description |
|--------|-------------|
| `Input` | The input consists on one input entry (Common) |
| `ArrayInput` | The input consists on multiple input entries (For instance a selected folder with multiple `FileInputEntry`) |
| `AbstractInput` | Base input |

## Input entry
| Import | For type |
|--------|----------|
| `BufferInputEntry` | - `ArrayBuffer`<br>- `Blob`<br>- `Buffer`<br>- `Uint8Array` |
| `FileInputEntry` | `File` |
| `LocalFileInputEntry` | Local file |
| `LocalFolderInputEntry` | Local folder |
| `AbstractInputEntry` | Base input entry |

## Output
| Import | For type |
|--------|----------|
| `ArrayBufferOutput` | `ArrayBuffer` |
| `BlobOutput` | `Blob` |
| `BufferOutput` | `Buffer` |
| `FileBlobOutput` | `File` |
| `LocalFileOutput` | Local file |
| `LocalFolderOutput` | Local folder |
| `Uint8ArrayOutput` | `Uint8Array` |
| `AbstractOutput` | Base output |

## Log
| Import | Description |
|--------|-------------|
| `ConsoleLog` | Log to console |
| `SlientLog` | Disable log |
| `AbstractLog` | Base log |

## Example
```javascript
import ConvertJavaTextureToBedrock, {ConsoleLog, Input, LocalFileInputEntry, LocalFileOutput} from "@ozelot379/convert-minecraft-java-texture-to-bedrock";

(async () => {
    let output;

    try {
        output = await new ConvertJavaTextureToBedrock(new Input(new LocalFileInputEntry("input/java_texture_pack.zip")), new LocalFileOutput("output/bedrock_texture_pack.mcpack"), new ConsoleLog()).convert();
    } catch (err) {
        console.log(err);

        return;
    }

    console.log(`Output: ${output}`);
})();
```
