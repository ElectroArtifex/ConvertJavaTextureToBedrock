Convert Minecraft Java texture packs to Minecraft Bedrock texture packs

It supports currently the follow Minecraft versions:

| Minecraft | Version             |
|-----------|---------------------|
| Java      | v1.13.x or v1.14.x  |
| Bedrock   | v1.12.x             |

Currently it supports blocks, items, entities, paintings, particles and map icons textures

Supported formats are zip archives or folders

This library is inspired by the no longer continued [PCTexture2PE](https://github.com/rodrigojxd/PCTexture2PE)

This library is written in NodeJS, with [webpack features](https://www.npmjs.com/package/webpack)

For the graphic manipulation, it uses the [jimp library](https://www.npmjs.com/package/jimp)

# Usage

## GUI
Look at http://ozelot379.github.io/ConvertMinecraftJavaTextureToBedrock in your browser

## CLI
First be sure you have installed [NodeJS](https://nodejs.org) (At least the LTS version) and install [Yarn](https://yarnpkg.com/en/docs/install)

Then install it global

```bash
yarn global add @ozelot379/convert-minecraft-java-texture-to-bedrock
```

You can now convert your texture packs like

```bash
ConvertMinecraftJavaTextureToBedrock -i input/java_texture_pack.zip -o output/bedrock_texture_pack.mcpack
```

| Parameter     | Description                   |
|---------------|-------------------------------|
| -i (Required) | Input folder or zip path  |
| -o (Required) | Output folder or zip path |
| -l            | Show log (Default `true`)     |

## Direct in your code
Add it as a dependency to your `package.json`

```bash
yarn add @ozelot379/convert-minecraft-java-texture-to-bedrock
```

Import it in your code, if you use webpack
```javascript
import ConvertMinecraftJavaTextureToBedrock, {ConsoleLog, Input, LocalFileInputEntry, LocalFileOutput} from "@ozelot379/convert-minecraft-java-texture-to-bedrock";
```
or require it if you use native NodeJs
```javascript
const {default: ConvertMinecraftJavaTextureToBedrock, ConsoleLog, Input, LocalFileInputEntry, LocalFileOutput} = require("@ozelot379/convert-minecraft-java-texture-to-bedrock");
```

You can now convert your texture packs in an `async function`
```javascript
let output;
try {
    output = await new ConvertMinecraftJavaTextureToBedrock(input, output, log).convert();
} catch (err) {

}
```
or self handle the `Promise`
```javascript
new ConvertMinecraftJavaTextureToBedrock(input, output, log).convert().then((output) => {}).catch((err) => {});
```

### Input
| Import          | Description |
|-----------------|-------------|
| `Input`         | The input consists on one input entry (Common) |
| `ArrayInput`    | The input consists on multiple input entries (For instance a selected folder with multiple `FileInputEntry`) |
| `AbstractInput` | Base input  |

### Input entry
| Import                  | For type           |
|-------------------------|--------------------|
| `BufferInputEntry`      | <ul><li>`ArrayBuffer`</li><li>`Blob`</li><li>`Buffer`</li><li>`Uint8Array`</li></ul> |
| `FileInputEntry`        | `File`             |
| `LocalFileInputEntry`   | Local file         |
| `LocalFolderInputEntry` | Local folder       |
| `AbstractInputEntry`    | Base input entry   |

### Output
| Import              | For type      |
|---------------------|---------------|
| `ArrayBufferOutput` | `ArrayBuffer` |
| `BlobOutput`        | `Blob`        |
| `BufferOutput`      | `Buffer`      |
| `FileBlobOutput`    | `File`        |
| `LocalFileOutput`   | Local file    |
| `LocalFolderOutput` | Local folder  |
| `Uint8ArrayOutput`  | `Uint8Array`  |
| `AbstractOutput`    | Base output   |

### Log
| Import        | Description    |
|---------------|----------------|
| `ConsoleLog`  | Log to console |
| `SlientLog`   | Disable log    |
| `AbstractLog` | Base log       |

### Example
```javascript
import ConvertMinecraftJavaTextureToBedrock, {ConsoleLog, Input, LocalFileInputEntry, LocalFileOutput} from "@ozelot379/convert-minecraft-java-texture-to-bedrock";

(async () => {
    let output;

    try {
        output = await new ConvertMinecraftJavaTextureToBedrock(new Input(new LocalFileInputEntry("input/java_texture_pack.zip")), new LocalFileOutput("output/bedrock_texture_pack.mcpack"), new ConsoleLog()).convert();
    } catch (err) {
        console.log(err);

        return;
    }

    console.log(`Output: ${output}`);
})();
```

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

## Debug and build
First clone this repo and install the dependencies

```bash
yarn
```

Then you can start the debug

```bash
yarn debug
```

You can create a build

```bash
yarn build
```

# License
The Minecraft Java and Bedrock products are &copy; by [Mojang](https://mojang.com/)

This library for the conversation is published by the [GPL license](https://www.gnu.org/licenses/gpl-3.0.txt)
