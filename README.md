Convert Minecraft Java texture packs to Minecraft Bedrock texture packs

It supports currently the follow Minecraft versions:

| Minecraft | Version             |
|-----------|---------------------|
| Java      | v1.13.x or v1.14.x  |
| Bedrock   | v1.12.x             |

Currently it supports blocks, items, entities, paintings, particles and map icons textures

Supported formats are mcpack archives, zip archives or directories

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
| -i (Required) | Input folder or archive path  |
| -o (Required) | Output folder or archive path |
| -l            | Verbose log (Default `true`)  |

## Direct in your code
Add it as a dependency to your `package.json`

```bash
yarn add @ozelot379/convert-minecraft-java-texture-to-bedrock
```

Import it in your code, if you use webpack
```javascript
import ConvertMinecraftJavaTextureToBedrock from "@ozelot379/convert-minecraft-java-texture-to-bedrock";
```
or require it if you use native NodeJs
```javascript
const ConvertMinecraftJavaTextureToBedrock = require("@ozelot379/convert-minecraft-java-texture-to-bedrock").default;
```

You can now convert your texture packs in an `async function`
```javascript
let outputPath;
try {
    outputPath = await ConvertMinecraftJavaTextureToBedrock(input, output/*, "options"*/);
} catch (err) {

}
```
or handle the `Promise` direct
```javascript
ConvertMinecraftJavaTextureToBedrock(input, output/*, "options"*/).then((outputPath) => {}).catch((err) => {});
```

| Parameter           | Description                                    |
|---------------------|------------------------------------------------|
| input (Required)    | - Folder or archive path (`string`)<br>- Archive (`Buffer`)<br>- `Array` with archive (`Buffer`) and filename (`string`) |
| output (Required)   | - Folder or archive path (`string`)<br>- Archive (`Buffer`) |
| options.verbose     | Verbose log (Default `true`)                   |
| options.logCallback | Custom log callback (Default is `console.log`) |

## Known issues
- Convert horse textures is very tricky and may buggy
- Convert weather textures (rain and snow) may not works (seems to be an other format as the default)

# Extras (for texture pack creators)

## UUID
You can create the `bedrock_uuid_header` and `bedrock_uuid_module` files in your input, to keep the same uuid on repeating conversions - otherwise, random uuids are generated each time and you need to reselect the texture pack again in the game

## Custom textures
You can put custom textures in a `bedrock_textures` directory in your input

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
